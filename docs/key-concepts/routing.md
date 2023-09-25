---
sidebar_position: 5
sidebar_label: Routing
---

# Routing

You can do routing by either Url or Handle

## URL

If you want your schema to be routable by an URL, you can specify the `url` as an expression.

If we take a look at this example we can see that we have a Url property available in the Data Source

```json title="Source entity example"
{
  "id": "1044-en-us",
  "type": "frontPage",
  "url": "/frontPage",
  "properties": {
    "title": "Welcome",
    "description": "description value"
  }
}
```

In the below example of the schema for this Data Source, we can see that the route is mapped to the url property on the Data Source. This means that you can get the data from this source
by making a request to `https://delivery.enterspeed.com/v1?url=/frontpage`

```js
/** @type {Enterspeed.FullSchema} */
export default {
  triggers: function(context) {
    context.triggers('umbraco', ['frontPage'])
  },
  routes: function(sourceEntity, context) {
    context.url(sourceEntity.url)
  },
  properties: function (sourceEntity, context) {
    return sourceEntity.properties
  }
}
```

## Handle

Handle differentiates a bit from URL routing. A handle can be whatever you would like.
In this example, a navigation structure is returned. The schema returns an array of navigation items and utilizes the lookup and [reference](../key-concepts/referencing-schemas.md) fields.
This handle would be called like this: `https://delivery.enterspeed.com/v1?handle=mainNavigation`

```js
/** @type {Enterspeed.FullSchema} */
export default {
  triggers: function(context) {
    context.triggers('umbraco', ['navigationGroup'])
  },
  routes: function(sourceEntity, context) {
    context.handle('mainNavigation')
  },
  properties: function (sourceEntity, context) {
    return children: context.reference('navigationItem')
                          .children()
                          .orderBy({ 
                            propertyName: 'properties.metaData.sortOrder', 
                            direction: 'desc' 
                          })
  }
}
```
