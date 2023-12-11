---
sidebar_position: 8
title: Typesense
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BrowserOnly from '@docusaurus/BrowserOnly';

# Typesense

:::info
We are currently working on a UI for Destinations. This means that soon you will be able to setup Typesense directly from the Enterspeed APP. 

For now, contact us if want to get started.
:::

The Enterspeed Typesense integration uses the [destinations field](../reference/fields.md#destinations) to send data from views directly to a configured Typesense cluster. This means that you can decide on schema level which views you want to send to Typesense.

You will only have to set the destination field on the entity schema you want to send to Typesenses. All schema references are automatically resolved so you don't have to set it on all referenced schemas.

It's possible to configure multiple Typesense destinations if you need to push different types of data to different Typesense clusters.

## Configuration

In order to setup the Typesense configuration you need the following:

| Setting                               | Description                            |
| ------------------------------------- | -------------------------------------- |
| Typesense Server URL                  | The Server URL for the Typesense cluster you want to integrate to |
| Typesense API Key                     | A Typesense Admin API key |
| Enterspeed Environment Client API Key | The API key for an Enterspeed Environment client. This is used to fetch the view that will be inserted into Typesense |

## Schema options

On Enterspeed schema level you have the following options:

| Option                                | Required    | Description                            |
| ------------------------------------- | ----------- | -------------------------------------- |
| collection                            | Required    | The Typesense collection the data should be send to |
| id                                    | Optional    | The the value that should be used as id in for the Typesense document. If omitted, the Enterspeed view id will be used |
| dirtyValues                           | Optional    | Defines what Typesense should do when the type of a particular field being indexed does not match the Typesense schema.<br /><br />Valid values are: `coerce_or_reject` (default), `coerce_or_drop`, `drop`, `reject`<br /><br />See more documentation on [Typesense](https://typesense.org/docs/0.25.1/api/documents.html#dealing-with-dirty-data) |

## Example of usage

<BrowserOnly>
{() =>
<Tabs>
<TabItem value="js" label="JavaScript" default>

```js title="Content schema with Typesense destination"
/** @type {Enterspeed.FullSchema} */
export default {
  triggers: function(context) {
    context.triggers('cms', ['content']);
  },
  actions: function (sourceEntity, context) {
    context.destination('typesense').options({
      id: sourceEntity.originId,
      collection: 'content'
      dirtyValues: 'coerce_or_reject'
    });
  },
  properties: function ({properties: p, url}, context) {
    return {
      product: {
        url: url,
        title: p.title,
        content: p.text
    }
  }
}
```

</TabItem>

<TabItem value="json" label="JSON">

```json title="Content schema with Typesense destination"
{
  "triggers": {
        "cms": ["content"]
    },
  "destinations": [
    {
      "alias": "typesense",
      "options": {
          "id": "{originId}",
          "collection": "content",
          "dirtyValues": "coerce_or_reject"
      }
    }
  ],
  "properties": {
    "url": "{url}",
    "title": "{p.title}",
    "content": "{p.text}"
  }
}
```

</TabItem>
</Tabs>
}
</BrowserOnly>