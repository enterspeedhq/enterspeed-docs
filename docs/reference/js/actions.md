---
sidebar_position: 6
---
# Actions

The `actions` method is used if you need to trigger new processing - which could be processing another schema or pushing generated views to a third-party application - using web hooks or such as Algolia.


# ActionsContext object

The `ActionsContext` object is passed into the actions method and gives you access to the `reprocess` and `destination` functions which are described below.

## Methods
| Method                        | Description                                                 |
| ----------------------------- | ------------------------------------------------------------|
| [reprocess](#reprocess)       | Reprocess a schema based on its alias.                      |
| [destination](#destination)   | Specifies the destination where the generated view is pushed to.              |

### reprocess

`reprocess(schemaAlias)`

:::info
Note that `reprocess` triggers whenever the source entity is changed. This means that a deploy of the schema will not trigger the reprocess.
:::

#### Parameters

| Parameter     | Type   | Description                                        |
| ------------- | ------ | -------------------------------------------------- |
| `schemaAlias` | string | The alias of a schema.                             |

#### Required function calls

After the `reprocess` function it's required to call one of the following functions to define what source entities you want to reprocess.

<details>
<summary>byOriginId</summary>

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

<details>
<summary>bySchema</summary>

Use the `bySchema` function to reprocess all source entities a specific schema has a trigger on.

Caution: Often it's better to reprocess a specific source entity instead a schema and all of its matching source entities, but sometimes it's necessary  to reprocess an entire schema.

```js title="reprocess by bySchema"
context
    .reprocess('mySchemaAlias')
    .bySchema()
```

</details>

<details>
<summary>filter</summary>

Using the `filter` function lets you do a dynamic search for source entities you want to reprocess.

#### Parameters

| Parameter     | Type   | Description                                        |
| ------------- | ------ | -------------------------------------------------- |
| `filter`      | string | Your filtering criteria.                           |

See list of filter examples [here](//docs/reference/filter-expressions.md)

```js title="reprocess by filter"
 context
    .reprocess('mySchemaAlias')
    .filter("type eq 'account' and properties.internalId eq '1234'")
```

</details>

<details>
<summary>parent</summary>

Use the `parent` function to reprocess the parent entity based on its originParentId.

```js title="reprocess by byOriginId"
context
    .reprocess('mySchemaAlias')
    .parent()
```

</details>

#### Optional function calls

To filter the source entities you want to reprocess even further you can call some of the following optional functions.

<details>
<summary>limit</summary>

The `limit` function limits the number of source entities.

#### Parameters

| Parameter     | Type   | Description                                        |
| ------------- | ------ | -------------------------------------------------- |
| `limit`       | number | The maximum number of source entities.             |

```js title="reprocess by filter and limit"
 context
    .reprocess('mySchemaAlias')
    .filter("type eq 'account'")
    .limit(5)
```

</details>

<details>
<summary>orderBy</summary>

The `orderBy` function sorts the source entities. This is typically used in combination with `limit`.

#### Parameters

| Parameter     | Type   | Description                                        |
| ------------- | ------ | -------------------------------------------------- |
| `orderBy`      | \{ propertyName: string, direction: "asc" \| "desc" } | Allows you to specify your desired sorting order.        |

```js title="reprocess by filter and orderBy"
 context
    .reprocess('mySchemaAlias')
    .filter("type eq 'account'")
    .orderBy({ propertyName: "properties.createdDate", direction: "desc"})
```

</details>

<details>
<summary>sourceGroup</summary>

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

### destination
`destination(destinationAlias)`

The `destination` method is used to push generated views for a schema to a webhook, to Algolia or another third-party application.


#### Parameters

| Parameter      | Type    |  Description  |
| -------------- | ------- | --------------------------------------------------------------------------- |
| `destinationAlias`  | string  | The alias of the destination you want the generated view is pushed to.      |


## Examples

```js title="actions example"
actions: function(sourceEntity, context) {
    context.reprocess('productCategory')
            .byOriginId(sourceEntity.properties.productCategoryPage.id)
            .sourceGroup('commerce');
    context.reprocess('account')
            .filter("type eq 'account' and properties.internalId eq '1234'");
    context.destination('webhook');
}
```

```js title="actions can also be expressed as an arrow function expression to make it even more compact"
actions: (sourceEntity, context) => context.reprocess('productCategory').parent()
```
