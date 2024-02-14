---
sidebar_position: 9
title: Azure Service Bus
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BrowserOnly from '@docusaurus/BrowserOnly';

# Azure Service Bus

:::info
We are currently working on a UI for Destinations. This means that you'll soon be able to setup a Azure Service Bus destination directly from the Enterspeed APP yourself. But note, the Azure Service Bus destination itself is fully ready for production.

For now, contact us if you want to get started.
:::

The Enterspeed Azure Service Bus integration uses the [destinations field](../reference/fields.md#destinations) to send data from views directly to a configured Azure Service Bus queue. This means that you can decide on schema level which views you want to send to the service bus queue.

You will only have to set the destination field on the entity schema you want to send to the Azure Service Bus queue. All schema references are automatically resolved so you don't have to set it on all referenced schemas.

It's possible to configure multiple Azure Service Bus destinations if you need to push different types of data to different service bus queues.

## Configuration

In order to setup the Azure Service Bus configuration you need the following:

| Setting                               | Description                            |
| ------------------------------------- | -------------------------------------- |
| ConnectionString                      | The connection string to the Azure Service Bus         |
| QueueName                             | The name of the queue in the Azure Service Bus       |

## Message

The message will send the following data. 

```json
{
  "id": "gid://Environment/2052b78d-6c34-4f11-bea5-296cf2d26968/Source/053b598b-c3d1-46fb-91e3-53115169cdb2/Entity/1234/View/product", // the Enterspeed view id
  "originId": "1234", // the origin id of the entity
  "type": "product", // the type of the entity
  "action": "Deploy", // can have the value of Deploy or Remove
  "url": "https://weu.delivery.enterspeed.com/v2?id=gid://Environment/40bb2d76-3b71-4121-b9b6-238cf4f325c4/Source/9e78f134-cf84-4ec5-9180-0b72b94949be/Entity/1099-en-us/View/home" // the absolute url for the delivery api to fetch the view
}
```

## Example of usage

<BrowserOnly>
{() =>
<Tabs>
<TabItem value="js" label="JavaScript" default>

```js title="Content schema with Azure Service Bus destination"
/** @type {Enterspeed.FullSchema} */
export default {
  triggers: function(context) {
    context.triggers('cms', ['content']);
  },
  actions: function (sourceEntity, context) {
    context.destination('serviceBus');
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

```json title="Content schema with Azure Service Bus destination"
{
  "triggers": {
        "cms": ["content"]
    },
  "destinations": [
    {
      "alias": "typesense"
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