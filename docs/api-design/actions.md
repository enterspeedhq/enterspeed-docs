---
sidebar_position: 5
---

# Actions

`actions` is used when a new view has been generated from the schema. It defines which specific actions to take following the newly generated view.
Currently, Enterspeed supports triggering the `process` of another schema.

A common use case for `actions`: To give an example, you can use `actions` when you want to update a list in a new view, that you have generated from other schemas.

For example, having a `product` and `category` source entity type.
When you ingest a `product`, the list of products should be updated in the generated category view and include the changes.
Consider the following examples where the ingest of `product` will both generate a new view for the product *and* trigger the process of the category schema to generate a new category view including the updated product:

## Examples

```json title="Schema alias product"
{
  "sourceEntityTypes": [
    "product"
  ],
  "actions": [
    {
      "type": "process",
      "alias": "category",
      "originId": "{p.categoryId}"
    }
  ],
  "properties": {
    "name": "{p.name}"
  }
}
```

```json title="Schema alias category"
{
  "sourceEntityTypes": [
    "category"
  ],
  "route": {
    "url": "/categories/{p.slug}"
  },
  "properties": {
    "title": "{p.name}",
    "description": "{p.description}", 
    "products": {
      "type": "array",
      "input": {
        "$lookup": {
          "filter": "type eq 'product' and properties.categoryId eq '{originId}'"
        }
      },
      "var": "product",
      "items": {
        "type": "object",
        "properties": {
          "headline": "{product.p.name}"
        }
      }
    }
  }
}
```
