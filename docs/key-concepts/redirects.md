---
sidebar_position: 6
sidebar_label: Redirects
---

# Redirects

When changing the url of a page in a CMS or moving a product to another category, you often want to have that old url redirected to the new url.

In Enterspeed you can ingest incoming redirects on your source entities. You do that by using the `X-Enterspeed-Redirects` header in your ingest request or as part of the object in the root property called `redirects` as described in the [API documentation](/api#tag/Ingest/operation/saveEntity).

Once ingested you can see the redirects on the source entity in the Enterspeed app.

```json title='Source entity with redirect'
{
  "sourceId": "gid://Source/bce0dd5f-f371-4d5d-b95f-3ed427ec312d",
  "id": "gid://Source/bce0dd5f-f371-4d5d-b95f-3ed427ec312d/Entity/1118-en-us",
  "type": "contentPage",
  "originId": "1118-en-us",
  "originParentId": "1056-en-us",
  "url": "http://mydomain.com/new-url",
  "redirects": ["http://mydomain.com/old-url"],
  "properties": {}
}
```

By default these redirects will automatically be applied to the view as implicit redirects.

If you are using JavaScript schemas you also have the option clear the implicit redirects and create your own explicit redirects.

:::info
Implicit redirects are cleared if you map more than one URL, as Enterspeed don't know which one of the URLs the implicit redirects should point to, or if you set explicit redirects in your schema.
:::

Using explicit redirect gives you the option to dynamically build the redirects in your schema and especially if you have multiple URLs for a view you want to specify which of the URLs the different redirects should point to.

```js title="Example of explicit redirects"
routes: function(sourceEntity, context) {
  context
      .url('http://mydomain.com/new-url')
      .redirects(['http://mydomain.com/old-url']);
  context
      .url('http://mydomain.com/another-url');
}
```
[See redirect API documentation](/reference/js/routes#url)

No matter if you use implicit or explicit redirects the delivery response will be the same if you request a view on a redirect URL. From the delivery response you will get a redirect response instead of a 404 error.

```json title='A request to the old url returns a redirect response'
{
  "meta": {
    "status": 301,
    "redirect": "http://mydomain.com/new-url",
    "missingViewReferences": []
  },
  "views": null
}
```
