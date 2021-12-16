---
sidebar_position: 1
title: Schema
---

# Reference: Schema
import { Badge } from '../../../src/components/badge';

## Alias
The alias is the identifier of your schema. This is used when:

- referencing the schema from another schema with the [reference type](./property-types#reference).

## Source Entity Types <Badge type="required" />
The `sourceEntityTypes` are used to define which types of **source entities** you want this schema to trigger on.

## Route

The `route` property defines if you want this schema to be retrievable by a route.

A route is not specifically an URL, but it can be. The route property contains 2 different properties: `url` or `handles`.

### Routing by URL

If you want your schema to be routable by an URL, you can specify the `url` as an expression. Like the example below.

```json
{
  "sourceEntityTypes": ["frontPage"],
  "route": {
    "url": "{url}"
  },
  "properties": {}
}
```

You are not limited to use the built in `url` property, you can also use properties defined by your source entity:

```json
{
  "sourceEntityTypes": ["frontPage"],
  "route": {
    "url": "{p.customFrontPageUrl}"
  },
  "properties": {}
}
```

The URL must be a valid URL: either relative `/about-us` or absolute `https://enterspeed.com/about-us`.

### Routing by handles

If you don't want your schema to be routable by an URL, but rather something more static, you can use a handle.

The `handles` is an array, so you can specify multiple handles per schema.

```json
{
  "sourceEntityTypes": ["frontPage"],
  "route": {
    "handles": ["front-page"]
  },
  "properties": {}
}
```

The handle supports expressions as described for `url`:

```json
{
  "sourceEntityTypes": ["frontPage"],
  "route": {
    "handles": [
      "front-page-{p.culture}"
    ]
  },
  "properties": {}
}
```

## Properties <Badge type="required" />

When doing the schema, you have to define what properties you want your schema to consist of.

The following types to create the schema mapping can be used:

| Property                            | Description                                                                  |
| ----------------------------------- | ---------------------------------------------------------------------------- |
| [String](./property-types#string)       | Basic string mapping.                                                        |
| [Number](./property-types#number)       | Basic number or integer mapping.                                             |
| [Boolean](./property-types#boolean)     | Basic boolean mapping.                                                       |
| [Array](./property-types#array)         | Mapping of an array, defining the input to iterate and the items definition. |
| [Object](./property-types#object)       | Mapping of an object.                                                        |
| [Reference](./property-types#reference) | Referencing another schema.                                                  |
| [Partial](./property-types#partial)     | Referencing a partial schema to map the data into.                           |

## Actions

`actions` is used when a new view has been generated from the schema. It defines which specific actions to take following the newly generated view.
Currently, Enterspeed supports triggering the `process` of another schema.

A common use case for `actions`: To give an example, you can use `actions` when you want to update a list in a new view, that you have generated from other schemas.

For example, having a `product` and `category` source entity type.
When you ingest a `product`, the list of products should be updated in the generated category view and include the changes.
Consider the following examples where the ingest of `product` will both generate a new view for the product *and* trigger the process of the category schema to generate a new category view including the updated product:

### Examples

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