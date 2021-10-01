---
sidebar_position: 1
---

# Introduction

## View handle

The view handle is the identifier of your schema. This is used when:

- referencing the view from another schema with the reference type

## Source Entity Types

The source entity types is used to define what types of Source Entities you want this schema to trigger on.

## Route

The route property defines if you want this schema to be retrievable by a route.

A route is not specifically an URL, but it can be. The route property contains 2 different properties: url or handles.

### Routing by URL

If you want your schema to be routable by an URL, you can specify the URL to use in an `$exp`. Like the example below.

```javascript
{
  "viewHandle": "Frontpage",
  "sourceEntityTypes": ["frontPage"],
  "environments": [...],
  "route": {
    "url": {
      "$exp": "{url}"
    }
  },
  "properties": {}
}
```

You are not limited to use the built in `url` property, you can also use custom properties defined by your source:

```javascript
{
  "viewHandle": "Frontpage",
  "sourceEntityTypes": ["frontPage"],
  "environments": [...],
  "route": {
    "url": {
      "$exp": "{properties.customFrontPageUrl}"
    }
  },
  "properties": {}
}
```

The URL must be a valid URL: either relative `/about-us` or absolute `https://enterspeed.com/about-us`.

### Routing by handles

If you don't want your schema to be routable by an URL, but rather something more static, you can use a handle.

The `handles` is an array, so you can specify multiple handles per schema.

A handle gets its value by utilizing the `$exp`, as shown below.

```javascript
{
  "viewHandle": "Frontpage",
  "sourceEntityTypes": ["frontPage"],
  "environments": [...],
  "route": {
    "handles": [
      {
        "$exp": "front-page"
      }
    ]
  },
  "properties": {}
}
```

The handle can also contain Source Entity properties, like the URL:

```javascript
{
  "viewHandle": "Frontpage",
  "sourceEntityTypes": ["frontPage"],
  "environments": [...],
  "route": {
    "handles": [
      {
        "$exp": "front-page-{properties.culture}"
      }
    ]
  },
  "properties": {}
}
```

## Properties

When doing the schema, you have to define what properties you want your schema to consist of.

The following types to create the schema mapping can be used:

| Property       | Description                                                                  |
| -------------- | ---------------------------------------------------------------------------- |
| [String](#)    | Basic string mapping.                                                        |
| [Number](#)    | Basic number or integer mapping.                                             |
| [Boolean](#)   | Basic boolean mapping.                                                       |
| [Array](#)     | Mapping of an array, defining the input to iterate and the items definition. |
| [Object](#)    | Mapping of an object.                                                        |
| [Reference](#) | Referencing another schema.                                                  |
| [Partial](#)   | Referencing a partial schema to map the data into.                           |
