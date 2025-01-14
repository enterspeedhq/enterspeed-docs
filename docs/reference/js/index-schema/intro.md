---
sidebar_position: 1
---

# Intro

An index schema defines the structure of a Query index as well as the mapping of the items that goes into the index which are queryable from the [Query API](/api#tag/Query).

```js title="JavaScript index schema example"
/** @type {Enterspeed.IndexSchema} */
export default {
  triggers: function(context) {
    context.triggers('pim', ['product'])
  },
  index: function (sourceEntity) {
    return {
        sku: { type: "keyword", value: sourceEntity.properties.sku }, 
        title: { type: "text", value: sourceEntity.properties.title}, 
        description: { type: "text", value: sourceEntity.properties.description},
        isActive: { type: "boolean", value: sourceEntity.properties.isActive}
      }
  }
}
```