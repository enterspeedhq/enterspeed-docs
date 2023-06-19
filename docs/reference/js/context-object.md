---
sidebar_position: 2
---

# Context object

Expressions will often be used as simple placeholders to map data from the **source entity**.
Most values in schemas and partial schemas can be expressed. An expression is identified by using curly brackets `{}`:

```json
"headline": "{p.title}"
```

A value that support expression can have multiple expressions:

```json
"headline": "{p.title}: {p.subTitle}"
```

In combination with regular text:

```json
"headline": "Blog post: {p.title}"
```

## Null check

Trying to access properties of a none existing object will cause the view generation to fail.
If that's not intended add a null check using `?`.

In the following example `headline` will be set to the value of `p.meta.description`.
If `p.meta` is null (or doesn't exist) `headline`.

```json
"description": "{p.meta?.description}"
```

### Null coalescing

```json
"headline": "{p.title ?? p.header}"
```

Combined with null check:

```json
"headline": "{p.meta?.description ?? p.description}"
```

The expression can also be grouped using parentheses:

```json
"x": "{(p.a ?? p.b) ?? p.c}"
```

## Accessing properties

Accessing properties can be done by typing `p.` followed by the name of the property.

```json title="Property with default type (string)"
{
  "triggers": {
    "umbraco": ["frontPage"]
  },
  "route": {
    "url": "{url}"
  },
  "properties": {
    "headline": "{p.title}"
  }
}
```

The default type of a property is a **string**. If you need another property type, simply change your property to an object and use `type` and `value`.

```json title="Property with type number"
{
  "triggers": {
    "umbraco": ["frontPage"]
  },
  "route": {
    "url": "{url}"
  },
  "properties": {
    "stock": {
      "type": "number",
      "value": "{p.inventoryQuantity}"
    }
  }
}
```
