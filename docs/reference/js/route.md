---
sidebar_position: 3
---

# Route

:::info
JavaScript schemas are currently in preview. Contact us if you would like to try it out.
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

A handle is a key from which you can fetch the view. A view can have multiple handles, so it's an array of strings.

# RouteContext object

The `RouteContext` object is passed into the `route` method and gives you access to a set of methods which is described below.

## Methods

| Method            | Description                                                                                                                       |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| [lookup](#lookup) | Lookup allows you to search source entities based on a filter to map or reference data from other source entities in your schema. |

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

See list of filter examples [here](//docs/reference/filter-expressions.md)
