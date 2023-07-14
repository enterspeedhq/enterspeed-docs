---
sidebar_position: 5
---

# Actions

:::info
JavaScript schemas are currently in preview. Contact us if you would like to try it out.
:::

The `actions` method is used if you need to trigger another schema from a schema. 

It could be that you have a list of references to news articles and whenever a news article is ingested you also want to update the list of news article in another schema.

You can add multiple actions to a schema.

```js title="Actions example"
actions: function(sourceEntity, context) {
    return [
        context
            .reprocessByOriginId(sourceEntity.properties.newsArchivePage.id)
            .schema('newsArchive')
    ]
}
```

# ActionsContext object

The `ActionsContext` object is passed into the `actions` method and gives you access to a set of methods which is described below.

## Required Methods

| Method                                      | Description                                                 |
| ------------------------------------------- | ------------------------------------------------------------|
| [reprocessByOriginId](#reprocessByOriginId) | Reprocess a source entity based on its originId.            |
| [reprocessParent](#reprocessParent)         | Reprocess the parent source entity.                         |
| [reprocessSchema](#reprocessSchema)         | Reprocess all source entities for a given schema.           |

### reprocessByOriginId

Reprocess a source entity based on its originId.

`reprocessByOriginId(originId)`

#### Parameters

| Parameter    | Type    |  Description  |
| ------------ | ------- | --------------------------------------------------------------------------- |
| `originId`   | string  | The originId of the source entity to reprocess.                             |

### reprocessParent

Reprocess the parent source entity.

`reprocessParent()`

### reprocessSchema

Reprocess all source entities that matches the schemas triggers.

Often it's better to reprocess a specific source entity instead a schema and all of its matching source entities, but sometimes it's nesecary to reprocess an entire schema.

`reprocessSchema(schemaAlias)`

#### Parameters

| Parameter      | Type    |  Description  |
| -------------- | ------- | ----------------------------------------------------------|
| `schemaAlias`  | string  | The alias of the schema to reprocess.                     |

## Optional Methods

| Method                        | Description                                                                                                               |
| ------------------------------| --------------------------------------------------------------------------------------------------------------------------|
| [schema](#schema)             | Defines the schema to process. Default is all schemas that matches a source entity                                        |
| [sourceGroup](#sourceGroup)   | Defines the source group of an source entity to process. Default is the source group of the current source entity.        |

### schema

Defines the schema to process. If no schema is defined, all schemas that matches a source entity is processed. Often it's better to be specific and define a specific schema and source entity, in order to avoid unnessacary processing.

`schema(schemaAlias)`

#### Parameters

| Parameter      | Type    |  Description  |
| -------------- | ------- | ----------------------------------------------------------|
| `schemaAlias`  | string  | The alias of the schema to reprocess.                     |

### sourceGroup

Defines the source group of an source entity to process. If the source entity you want to reprocess is located in another source group than the current source entity, you must specific the source group.

`sourceGroup(sourceGroupAlias)`

#### Parameters

| Parameter           | Type    |  Description  |
| ------------------- | ------- | --------------------------------------------------------------------------- |
| `sourceGroupAlias`  | string  | The alias of the source group for the source entity you want to reprocess.  |


## Examples

```js title="actions example with multiple actions"
actions: function(sourceEntity, context) {
    return [
        context.reprocessByOriginId(sourceEntity.properties.productCategoryPage.id).schema('productCategory').sourcceGroup('commerce'),
        context.reprocessParent().schema('productCategory')
    ]
}
```

```js title="if you only have one action you dont need to return it as an array"
actions: function(sourceEntity, context) {
    return context.reprocessParent().schema('productCategory')
}
```

```js title="actions can also be expressed as an arrow function expression to make it even more compact"
actions: (sourceEntity, context) => context.reprocessParent().schema('productCategory')
```
