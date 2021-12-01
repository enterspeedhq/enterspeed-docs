---
sidebar_position: 2
---

# Schema

## Alias

The alias is the identifier of your schema. This is used when:

- referencing the schema from another schema with the [reference type](./properties#reference).

## Shorthand

In the example below notice how `p` serves as a shorthand for `properties` on the **source entity**.
When `p.title` is used it's equivalent to `properties.title`.

`headline` defined as a string.
It possible to be more explicit:

```json
{
  "sourceEntityTypes": ["frontPage"],
  "route": {
    "url": "{url}"
  },
  "properties": {
    "headline": {
      "type": "string",
      "value": "{p.title}"
    }
  }
}
```

## Source Entity Types

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

## Properties

When doing the schema, you have to define what properties you want your schema to consist of.

The following types to create the schema mapping can be used:

| Property                            | Description                                                                  |
| ----------------------------------- | ---------------------------------------------------------------------------- |
| [String](./properties#string)       | Basic string mapping.                                                        |
| [Number](./properties#number)       | Basic number or integer mapping.                                             |
| [Boolean](./properties#boolean)     | Basic boolean mapping.                                                       |
| [Array](./properties#array)         | Mapping of an array, defining the input to iterate and the items definition. |
| [Object](./properties#object)       | Mapping of an object.                                                        |
| [Reference](./properties#reference) | Referencing another schema.                                                  |
| [Partial](./properties#partial)     | Referencing a partial schema to map the data into.                           |

## Example schema

Below is a simple example showing how a schema can look for transforming *source entities* with the type of `frontPage`.
The schema will the `url` to the `route` and the `title` property of `frontPage` to `headline`.

```json
{
  "sourceEntityTypes": ["frontPage"],
  "route": {
    "url": "{url}"
  },
  "properties": {
    "headline": "{p.title}"
  }
}
```

Given the `frontPage` source entity have the following content:

```json
{
  "url": "/frontPage",
  "properties": {
    "title": "Welcome"
  }
}
```

When querying the Delivery API with `url=/frontPage` the output will be:

```json
{
  "title": "Welcome"
}
```
