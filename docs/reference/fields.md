---
sidebar_position: 1
title: Fields
---

# Fields

## Schema fields

| Field               | Type   | Required? | Description                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------- | ------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `triggers`          | Object | **Yes**   | The source groups you want this schema to trigger on. A source group should contain one or more source entity types (`array`). <br /><br />You can add as many source groups and source entity types as you wish.                                                                                                                                                                                          |
| `properties`        | Object | **Yes**   | The properties you want your schema to consist of. See [properties types](./property-types) for supported types.                                                                                                                                                                                                                                                                                           |
| `route`             | Object | No        | Defines if you want this schema to be retrievable by a route. A route is not specifically an URL, but it can be. <br /><br /> The route property contains 2 different properties: `url` or `handles`.                                                                                                                                                                                                      |
| `actions`           | Array  | No        | Actions is used when a new view has been generated from the schema. It defines which specific actions to take following the newly generated view. <br /><br /> The Array takes an object with the properties: `type` `alias` `originId`. <br /><br /> Currently, Enterspeed supports triggering the `process` of another schema. This is done via using the `process` type, like this: `"type": "process"` |
| `sourceEntityTypes` | Array  | -         | **DEPRECATED** <br /><br /> <strike>The types of source entities you want this schema to trigger on.</strike>                                                                                                                                                                                                                                                                                              |

## Examples

### Route

#### Routing by URL

If you want your schema to be routable by an URL, you can specify the `url` as an expression. Like the example below.

```json
{
  "triggers": {
    "umbraco": ["frontPage"]
  },
  "route": {
    "url": "{url}"
  },
  "properties": {}
}
```

You are not limited to use the built in `url` property, you can also use properties defined by your source entity:

```json
{
  "triggers": {
    "umbraco": ["frontPage"]
  },
  "route": {
    "url": "{p.customFrontPageUrl}"
  },
  "properties": {}
}
```

The URL must be a valid URL: either relative `/about-us` or absolute `https://enterspeed.com/about-us`.

#### Routing by handles

If you don't want your schema to be routable by an URL, but rather something more static, you can use a handle.

The `handles` is an array, so you can specify multiple handles per schema.

```json
{
  "triggers": {
    "umbraco": ["frontPage"]
  },
  "route": {
    "handles": ["front-page"]
  },
  "properties": {}
}
```

The handle supports expressions as described for `url`:

```json
{
  "triggers": {
    "umbraco": ["frontPage"]
  },
  "route": {
    "handles": ["front-page-{p.culture}"]
  },
  "properties": {}
}
```

### Actions

To give an example, you can use `actions` when you want to update a list in a new view, that you have generated from other schemas.

For example, having a _product_ and _category_ source entity type.
When you ingest a _product_, the list of products should be updated in the generated category view and include the changes.
Consider the following examples where the ingest of _product_ will both generate a new view for the product _and_ trigger the process of the category schema to generate a new category view including the updated product:

```json title="Schema alias product"
{
  "triggers": {
    "umbraco": ["product"]
  },
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
  "triggers": {
    "umbraco": ["category"]
  },
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
