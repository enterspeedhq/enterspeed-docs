---
sidebar_position: 2
---

# Properties

:::info
JavaScript schemas are still in preview. Contact us if you would like to try it out.
:::

The `properties` method is where you define the output that goes into the view you fetch from the [delivery API](/api#tag/Delivery)

```js title="Properties example"
properties: async function (sourceEntity, context) {
  return {
    title: sourceEntity.properties.title,
    seo: {
      title: sourceEntity.properties.seoTitle,
      description: sourceEntity.properties.seoDescription,
    }
    categoryIds: sourceEntity.properties.categoryIds.map(categoryId => parseInt(categoryId))
  }
}
```

The properties method must return an object with the data you want to include in your view.

# PropertiesContext object

The `PropertiesContext` object is passed into the `properties` method and gives you access to a set of methods described below.

## Methods

| Method                             | Description                                                                                                                       |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| [getChildren](#getChildren)        | Returns the child source entities based on the parameters you pass in.                                                            |
| [getParent](#getParent)            | Returns the parent source entity based on the parameters you pass in.                                                             |
| [lookup](#lookup)                  | Lookup allows you to search source entities based on a filter to map or reference data from other source entities in your schema. |
| [partial](#partial)                | Referencing a partial schema to map the data into. Mapped data from a partial schema is embedded into the calling schema.         |
| [referenceById](#reference)        | Referencing another schema by source entity id. References to other schemas are resolved on delivery request time.                |
| [referenceByIds](#reference)       | Referencing a list of schemas by source entity id. References to other schemas are resolved on delivery request time.             |
| [referenceByOriginId](#reference)  | Referencing another schema by source entity originId. References to other schemas are resolved on delivery request time.          |
| [referenceByOriginIds](#reference) | Referencing a list of schemas by source entity originId. References to other schemas are resolved on delivery request time.       |

### getChildren

Returns the immediate child source entities to the `originId` you provide.

`getChildren(originId?, type?, top?, orderBy?): Promise<SourceEntityDto[]>`

#### Parameters

| Parameter  | Type                                                 | Description                                                                                    |
| ---------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `originId` | string                                               | The parent originId to the children you want.                                                  |
| `type`     | string                                               | `Optional`. Specify the type if you only want specific types of children.                      |
| `top`      | number                                               | `Optional`. Allows limiting the size of items collection. Default value is 10, maximum is 100. |
| `orderBy`  | { direction: "asc" \| "desc", propertyName: string } | `Optional`. Allows you to specify your desired sorting order.                                  |

#### Examples

```js title="Method: getChildren"
const latestNews = context.getChildren(sourceEntity.originId, "newsArticle", 3, {
  direction: "desc",
  propertyName: createdDate,
});
const latestNewsOriginIds = latestNews.map((x) => x.originId);
LatestNews: await context.referenceByOriginIds("newsTile", latestNewsOriginIds);
```

---

### getParent

Returns the parent source entities to the `originId` you provide.

`getChildren(originId?, type?, top?, orderBy?): Promise<SourceEntityDto[]>`

#### Parameters

| Parameter  | Type   | Description                                   |
| ---------- | ------ | --------------------------------------------- |
| `originId` | string | The parent originId to the children you want. |

#### Examples

```js title="Method: getParent"
let parentSourceEntity = context.getParent(sourceEntity.originId);
parent: await context.referenceByOriginId(
  "referenceSchema",
  parentSourceEntity.originId
);
```

---

### lookup

Lookup allows you to define query-like and criteria-match source entities lookup conditions.

`lookup(filter, top?, orderBy?, sourceGroupAlias?): Promise<SourceEntityDto[]>`

#### Parameters

| Parameter          | Type                                                 | Description                                                                                                                                                                                                                                 |
| ------------------ | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `filter`           | string                                               | Your filtering criteria                                                                                                                                                                                                                     |
| `top`              | number                                               | `Optional`. Allows limiting the size of items collection. Default value is 10, maximum is 100                                                                                                                                               |
| `orderBy`          | { direction: "asc" \| "desc", propertyName: string } | `Optional`. Allows you to specify your desired sorting order.                                                                                                                                                                               |
| `sourceGroupAlias` | string                                               | `Optional`. Allows you to define a different source group. The `sourceGroupAlias` should be equal to the desired source group alias where you want to look for source entities.<br/><br/> If not defined, it uses the current source group. |

**See list of filter examples [here](//docs/reference/filter-expressions.md)**

---

### partial

Referencing a partial schema to map the data into.

The partial mapping property type allows for dynamically including partial schemas into the main schema. This is useful when you need to iterate an array of different objects that has an identifier, like an ID, alias or similar.

:::tip
Partial schemas are typically used when you want a reusable schema for mapping data that is part of the same entity. E.g. metadata (title, description, etc.) is the same across different entity types, but the data lives on the entity itself.

Read more about partial schemas [here](//docs/key-concepts/partial-schemas.md)
:::

`partial(alias, input): Promise<undefined | null | Record<string, unknown>>`

#### Parameters

| Parameter | Type   | Description                                                  |
| --------- | ------ | ------------------------------------------------------------ |
| `alias`   | string | The alias of a partial schema.                               |
| `input`   | object | You can pass whatever data you need for your partial schema. |

#### Examples

```js title="Method: partial"
contentBlocks: await Promise.all(
  sourceEntity.properties.contentBlocks.map((contentBlock) =>
    context.partial(`block-${contentBlock.contentType}`, contentBlock)
  )
);
```

The `input` defines what goes into the partial schema, and the `alias` is used to resolve what partial schema to use. So, in this case, we could have a partial schema with an alias: block-headline.

---

### reference

The `referenceById` and `referenceByOriginId` are used to reference other views created from either this source Entity or another source entity.

When referenced, Enterspeed will resolve the view when requested by the Delivery API so that the data will stay up-to-date if a reference view is updated.

In order to reference desired source entity, you can use `alias` of the schema and `id` or `originId` of the source entity and, optionally, a different source than the current source entity.

:::tip
Reference schemas are typically used when you are mapping data from another entity. E.g. a page has a reference to another page entity or media entity.

Read more about reference schemas [here](//docs/key-concepts/referencing-schemas.md)
:::

#### referenceById

`referenceById(alias, id): Promise<undefined | null | ReferencePropertyDto>`

##### Parameters

| Parameter | Type   | Description                                        |
| --------- | ------ | -------------------------------------------------- |
| `alias`   | string | The alias of a schema.                             |
| `id`      | string | The id of the source entity you want to reference. |

#### referenceByIds

`referenceByIds(alias, ids): Promise<undefined | null | ReferencePropertyDto>`

##### Parameters

| Parameter | Type     | Description                                                 |
| --------- | -------- | ----------------------------------------------------------- |
| `alias`   | string   | The alias of a schema.                                      |
| `ids`     | string[] | A list of ids of the source entities you want to reference. |

#### referenceByOriginId

`referenceByOriginId(alias, originId, sourceGroupAlias?): Promise<undefined | null | ReferencePropertyDto>`

#### Parameters

| Parameter          | Type   | Description                                                                                                                                                                                                                                                                   |
| ------------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alias`            | string | The alias of a schema.                                                                                                                                                                                                                                                        |
| `originId`         | string | The originId of the source entity you want to reference.                                                                                                                                                                                                                      |
| `sourceGroupAlias` | string | `Optional`. Allows you to define a different source group. The `sourceGroupAlias` should be equal to the desired source group alias, where the source entity you are referencing is located.<br/><br/> If not defined, it uses the source group of the current source entity. |

#### referenceByOriginIds

`referenceByOriginIds(alias, originId, sourceGroupAlias?): Promise<undefined | null | ReferencePropertyDto>`

#### Parameters

| Parameter          | Type     | Description                                                                                                                                                                                                                                                                     |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alias`            | string   | The alias of a schema.                                                                                                                                                                                                                                                          |
| `originIds`        | string[] | A list of originIds of the source entities you want to reference.                                                                                                                                                                                                               |
| `sourceGroupAlias` | string   | `Optional`. Allows you to define a different source group. The `sourceGroupAlias` should be equal to the desired source group alias, where your source entity you are referencing are located.<br/><br/> If not defined, it uses the source group of the current source entity. |

#### Examples

```js title="Property type: reference (static value) with originId"
seoData: await context.referenceByOriginId(
  "Seo",
  sourceEntity.originId,
  "anotherSourceGroupAlias"
);
```

```js title="Property type: reference (static value)"
seoData: await context.referenceById("Seo", sourceEntity.id);
```

The `alias` can either be a static value, like "Seo", or it can be a dynamic value being resolved from the Source Entity that is being processed by Enterspeed. This allows for supporting almost any use case.

#### Reference response

The response of references differs in V1 and V2+ of the delivery API. V1 return the id, type and wraps the properties from the referenced view in a `view` property. The response of references in V2+ is much cleaner and only returns the actual properties from the referenced schema. If a reference is not found in V2+, the reference information is added in the `missingViewReference` property in the `meta` object for debugging purpose.

```json title="Delivery API V1 uses a nested view property"
{
  // This example shows a response of a view with two schema references.
  // image1 is referencing a found view with a url and name property
  // and image2 is referencing a view that doesn't exist.

  "meta": {
    "missingViewReferences": []
  },
  "route": {
    "image1": {
      "id": "gid://Environment/8ef2bdc0-c352-4190-a344-c51d1f5e72ea/Source/dc5d9518-b96a-428a-a9b3-31fb601376c2/Entity/1234/View/image",
      "view": {
        "url": "https://test.com/how-to-write-a-good-blog-post.png",
        "name": "How To Write A Good Blog Post"
      },
      "type": "ViewReference"
    },
    "image2": {
      "id": "gid://Environment/8ef2bdc0-c352-4190-a344-c51d1f5e72ea/Source/dc5d9518-b96a-428a-a9b3-31fb601376c2/Entity/1235/View/image",
      "view": null,
      "type": "ViewReference"
    }
  }
}
```

```json title="Delivery API V2+ only returns the actual view properties"
{
  // This example shows a response of a view with two schema references.
  // image1 is referencing a found view with a url and name property
  // and image2 is referencing a view that doesn't exist.

  "meta": {
    "missingViewReferences": [
      {
        "path": "image2",
        "viewId": "gid://Environment/8ef2bdc0-c352-4190-a344-c51d1f5e72ea/Source/dc5d9518-b96a-428a-a9b3-31fb601376c2/Entity/1235/View/image"
      }
    ]
  },
  "route": {
    "image1": {
      "url": "https://test.com/how-to-write-a-good-blog-post.png",
      "name": "How To Write A Good Blog Post"
    },
    "image2": null
  }
}
```
