---
sidebar_position: 4
sidebar_label: Index schemas
---

# Index schemas

:::tip
This page gives you an introduction to the concept of indexes. Go to [schema references](/reference/js/index-schema/intro) to find the API documentation for index schemas.
:::

An index schema, as the name implies, creates an index, and more precise a search index, for you to query using the [Query API](../api#tag/Query).

An index schemas has two responsibilities:

1. Defining the index, including the name and the fields for the index
2. Mapping source entities that goes into the index as items

## Use cases

An Enterspeed search index has multiple obvious use cases.

### Lists

With an index you can create large lists of data that you can filter, sort and paginate using the Query API in you frontend application, integration or whereever you are using the Query API. 

:::info
Full and partial schemas are not build for larger lists of data from multiple source entities as they generate static views and require reprocessing everytime one of the items in the list is updated. On top of that they don't support dynamic lists and pagination.
:::

### Fetching data dynamic

With an index you can fetch a single or multiple items based on multiple dynamic parameters as opposed to full schema where you can create static handles to fecth a view.

:::info
Fetching a view by handle is still more efficient and performant than querying an index. So only use search indexes when needed. 
:::

## Configure an index schema

When using an index schema, you need to define the types for each fields, which impact the way the fields can be queried.

In the below examples, we are creating a product index and querying it from the Query API.

## Examples

Example of an index schema for products

```js title="Index schema example"
/** @type {Enterspeed.IndexSchema} */
export default {
  triggers: function(context) {
    context.triggers('pim', ['product'])
  },
  index: {
    fields: {
        sku: { type: "keyword" },
        title: { type: "text" }, 
        price: { type: "float" },
        category: { type: "keyword" }
      }
  },
  properties: function (sourceEntity) {
    return {
        sku: sourceEntity.properties.sku,
        title: sourceEntity.properties.title, 
        price: sourceEntity.properties.price.salesPrice,
        category: sourceEntity.properties.category.name
      }
  }
}
```

Query API request example for the product index.

```json title="Qeury API request for the product index"
{
  "filters": {
    "and": [
      {
        "field": "category",
        "operator": "qeuals",
        "value": "Caps"
      },
      {
        "field": "price",
        "operator": "lessThan",
        "value": 200
      }
    ]
  },
  "sort": [
    {
      "field": "price",
      "order": "asc"
    }
  ],
  "pagination": {
    "page": 0,
    "pageSize": 20
  }
}
```

See more about the [Query API](../api#tag/Query).
