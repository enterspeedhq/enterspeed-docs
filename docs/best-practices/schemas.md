---
sidebar_position: 3
title: Schemas
---

# Schemas

### Make your reprocess actions as specific as possible
Reprocess actions can cause execessive processing, especially if you reprocess more than needed. This could result in a larger queue of jobs, and it will take longer for all your views to be updated.

Because of that, it's important to make your reprocess actions as precise as possible, by using `originId` or a precise `filter` so you only target the schemas and source entities you actually need to reprocess.

Read more about [reprocessing](/key-concepts/reprocessing.md).

### Exclude properties from lookup if you don't need them
By default when you do a [lookup](/reference/js/properties#lookup) in a schema, the entire source entities are loaded from storage, including the `properties` object. 

```json title="Full source entity including all custom properties"
{
  "sourceId": "gid://Source/e3211d99-e496-4e11-af3d-328eb543619f",
  "id": "gid://Source/e3211d99-e496-4e11-af3d-328eb543619f/Entity/1098-en-us",
  "type": "home",
  "originId": "1098-en-us",
  "originParentId": null,
  "url": "https://fairy-tales.com/",
  "updatedAt": "2023-07-18T08:20:41.8162846Z",
  "redirects": [],
  "properties": {
    "title": "Fairy tales by H. C. Andersen",
    "text": "Read the wonderful fairy tales from the danish author and poet Hans Christian Andersen. Classic tales like \"The Emperor's New Clothes\", \"The Snow Queen\" and many more.",
    ...
  }
}
```

But in some cases you don't need all the custom properties, only some of the base fields like `originId`, `originParentId`, or `url`.

In these cases it's important to specify that in the `lookup`, as this will improve performance and lower the amount of time it takes to generate views.

You do that by setting `excludeProperties` to `true` in the `lookupOptions` parameter.

```js title="lookup with excluded custom properties"
properties: async function (sourceEntity, context) {
  const fairyTales = await context
                          .lookup("type eq 'fairyTale'", { excludeProperties: true })
                          .limit(3)
                          .toPromise();

  return {
    fairyTales: fairyTales
                  .map((fairyTale) => ({
                      // fairyTale.properties is not available
                      id: fairyTale.originId,
                      url: fairyTale.url,
                  }));
  }
}
```
