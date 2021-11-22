---
sidebar_position: 3
---

# Expression

Expressions will often be used as simple placeholders to map data from the **source entity**.
Most values in schemas and partial schemas can be expressed. An expression is identified by using curly brackets `{}`:

```json
"headline": "{properties.title}"
```

A value that support expression can have multiple expressions:

```json
"headline": "{properties.title}: {properties.subTitle}"
```

In combination with regular text:

```json
"headline": "Blog post: {properties.title}"
```

## Null check

Trying to access properties of a none existing object will cause the view generation to fail.
If that's not intended add a null check using `?`.

In the following example `headline` will be set to the value of `properties.meta.description`.
If `properties.meta` is null (or doesn't exist) `headline`.

```json
"description": "{properties.meta?.description}"
```

### Null coalescing

```json
"headline": "{properties.title ?? properties.header}"
```

Combined with null check:

```json
"headline": "{properties.meta?.description ?? properties.description}"
```

The expression can also be grouped using parentheses:

```json
"x": "{(properties.a ?? properties.b) ?? properties.c}"
```
