---
sidebar_position: 7
sidebar_label: Source Groups
---

# Source Groups

Source groups contains the sources you ingest your source entities into. Typically you have a source per environment inside a source group.

## Modes

Source groups works in two different modes. Modes are selected on source group creation and can't be changed afterwards.

### Schema Transformation (default)

Schema Transformation is the default and recommended mode for most scenarios. It enables you to transform and combine source entities into views or index items using defined schemas.

Once processed, views can be accessed via the [Delivery API](/api#tag/Delivery), while index items are available for querying through [Query API](../api#tag/Query/operation/queryAutoIndengPost).

The schema transformation is a powerfull feature, allowing you to tailor and structure data precisely to meet consumer needs. However, because the transformation process takes time, this mode is best suited for non-real-time data.

### Auto Indexing

On Auto indexing mode there is no transformation process. Instead, ingested source entities goes directly into an index, which can be queried using the [Query API](/api#tag/Query/operation/queryAutoIndengPost). 

Since no transformation is involved, the Auto Indexing mode is suited for scenarios such as handling large volumes of small, custom price objects that don’t require transformation, or frequently changing data like stock numbers.

When setting up an Auto Indexing Source Group you will need to define the fields and their data types that goes into the index. This is done using a JSON format as the example below.

```json
{
  "price": { // the type of the source entity that will use this index
    "fields": { // the fields that are added to the index
      "sku": {
        "type": "keyword",
        "metadata": {
          "description": "The product key"
        }
      },
      "price": {
        "type": "float",
        "metadata": {
          "description": "The sales price of the product"
        }
      },
      "validFrom": {
        "type": "date",
        "metadata": {
          "description": "A from date where the price is active"
        }
      },
      "validTo": {
        "type": "date",
        "metadata": {
          "description": "A to date where the price is active"
        }
      }
    },
    "metadata": {
      "description": "The price of a product for a specific time interval"
    }
  }
}
```

:::info
Note. Once an index is created it can't be changed. Instead you will need to create a new data source.
:::

:::info
Note. Ingested properties not defined in the index fields will be discarded.
:::

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
| date                | Support values like a Javascript Date object, a string like `2024-11-21` or `2024-11-21T23:00:00Z` or number of milliseconds since eclipse |

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