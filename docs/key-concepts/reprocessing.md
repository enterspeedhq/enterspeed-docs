---
sidebar_position: 8
sidebar_label: Reprocessing
---

# Reprocessing

When Enterspeed preprocesses views - which happens either when source entities are ingested or when a schema is deployed -, we also need to reprocess views whenever dependencies are updated or deleted.

Let's say you have a `product` source entity ingested from a PIM system and you want to create a schema to map the product and to enrich the product with some related `contentBlock`s from a CMS system. 

The schema could look somewhat like this.

```js title="Schema with dependencies"
/** @type {Enterspeed.FullSchema} */
export default {
  triggers: function(context) {
    context.triggers('pim', ['product']);
  },
  properties: async function (sourceEntity, context) {
    const relatedContent = async context
                                  .lookup(`type eq 'contentBlock' and properties.sku eq '${sourceEntity.properties.sku}'`)
                                  .SourceGroup('cms')
                                  .toPromise();

    return {
      sku: sourceEntity.properties.sku,
      name: sourceEntity.properties.name,

      relatedContent: relatedContent.map((c) => {
        return {
          title: c.properties.title,
          content: c.properties.content
        }
      })
    };
  }
}
```

For this schema, the `product` is the trigger and the `contentBlock`s, which we get from the `lookup`, are the dependencies. 

The trigger on the `product` source entity makes sure that the schema is triggered every time the `product` is updated, and our view will then be updated too. But what if the related `contentBlock`s are updated, added, or removed? Well, schemas don't automatically trigger when dependencies change, so in this case the `product` schema will not be triggered, and our view will not be updated. We need to handle that in the schemas ourselves.

Before looking into how we can update views when dependencies are changed, let's first take a deeper look at the dependencies and the different types of dependencies we have in Enterspeed.

## Dependencies
In Enterspeed we have two types of data available in a schema. 

The first one is source entity that triggers the schema - and this one is passed as a parameter to the different functions in the schema like the [routes function](/reference/js/full-schema/routes), and the [properties function](/reference/js/full-schema/properties). 

The second one is dependencies, and dependencies can then be broken further down in two types, [lookups](/reference/js/full-schema/properties#lookup) and [references](/reference/js/full-schema/properties#reference).

### Lookups
When you do a lookup in a schema, the result of the lookup is a list of source entities. As you get the raw source entities with all the data right in the schema, it gives you full flexibility of how you want to map out your data, but that flexibility also comes with a downside. Since you get the raw source entities right in your schema, it means that the data you map out is embedded directly into the view you create and because of that we always need to reprocess the view if one of the dependencies (one of the source entities from the lookup) is updated.

```js title="lookups return a list of source entities"
properties: async function (sourceEntity, context) {
  const relatedContent = async context
                                .lookup(`type eq 'contentBlock' and properties.sku eq '${sourceEntity.properties.sku}'`)
                                .SourceGroup('cms')
                                .toPromise();

  return {
    sku: sourceEntity.properties.sku,
    name: sourceEntity.properties.name,

    relatedContent: relatedContent.map((c) => {
      return {
        title: c.properties.title,
        content: c.properties.content
      }
    })
  };
}
```

:::tip
When working with dependencies from a `lookup` call, you always need to reprocess the referencing schema when the dependencies are updated.
:::

### References
As the name implies, references don't bring the dependent data directly into the schema, but just a reference to views. With references you can create reusable schemas and reference the views created by that schema across multiple other schemas.

As the referenced views are not directly embedded into the referencing view it also means that it's not always neccessary to reprocess the referencing view.

To understand exactly how references works, let's take a look at a view containing references.

```json title="View with two references"
{
  "sku": "p-1234",
  "name": "Nike running shoe",
  "relatedContent": [
    {
      "view": null,
      "id": "gid://Environment/8b1c6be0-535d-4d6c-b690-a7e3590a0643/Source/e3211d99-e496-4e11-af3d-328eb543619g/Entity/1106-en-us/View/contentBlock",
      "$type": "ViewReference"
    },
    {
      "view": null,
      "id": "gid://Environment/8b1c6be0-535d-4d6c-b690-a7e3590a0643/Source/e3211d99-e496-4e11-af3d-328eb543619g/Entity/1107-en-us/View/contentBlock",
      "$type": "ViewReference"
    }
  ]
}
```

Looking at the view we can see that references are not resolved yet; it's still just references to specific view ids. First when you request the view from the Delivery API, the Delivery API will make sure to resolve the references and return the content of the referenced views instead of the internal references with the view ids as you see above.

#### References by filter needs reprocess
Now this is all good. It means that if you update one of the referenced views, you don't need to reprocess the referencing view. But what happens if you ingest a new `contentBlock` source entity or deletes a source entity that matches the `sku` value from the `product`? Then the list of references is not updated, because even though the data of the references isn't stored in the view, it *does* store the result of which views to reference from the `filter` function.

Here's an example of the same schema as above, but with references instead of lookup.

```js title="schema with references using filter"
properties: function (sourceEntity, context) {
  return {
    sku: sourceEntity.properties.sku,
    name: sourceEntity.properties.name,

    relatedContent: context.reference('contentBlock')
                              .filter(`type eq 'contentBlock' and properties.sku eq '${sourceEntity.properties.sku}'`)
                              .SourceGroup('cms')
  };
}
```

Whenever you create references based on the `filter` function, you still need to reprocess the referencing view if you want the list of references to be updated when new dependencies are ingested or existing once are deleted, just like with the `lookup` function.

In other words, when the referenced source entities holds to reference key, in this case the `contentBlock`s has the reference to the product via the `sku` property, you need to search using the `filter` function and you need to reprocess the referencing view.

:::tip
When working with referenced dependencies from a `filter` call, you always need to reprocess the referencing schema when the dependencies are updated.
:::

#### References by origin id(s) doesn't needs reprocess
Let's look at another example where the relationship is turned around and referencing source entity holds the information about the relationship.

```js title="schema with references using origin ids"
properties: function (sourceEntity, context) {
  return {
    sku: sourceEntity.properties.sku,
    name: sourceEntity.properties.name,

    relatedContent: context.reference('contentBlock')
                              .byOriginIds(sourceEntity.properties.relatedContentIds)
                              .SourceGroup('cms')
  };
}
```

In this case the triggering source entity (the `product`) now has the knowledge about the relationship and knows the ids of the `contentBlocks`. This means that we can create the references by using the `byOriginIds` function and that whenever the `product` is updated with new relationships it will simply trigger the referencing schema so we don't need any reprocessing.

:::tip
When working with referenced dependencies from a `byOriginId` or `byOriginIds` call, you never need to reprocess the referencing schema when the dependencies are updated.
:::

## Reprocess actions
We've talked about dependencies, the different types of dependencies, when you need to reprocess, and when you *don't* need to reprocess. So, we just need the last part - How do we reprocess other schemas when a dependency changes?

To do that we use the [action](/reference/js/full-schema/actions) and the [reprocess](/reference/js/full-schema/actions#reprocess) functions.

Here's an example of a `contentBlock` schema that will reprocess the `product` schema for the specific `sku` value whenever the `contentBlock` is updated.

```js title="Schema with reprocess action"
/** @type {Enterspeed.FullSchema} */
export default {
  triggers: function(context) {
    context.triggers('cms', ['contentBlock']);
  },
  action: function(sourceEntity, context) {
    context.reprocess('product')
            .byOriginId(sourceEntity.properties.sku)
            .sourceGroup('pim');
  }
  properties: function (sourceEntity, context) {
    return {
      title: sourceEntity.properties.title,
      content: sourceEntity.properties.content
    };
  }
}
```

:::warning
Reprocess actions can cause execessive processing, especially if you reprocess more than needed. This could result in a larger queue of jobs, and it will take longer for all your views to be updated.  
Because of that, it's important to make your reprocess actions as precise as possible, by using `originId` or a precise `filter` so you only target the schemas and source entities you actually need to reprocess.
:::
