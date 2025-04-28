---
sidebar_position: 3
---

# Index

The `index` object is where you define the structure of the index. The index defines what kind of data you can add to the index in the [properties](/reference/js/index-schema/properties) method.

```js title="Index example"
index: {
  fields: {
    sku: { type: "keyword" }, 
    title: { type: "text" }, 
    description: { type: "text" },
    isActive: { type: "boolean" }
  }
}
```

The index object must have a `fields` property with the fields you want to include in the index.

Each field object must include `type`. The `type` specifies the data type for the index field.

## Types

Setting the right types for the properties in your index is important. The types defines the intend of the fields and prevents data of other types from going into the index. The types also helps with effeciently index, search, and analyze of the data added to the index. 

### Text

| Type                | Description                                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------------------------------- |
| keyword             | The `Keyword` type is for string values used in filtering and sorting                                       |
| text                | The `text` type will analyze string values, improving results when querying using full text search           |

### Numeric

| Type                | Description                                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------------------------------- |
| integer             | A 32 bit signed integer                                                                                     |
| long                | A 64 bit signed integer                                                                                     |
| float               | A 32 bit signed floating number                                                                             |
| double              | A 64 bit signed floating number                                                                             |

### Boolean

| Type                | Description                                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------------------------------- |
| boolean             | A `true` / `false` value                                                                                    |

### Date

| Type                | Description                                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------------------------------- |
| date                | Support values like a Javascript Date object, a string like `2024-11-21T23:00:00Z` or number of milliseconds since eclipse |

### List

| Type                |  Description                                                                                                |
| ------------------- | ----------------------------------------------------------------------------------------------------------- |
| keyword[]           | List of the `Keyword` type for string values used in filtering and sorting                                  |
| text[]              | List of the `text` type for analyzing string values, improving results when querying using full text search |
| integer[]           | List of 32 bit signed integers                                                                              |
| long[]              | List of 64 bit signed integers                                                                              |
| float[]             | List of 32 bit signed floating numbers                                                                      |
| double[]            | List of 64 bit signed floating numbers                                                                      |
| boolean[]           | List of `true` / `false` values                                                                             |
| date[]              | List of dates with supported values like a Javascript Date object, strings like `2024-11-21T23:00:00Z` or numbers of milliseconds since eclipse |

### Range

| Type                | Description                                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------------------------------- |
| integerRange        | Must be an object like<br /> `{"gt": 10, "lt": 20}` or<br /> `{"gte": 10, "lte": 20}`                       |
| longRange           | Must be an object like<br /> `{"gt": 10, "lt": 20 }` or<br /> `{"gte": 10, "lte": 20}`                      |
| floatRange          | Must be an object like<br /> `{"gt": 10.0, "lt": 20.0}` or<br /> `{"gte": 10.0, "lte": 20.0}`               |
| doubleRange         | Must be an object like<br /> `{"gt": 10.0, "lt": 20.0}` or<br /> `{"gte": 10.0, "lte": 20.0}`               |
| dateRange           | Must be an object like<br /> `{"gt": "2025-01-01", "lt": "2025-02-01"}` or<br /> `{"gte": "2025-01-01", "lte": "2025-02-01"}` |

