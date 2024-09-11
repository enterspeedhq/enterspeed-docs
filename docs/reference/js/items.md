---
sidebar_position: 7
---
# Items

:::info
Items and collection schemas are a preview feature while we gather feedback and improve the feature. Please note that the collection schemas currently is limited to JavaScript Schemas.

Contact us if would like to try it out.
:::

The `items` method is available only in [collection schemas](/key-concepts/collection-schemas). Method is used to define collection items that goes into the collection view you can fetch in slices from [delivery API](/api#tag/Delivery).


```js title="Items example"
items: function (sourceEntity, context) {
    return context.reference('category')
    .children(`type eq 'product'`)
    .orderBy({propertyName: 'properties.price', direction: 'desc'})
}
```

The items method must return reference builder.

# CollectionItemsContext object

The `CollectionItemsContext` object is passed into the `items` method and gives you access to a set of methods described below.

## Methods

| Method                             | Description                                                                                                                   |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| [reference](#reference)            | Referencing a full schema. References to other schemas are resolved on delivery request time.                                 |


---

### reference

The `reference` are used to reference other views created from either this source entity or another source entity.

When referenced, Enterspeed will resolve the view when requested by the Delivery API so that the data will stay up-to-date if a reference view is updated.

The `reference` function is the starting point where you can use our fluent API to configure the reference(s) you want (by filter, by originIds, take only top 5, and so on).

:::tip
Reference schemas are typically used when you are mapping data from another entity. E.g. a page has a reference to another page entity or media entity.

Read more about reference schemas [here](/key-concepts/referencing-schemas.md)
:::

`reference(schemaAlias)`

#### Parameters

| Parameter     | Type   | Description                                        |
| ------------- | ------ | -------------------------------------------------- |
| `schemaAlias` | string | The alias of a schema.                             |

#### Required function calls

After the `reference` function it's required to call one of the following functions to define what source entities you want references to.

<details>
<summary>byOriginIds</summary>

Using the byOriginIds function lets you create a references to a list of source entity by their oringinId.

#### Parameters

| Parameter     | Type     | Description                                        |
| ------------- | -------- | -------------------------------------------------- |
| `originIds`   | string[] | A list of original ids from the source system.                           |

```js title="reference by byOriginIds"
context
    .reference("contentTeaser")
    .byOriginIds(sourceEntity.properties.links.map(link => link.id))
```

</details>

<details>
<summary>children</summary>

The children function creates a reference to all the children of the current source entity. It's basicly a shortcut for `.filter("originParentId eq '{sourceEntity.properties.originId}'")`.

```js title="reference by children"
context.reference("page").children()
```

```js title="reference by children and type"
context.reference("page").children("type eq 'subpage'")
```

:::note
The `children` function is limited to a maximum number of items to return, based on the tenant plan. It can however be increased per tenant basis. Please reach out to Enterspeed if needed.

The default limits are:

- Free & Premium plans: 100 items  
- Enterprise plan: 500 items
:::

</details>

<details>
<summary>filter</summary>

Using the filter function lets you do a dynamic search for source entities you want to make references to.

#### Parameters

| Parameter     | Type   | Description                                        |
| ------------- | ------ | -------------------------------------------------- |
| `filter`      | string | Your filtering criteria.                           |

See list of filter examples [here](/reference/filter-expressions.md)

```js title="reference by filter"
context
    .reference("newsTeaser")
    .filter("type eq 'newsArticle'")
```

:::note
The `filter` function is limited to a maximum number of items to return, based on the tenant plan. It can however be increased per tenant basis. Please reach out to Enterspeed if needed.

The default limits are:

- Free & Premium plans: 100 items  
- Enterprise plan: 500 items
:::

</details>

#### Optional function calls

To filter the source entities you are making references to even further you can call some of the following optional functions.

<details>
<summary>limit</summary>

The `limit`` function limits the number of references.

#### Parameters

| Parameter     | Type   | Description                                        |
| ------------- | ------ | -------------------------------------------------- |
| `limit`       | number | The maximum number of references to return.        |

```js title="reference by filter and limit"
context
    .reference("newsTeaser")
    .filter("type eq 'newsArticle'")
    .limit(5)
```

</details>

<details>
<summary>orderBy</summary>

The order sequence of references.

#### Parameters

| Parameter     | Type   | Description                                        |
| ------------- | ------ | -------------------------------------------------- |
| `orderBy`      | \{ propertyName: string, direction: "asc" \| "desc" } | Allows you to specify your desired sorting order.        |

```js title="reference by filter and orderBy"
context
    .reference("newsArticle")
    .filter("type eq 'newsArticle'")
    .orderBy({ propertyName: "properties.createdDate", direction: "desc"})
```

</details>

<details>
<summary>sourceGroup</summary>

The sourceGroup function lets you specify the source group. By default the source group of the current source entity is used.

#### Parameters

| Parameter     | Type   | Description                                        |
| ------------- | ------ | -------------------------------------------------- |
| `sourceGroup` | string | Allows you to define a different source group. The sourceGroupAlias should be equal to the desired source group alias where you want to look for source entities.

If not defined, it uses the current source group.

```js title="reference by filter and sourceGroup"
context
    .reference("newsTeaser")
    .filter("type eq 'newsArticle'")
    .sourceGroup("anotherSourceGroup")
```

</details>

# Slicing options in Delivery API
Example collection: `[A B C D E F G H I J]`

:::info
The start index is inclusive.
:::

1. **Default Request**  
   - **Request:** `?handle=products`
   - **Description:** Fetches the first X items in ascending order from the collection. By default, X is 10.
   - **Result:** `[A B C D E F G H I J]`

2. **Specified Number of Items**  
   - **Request:** `?handle=products(3)`
   - **Description:** Retrieves the first 3 items in ascending order.
   - **Result:** `[A, B, C]`

3. **Custom Start and Range**  
   - **Request:** `?handle=products(2,3)`
   - **Description:** Starts from the 2nd item and fetches the next 2 items in ascending order.
   - **Result:** `[B, C, D]`

4. **Fetching from the End**  
   - **Request:** `?handle=products(-3)`
   - **Description:** Retrieves the last 3 items in descending order.
   - **Result:** `[J, I, H]`

5. **Custom Reverse Start and Range**  
   - **Request:** `?handle=products(-2, 3)`
   - **Description:** Starts 2 items from the end and fetches the 2 preceding items in descending order.
   - **Result:** `[I, H, G]`

# Defaults
- Maximum collection size is 10.000 items, but it can be increased per tenant basis. Please reach out to Enterspeed if needed.
- Default slice size during delivery request is 10.
- Maximum slice size during delivery request is 100.