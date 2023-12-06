---
sidebar_position: 8
sidebar_label: Collection schemas
---

# Collection schemas

:::info
Items is still in preview and is only supported in JavaScript schemas. Contact us if would like to try it out.
:::

Collection schema is a schema that consists of items definition, that can be later retrieved in user defined slices in Delivery API.

A typical use case is when you want to retrieve slice of larger collection, instead of retrieving entire collection.

Collection schemas, only support view references, which guarantees latest available version of slice range matched items returned.

## Configure a collection schema
When using a collection schema, you are defining some of already familiar properties, such as - [triggers](/reference/js/triggers), and [routes](/reference/js/routes). Besides them, new property [items](/reference/js/items), which requires you to define view references that you want to be included in the collection.

In the below example, we are defining a collection schema that includes all recipes, sorted by creation date, showing newest first.

## Example of a collection schema

```js title="Schema"
/** @type {Enterspeed.CollectionSchema} */
export default {
  triggers: function(context) {
    // ...
  },
  routes: function(sourceEntity, context) {
    context.handle(`recipes`)
  },
  items: function (sourceEntity, context) {
    return context.reference('recipeCard')
    .filter(`type eq 'recipe'`)
    .orderBy({propertyName: 'properties.createdAt', direction: 'desc'})
  }
}
```

## Example of usage in Delivery API
Examples of retrieving slices of collection items in [delivery API](/api#tag/Delivery)

By requesting `?handle=recipes`, you will get default slice size (of 10) of the first items in the collection.


```json
{
    "meta": {
        "status": 200,
        "redirect": null,
        "missingViewReferences": []
    },
    "views": {
        "articles": {
            "meta": {
                "total": 796
            },
            "items": [
                {
                    "name": "Mastering Homemade Pizza",
                    "thumbnail": "https://example.com/pizza-thumbnail.jpg",
                    "createdAt": "2023-11-30T09:33:51.954Z",
                    "description": "Discover the secrets to making perfect homemade pizza, from the dough to the toppings. Follow our step-by-step guide for a delightful pizza experience at home."
                },
                // ... 9 more
            ]
        }
    }
}
```

By knowing total size of collection, you can use it to implement pagination of your choice.