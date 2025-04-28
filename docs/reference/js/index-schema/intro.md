---
sidebar_position: 1
---

# Intro

:::info
 Index schemas are currently in preview. Contact us if you would like to try it out.
 :::
 
An index schema defines the structure of a Query index as well as the mapping of the items that goes into the index which are queryable from the [Query API](/api#tag/Query).

```js title="JavaScript index schema example"
/** @type {Enterspeed.IndexSchema} */
export default {
  triggers: function(context) {
    context.triggers('pim', ['product'])
  },
  index: {
    fields {
        sku: { type: "keyword" }, 
        title: { type: "text" }, 
        description: { type: "text" },
        isActive: { type: "boolean" }
      }
  },
  properties: function (sourceEntity) {
    return {
        sku: sourceEntity.properties.sku, 
        title: sourceEntity.properties.title, 
        description: sourceEntity.properties.description,
        isActive: sourceEntity.properties.isActive
      }
  }
}
```