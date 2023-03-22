---
sidebar_position: 6
sidebar_label: Redirects
---

# Redirects

When changing the url of a page in a CMS or moving a product to another category, you often want to have that old url redirected to the new url.

In Enterspeed you can ingest incomming redirects on your source entities. You do that by using the `X-Enterspeed-Redirects` header in your ingest request as described in the [API documentation](/api#tag/Ingest/operation/saveEntity).

Once ingested you can see the redirects on the source entity in the Enterspeed app.

```json title='Source entity with redirect'
{
	"sourceId": "gid://Source/bce0dd5f-f371-4d5d-b95f-3ed427ec312d",
	"id": "gid://Source/bce0dd5f-f371-4d5d-b95f-3ed427ec312d/Entity/1118-en-us",
	"type": "contentPage",
	"originId": "1118-en-us",
	"originParentId": "1056-en-us",
	"url": "http://localhost:44354/new-url",
	"redirects": [
		"http://localhost:44354/old-url"
	],
	"properties": {
	}
}
```

Now if you request the old url in the delivery API you will get a redirect response instead of a 404 error.


```json title='A request to the old url returns a redirect response'
{
    "meta": {
        "status": 301,
        "redirect": "http://localhost:44354/new-url",
        "missingViewReferences": []
    },
    "views": null
}
```