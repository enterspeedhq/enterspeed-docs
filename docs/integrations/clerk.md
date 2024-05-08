---
sidebar_position: 4
title: Clerk.io
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BrowserOnly from '@docusaurus/BrowserOnly';

# Clerk.io

The Enterspeed Clerk.io integration uses the [destinations field](../reference/fields.md#destinations) to send data from views directly to a configured Clerk.io store. This means that you can decide on the schema level which views you want to send to Clerk.io.

You will only have to set the destination field on the entity schema you want to send to Clerk.io. All schema references are automatically resolved so you don't have to set it on all referenced schemas.

It's possible to configure multiple Clerk.io destinations if you need to push different types of data to different Clerk.io stores.

:::info
As of now the Clerk.io integration only support pages. Contact us if you want to work with other types in Clerk.io.
:::

## Configuration

In order to setup the Clerk.io configuration you need the following:

| Setting                               | Description                            |
| ------------------------------------- | -------------------------------------- |
| Clerk Public Key                      | The unique public key of the Clerk.io store you want to integrate to |
| Clerk Private Key                     | A private key on the Clerk.io store you want to integrate to |
| Enterspeed Environment Client API Key | The API key for an Enterspeed Environment client. This is used to fetch the view that will be inserted into Clerk.io |

## Options

Table of available options, that you can optionally specify, if needed for your use case.

| Setting                               | Description                            |
| ------------------------------------- | -------------------------------------- |
| id                                    | By default Enterspeed uses view id as the value for object id in Clerk. You can override default object id by providing value for this option. |
| clerkEntityType                       | The type of entity you want to send to Clerk. Supported values: `page`. |

## Example of usage

<BrowserOnly>
{() =>
<Tabs>
<TabItem value="js" label="JavaScript" default>

```js title="Schema with Clerk destination"
/** @type {Enterspeed.FullSchema} */
export default {
  triggers: function(context) {
    context.triggers('cms', ['page']);
  },
  actions: function (sourceEntity, context) {
    context.destination('clerk').options({
      id: sourceEntity.originId,
      relewiseEntityType: 'page'
    });
  },
  properties: function ({url, properties: p}, context) {
    return {
      url: url,
      title: p.title,
      text: p.text
    }
  }
}
```

</TabItem>

<TabItem value="json" label="JSON">

```json title="Schema with Clerk destination"
{
  "triggers": {
        "cms": ["page"]
    },
  "destinations": [
    {
      "alias": "clerk",
      "options": {
          "id": "{originId}",
          "relewiseEntityType": "page"
      }
    }
  ],
  "properties": {
    "url": "{url}",
    "title": "{p.title}",
    "text": "{p.text}"
  }
}
```

</TabItem>
</Tabs>
}
</BrowserOnly>

## Clerk.io specific properties

Each type in Clerk.io (page, product, category, ...) has a set of required field which must be mapped in the Enterspeed schema.

See required fields here: https://docs.clerk.io/reference/page-resource

:::info
`id` is set automatically or by the options id if you use that, so you don't need to map this property.
:::