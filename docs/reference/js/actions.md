---
sidebar_position: 5
---

# Actions

:::info
JavaScript schemas are currently in preview. Contact us if you would like to try it out.
:::

The `actions` method is used if you need to trigger other schemas from a schema. 

It could be that you have a list of references to news articles and whenever a news article is ingested or deleted you also want to update the list of news article in another schema.

You can add multiple actions to a schema.

```js title="Actions example"
actions: function(sourceEntity, context) {
    return [
        context
            .reprocess('newsArchive')
            .byOriginId(sourceEntity.properties.newsArchivePage.id)
    ]
}
```

# ActionsContext object

The `ActionsContext` object is passed into the `actions` method and gives you access to the `reprocess` function which is described below.

## Methods

| Method                        | Description                                                 |
| ----------------------------- | ------------------------------------------------------------|
| [reprocess](#reprocess)       | Reprocess a schema based on its alias.                      |

### reprocess

`reprocess(schemaAlias)`

#### Parameters

| Parameter     | Type   | Description                                        |
| ------------- | ------ | -------------------------------------------------- |
| `schemaAlias` | string | The alias of a schema.                             |

#### Required function calls

After the `reprocess` function it's required to call one of the following functions to define what source entities you want to reprocess.

<details><summary>byOriginId</summary>

Use the `byOriginId` function to reprocess a specific entity based on its originId.

#### Parameters

| Parameter     | Type   | Description                                        |
| ------------- | ------ | -------------------------------------------------- |
| `originId`    | string | The original id from the source system.                           |

```js title="reprocess by byOriginId"
context
    .reprocess('mySchemaAlias')
    .byOriginId(sourceEntity.properties.link.id)
```

</details>

<details><summary>bySchema</summary>

Use the `bySchema` function to reprocess all source entities a specific schema has a trigger on.

Note: Often it's better to reprocess a specific source entity instead a schema and all of its matching source entities, but sometimes it's nesecary to reprocess an entire schema.

```js title="reprocess by bySchema"
context
    .reprocess('mySchemaAlias')
    .bySchema()
```

</details>

<details><summary>parent</summary>

Use the `parent` function to reprocess the parent entity based on its originParentId.

```js title="reprocess by byOriginId"
context
    .reprocess('mySchemaAlias')
    .parent()
```

</details>

#### Optional function calls

After one of the required function call above, there are extra functions you can call.

<details><summary>sourceGroup</summary>

Defines the source group of an source entity to process. If the source entity you want to reprocess is located in another source group than the current source entity, you must specific the source group.

Note: `sourceGroup` can't be used on `parent` as parent is implicit in the same source group as the child.

#### Parameters

| Parameter           | Type    |  Description  |
| ------------------- | ------- | --------------------------------------------------------------------------- |
| `sourceGroupAlias`  | string  | The alias of the source group for the source entity you want to reprocess.  |

```js title="reprocess by origin id and source group"
context
    .reprocess("mySchemaAlias")
    .byOriginId(sourceEntity.properties.link.id)
    .sourceGroup('anotherSourceGroup')
```

</details>

## Examples

```js title="actions example with multiple actions"
actions: function(sourceEntity, context) {
    return [
        context.reprocess('productCategory')
                .byOriginId(sourceEntity.properties.productCategoryPage.id)
                .sourceGroup('commerce'),
        context.reprocess('productCategory')
                .parent()
    ]
}
```

```js title="if you only have one action you dont need to return it as an array"
actions: function(sourceEntity, context) {
    return context.reprocess('productCategory').parent()
}
```

```js title="actions can also be expressed as an arrow function expression to make it even more compact"
actions: (sourceEntity, context) => context.reprocess('productCategory').parent()
```
