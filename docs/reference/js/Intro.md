---
sidebar_position: 1
---

# Intro

:::info
JavaScript schemas are still in preview, contact us if would like to try it out.
:::

With JavaScript schemas you can do everything you can do with JSON schemas and more.

With JavaScript schemas you can build your schemas in a standard language most are already familiar with. This means that you have all the power and flexibility from JavaScript available when you are creating your schemas.

```js title="JavaScript schema example"
module.exports = {
  triggers: {
      'cms': ['page']
  },
  route: async function(sourceEntity) {
    return {
      url: sourceEntity.url
    }
  },
  properties: async function (sourceEntity, context) {
    let p = sourceEntity.properties;
    return {
      title: p.title,
      blocks: await context.partial('blocks', {
        blocks: p.blocks
      }),
      aboutUsPage: await context.referenceByOriginId('page', p.aboutUsPage.id)
    }
  }
}
```

The concepts in JavaScript schemas are simular to the concepts from JSON schema, with triggers, route, properties and so on. But since the source entity and a [Context object](/reference/js/context-object) (used for making references, partials, lookups, ...) are parsed in as parameters you can even create unit tests of your schemas if you want to.