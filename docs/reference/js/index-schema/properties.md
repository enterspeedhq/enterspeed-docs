---
sidebar_position: 4
---

# Properties

:::info
 Index schemas are currently in preview. Contact us if you would like to try it out.
 :::

The `properties` method is where you define the output of the items that goes into index you can query from the [Query API](/api#tag/Query)

```js title="Properties example"
properties: function (sourceEntity) {
  return {
      sku: sourceEntity.properties.sku, 
      title: sourceEntity.properties.title, 
      description: sourceEntity.properties.description,
      isActive: sourceEntity.properties.isActive
  };
}
```

The properties method must return an object with the values for the fields you defined in the [index](/reference/js/index-schema/indexMethod) object.
