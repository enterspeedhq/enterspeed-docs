---
sidebar_position: 7
title: Shopify
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Shopify

The Enterspeed Shopify integration uses the [destinations field](../reference/fields.md#destinations) to send data from views directly to a configured Shopify shop. This means that you can decide on schema level which views you want to send to Shopify.

You will only have to set the destination field on the entity schema you want to send to Shopify. All schema references are automatically resolved so you don't have to set it on all referenced schemas.

It's possible to configure multiple Shopify destinations if you need to push data to different Shopify shop.

The jobs are executed in bulk requests to avoid hitting API rate limits in Shopify. This means a new bulk job of up to 1.000 jobs is started every minute unless another bulk job on the same shop connection is still active. If another bulk job is active for the integration will wait another minute and try again.

## Requirements

It's required to have a meta field called `custom.customId` of type `ID` on the object types the destination is used for. This field is used as an identifier when updating or deleting objects in Shopify through the destination.

![Umbraco Content Structure](/img/docs/integrations/shopify/meta-field-custom-id.png)

## Configuration

In order to setup the Shopify configuration you need the following:

| Setting                               | Description                            |
| ------------------------------------- | -------------------------------------- |
| Shopify store name                    | The unique store name in front of .myshopify.com. E.g. [my store name].myshopify.com |
| Shopify access token                  | An admin API access token with the following permissions: `write_product_listings`, `read_product_listings`, `write_products`, `read_products` |
| Enterspeed Environment Client API Key | The API key for an Enterspeed Environment client. This is used to fetch the view that will be inserted into Shopify |

## Options

Table of available options, that you can optionally specify, if needed for your use case.

| Setting                               | Description                            |
| ------------------------------------- | -------------------------------------- |
| customId                              | By default Enterspeed uses view id as the value for customId in Shopify. You can override default id by providing value for this option, e.g. to use a SKU number. |
| shopifyEntityType                     | The type of entity you want to send to Shopify. Supported values: `product`. |
| statusForNewProducts                  | The default status for newly created products. Supported values: `Active`, `Draft`. |
| statusForDeletedProducts              | When products are deleted in Enterspeed when should then happen with the product in Shopify. Supported values: `Delete`, `Archived`, `Draft`. |
| setOnlyHandleForNewProducts           | If the value is `true` the handle value will not be updated when the product is updated, it will on ly be set when the product is created the first time. Default value is `false`. Supported values: `true`, `false`. |

## IntelliSense

In order to send data to Shopify the structure of the object you are mapping in the `properties` function must match with the corresponding Shopify model.

To help you bulding the right model, Enterspeed can provide you with IntelliSense. Simply just change the type in the top of the schema from `/** @type {Enterspeed.FullSchema} */` to one of the following:

- `/** @type {Enterspeed.Destinations.Shopify.Schemas.Product} */`

## Example of usage

<Tabs>
<TabItem value="js" label="JavaScript" default>

```js title="Product schema with Shopify destination"
/** @type {Enterspeed.Destinations.Shopify.Schemas.Product} */
export default {
  triggers: function(context) {
    context.triggers('pim', ['product']);
  },
  actions: function (sourceEntity, context) {
    context.destination('shopify').options({
      customId: sourceEntity.originId,
      shopifyEntityType: 'product'
    });
  },
  properties: function ({properties: p}, context) {
    return {
      handle: `${p.name}-${p.itemNumber}`,
      title: p.name,
      seoTitle: p.name,
      type: 'electronic',
      tags: ['tag1', 'tag2'],
      templateSuffix: p.template
    }
  }
}
```

</TabItem>

<TabItem value="json" label="JSON">

```json title="Product schema with Shopify destination"
We recommend using JavaScript schemas when working with Shopify destination 
as it provides IntelliSense to map the complex models.
```

</TabItem>
</Tabs>

## What's supported

The integration curerntly only supports the following types: `product` (with variants, prices, translations and so on). The type needs to be defined in the `shopifyEntityType` property in the destination options.
