---
sidebar_position: 1
---

# Intro

:::info
JavaScript schemas are currently in preview. Contact us if you would like to try it out.
:::

With JavaScript schemas, you can do everything you can do with JSON schemas and more.

With JavaScript schemas, you can build your schemas in a standard language most developers are already familiar with. This means that you have all the power and flexibility from JavaScript available when you are creating your schemas.

```js title="JavaScript schema example"
module.exports = {
  triggers: function(context) {
    return context.triggers('cms', ['page'])
  },
  routes: function(sourceEntity, context) {
    return context.url(sourceEntity.url)
  },
  properties: function (sourceEntity, context) {
    const p = sourceEntity.properties;
    return {
      title: p.title,
      blocks: context.partial("blocks", p.blocks),
      aboutUsPage: context.reference("page").byOriginId(p.aboutUsPage.id),
    };
  },
}
```

The concepts in JavaScript schemas are similar to the concepts from JSON schemas, with triggers, route, properties and so on, and since the source entity and a `context` object (used for making references, partials, etc.) are passed in as parameters you can even create unit tests of your schemas if you want to.

## Destructuring

You can destruct parameters, so the `routes` and `properties` method in the above example can be simplified to:

```js title="JavaScript destruct schema example"
module.exports = {
  triggers: function(context) {
    return context.triggers('cms', ['page'])
  },
  routes: function({url}, context) {
    return context.url(url)
  },
  properties: function ({properties: p}, context) {
    return {
      title: p.title,
      blocks: context.partial('blocks', p.blocks),
      aboutUsPage: context.reference('page').byOriginId(p.aboutUsPage.id)
    }
  }
}
```

## Arrow function expression

You can use arrow function expression to simplify or make your schema even more compact:

```js title="JavaScript arrow function expression schema example"
module.exports = {
  triggers: (context) => context.triggers('cms', ['page']),
  routes: ({url}, context) => context.url(url),
  properties: ({properties: p}, context) =>({
      title: p.title,
      blocks: context.partial('blocks', p.blocks),
      aboutUsPage: context.reference('page').byOriginId(p.aboutUsPage.id)
    })
}
```

## Limitations

Now, we said that you have all the power of the JavaScript language available for you in your JavaScript schemas, but we have added some limitations because of security.

This means that the following areas has been restricted.

- No access to the filesystem
- No network traffic
- Maximum processing time of 60 sec pr schema
