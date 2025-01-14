---
sidebar_position: 3
---

# Index

The `index` method is where you define the structure of the index and the values that goes into the index you query from the [Query API](/api#tag/Query)

```js title="Index example"
index: function (sourceEntity) {
  return {
      sku: { type: "keyword", value: sourceEntity.properties.sku }, 
      title: { type: "text", value: sourceEntity.properties.title}, 
      description: { type: "text", value: sourceEntity.properties.description},
      isActive: { type: "boolean", value: sourceEntity.properties.isActive}
  };
}
```

The index method must return an object with the properties you want to include in the index.

Each property object must include `type` and `value`. The `type` specifies the data type for the index field and the `value` specifies the values that goes into the index.

## Types

Setting the right types for the properties in your index is important. The types defines the intend of the fields and prevents data of other types from going into the index. The types also helps with effeciently index, search, and analyze of the data added to the index. 

| Method              | Description                                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------------------------------- |
| keyword             | The `Keyword` type is for string values used in filtering and sorting                                       |
| text                | The `text` type will analyze string values, improving results whn querying using full text search           |
| boolean             | A `true` / `false` value                                                                                    |
| integer             | An integer value                                                                                            |
| float               | A floating number                                                                                           |

