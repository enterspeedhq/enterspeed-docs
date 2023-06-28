---
sidebar_position: 3
---

# Route

:::info
JavaScript schemas are still in preview, contact us if would like to try it out.
:::

The `route` method is where you define how you fetch the generated view from the [Delivery API](/api#tag/Delivery)

If your view should be routeable you must implement the `route` method and return an object with one or two properties called `url` and `handles`

```js title="Route example"
route: async function(sourceEntity, context) {
    return {
        url: sourceEntity.url,
        handles: [
            'origin-'+sourceEntity.originId
        ]
    }
}
```

## Url
A string value that represents the url you want to fetch the view by.

## Handles
A handle is a key from with you can fetch the view. A view can have multiple handles so it's an array of strings.

# RouteContext object

The `RouteContext` object are passed in to the `route` method and gives you access to set of methods which is described on below.

## Methods

| Method                            | Description                                                                                                                          |
| ----------------------------------| -------------------------------------------------------------------------------------------------------------------------------------|
| [lookup](#lookup)                 | Lookup allows you to search source entities based on a filter to map or reference data from other source entities in your schema.    |

### lookup

Lookup allows you to define query-like and criteria match source entities lookup conditions.

`lookup(filter, top?, orderBy?, sourceGroupAlias?): Promise<SourceEntityDto[]>`

#### Parameters

| Parameter           | Type      | Description                                                                                                        |
| ------------------- | --------- | ------------------------------------------------------------------------------------------------------------------ |
| `filter`            | string    | Your filtering criteria                                                                                            |
| `top`               | number    | `Optional`. Allows limiting the size of items collection. Default value is 10, maximum is 100                                  |
| `orderBy`           | { direction: "asc" \| "desc", propertyName: string }        | `Optional`. Allows you to specify your desired sorting order.                |
| `sourceGroupAlias`  | string    | `Optional`. Allows you to define a different source group. The `sourceGroupAlias` should be equal to the desired source group alias, where you want to look for source entities.<br/><br/> If not defined, it uses the current source group.                                                     |


##### `filter`

**Examples of supported binary operators, expressions & lambda operators:**

```javascript title="EQUALS operator"
// Property value equal to constant string value
originId eq '100'

// Property value equal to expressed string value
originId eq '{p.selectedOtherPageId}'

// Property value is null
originParentId eq null

// Property value equal to integer value
properties.price eq 9

// Property value equal to decimal value
properties.price eq 9.99

// Property value equal to boolean value (true/false)
properties.isFeatured eq true
```

```javascript title="NOT EQUALS operator"
// Property value not equal to constant string value
originId ne '100'

// Property value not equal to expressed string value
originId ne '{p.selectedOtherPageId}'

// Property value is not null
originParentId ne null

// Property value not equal to integer value
properties.price ne 9

// Property value not equal to decimal value
properties.price ne 9.99

// Property value not equal to boolean value (true/false)
properties.isFeatured ne true
```

```javascript title="AND operator"
type eq 'article' and properties.isFeatured eq true
```

```javascript title="OR operator"
type eq 'article' or type eq 'contentPage'
```

```javascript title="An array contains any matching value:"
// Contains specific redirect with constant string value
redirects/any(r: r eq '/old-page')

// Contains specific tag with expression string value
properties.tags/any(t: t eq '{p.selectedTag}')

// Contains an articles that featured, matching constant boolean value
properties.articles/any(a: a.isFeatured eq true)
```

```javascript title="Check whether the element exists in this collection"
// Finds matches in favorites selection (array of integers)
originId in {properties.favoriteIds}

// Finds matches in colors selection (array of strings)
properties.color in {properties.selectedColors}

// Finds matches in predefined integers array
originId in (100, 200)

// Finds matches in predefined strings array
properties.color in ('blue', 'red', 'green')
```

```js title="Lambda operator"
const category = await context.lookup(`type eq 'category' and originId eq '${originId}'`)[0]; 
url: `${category.url}/${sourceEntity.properties.productSku}`
```

---

