---
sidebar_position: 1
---

# Intro

:::info
JavaScript schemas are still in preview. Contact us if you would like to try it out.
:::

With JavaScript schemas, you can do everything you can do with JSON schemas and more.

With JavaScript schemas, you can build your schemas in a standard language most developers are already familiar with. This means that you have all the power and flexibility from JavaScript available when you are creating your schemas.

```js title="JavaScript schema example"
module.exports = {
  triggers: {
    cms: ["page"],
  },
  route: async function (sourceEntity) {
    return {
      url: sourceEntity.url,
    };
  },
  properties: async function (sourceEntity, context) {
    const p = sourceEntity.properties;
    return {
      title: p.title,
      blocks: await context.partial("blocks", {
        blocks: p.blocks,
      }),
      aboutUsPage: await context.referenceByOriginId("page", p.aboutUsPage.id),
    };
  },
};
```

The concepts in JavaScript schemas are similar to the concepts from JSON schemas, with triggers, route, properties and so on, and since the source entity and a `context` object (used for making references, partials, lookups, etc.) are passed in as parameters you can even create unit tests of your schemas if you want to.

## Destructuring

You can even destruct the parameters, so the `properties` method in the above example can be simplified to:

```js title="JavaScript destruct schema example"
module.exports = {
  triggers: {
      'cms': ['page']
  },
  route: async ({url}) => ({
	    url
	  })
	},
  properties: async function ({properties: p}, context) =>({
      title: p.title,
      blocks: await context.partial('blocks', {
        blocks: p.blocks
      }),
      aboutUsPage: await context.referenceByOriginId('page', p.aboutUsPage.id)
    })
}
```

## Limitations

Now, we said that you have all the power of the JavaScript language available for you in your JavaScript schemas, but we have added some limitations because of security.

This means that the following areas has been restricted.

- No access to the filesystem
- No network traffic
- Maximum processing time of 60 sec pr schema
