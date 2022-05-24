---
sidebar_position: 4
---

# Path selector

The path selector is based on JSON Path. It can be used to select and filter data from the source entity.
This is available as input for [array](./property-types#path-input) and for the [dynamic property type](./property-types#dynamic) to map data from the source entity.

For dynamic mapping, the selector should result in a property value (single token).
When using `$path` for the array input the result is expected to be a list of property values (multiple tokens).

Mapping all source entity properties:

```json
"product": {
	"*": "p"
}
```

Consider, that you want the entire list of product features:

```json
"features": {
	"*": "p.features"
}
```

If you only want the `name` of the features:

```json
"tabs": {
  "type": "array",
  "input": {
    "$path": "p.features[*]"
  },
  "var": "feature",
  "items": {
    "type": "string",
    "value": "{item.name}"
  }
}
```

If you want all features with its `display` property equals true:

```json
"tabs": {
  "type": "array",
  "input": {
    "$path": "p.features[?(@.display==true)]"
  },
  "var": "feature",
  "items": {
    "type": "string",
    "value": "{item.name}"
  }
}
```

You can combine dynamic mapping and arrays:

```json
"tabs": {
  "type": "array",
  "input": {
    "$path": "p.features[?(@.display==true)]"
  },
  "var": "feature",
  "items": {
    "type": "object",
    "feature": {
      "*": "{feature}"
    }
  }
}
```
