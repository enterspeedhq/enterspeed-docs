---
sidebar_position: 7
title: Relewise
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BrowserOnly from '@docusaurus/BrowserOnly';

# Relewise

:::info
The beta version of the Relewise destination is now available for testing.
:::

The Enterspeed Relewise integration uses the [destinations field](../reference/fields.md#destinations) to send data from views directly to a configured Relewise account. This means that you can decide on schema level which views you want to send to Relewise.

You will only have to set the destination field on the entity schema you want to send to Relewise. All schema references are automatically resolved so you don't have to set it on all referenced schemas.

It's possible to configure multiple Relewise destinations if you need to push different types of data to different Relewise accounts.

## Configuration

In order to setup the Relewise configuration you need the following:

| Setting                               | Description                            |
| ------------------------------------- | -------------------------------------- |
| Relewise Dataset Id                   | The unique Dataset Id for the Relewise account you want to integrate to |
| Relewise Server URL                   | The Server URL for the Relewise account you want to integrate to |
| Relewise API Key                      | A Relewise API key with update and administrative action permissions for the types you want to integrate (product, content, brand, ...) |
| Enterspeed Environment Client API Key | The API key for an Enterspeed Environment client. This is used to fetch the view that will be inserted into Relewise |

## IntelliSense

In order to send data to Relewise (products, content, ...) the structure of the object you are mapping in the `properties` function must match with the corresponding Relewise model. See [Relewise API in Swagger](https://docs.relewise.com/swagger/index.html).

To help you bulding the right model, Enterspeed can provide you with IntelliSense. Simply just change the type in the top of the schema from `/** @type {Enterspeed.FullSchema} */` to one of the following:

- `/** @type {Enterspeed.Destinations.Relewise.Schemas.Product} */`
- `/** @type {Enterspeed.Destinations.Relewise.Schemas.Content} */`
- `/** @type {Enterspeed.Destinations.Relewise.Schemas.Brand} */`
- `/** @type {Enterspeed.Destinations.Relewise.Schemas.ProductCategory} */`
- `/** @type {Enterspeed.Destinations.Relewise.Schemas.ContentCategory} */`




## Example of usage

<BrowserOnly>
{() =>
<Tabs>
<TabItem value="js" label="JavaScript" default>

```js title="Product schema with Relewise destination"
/** @type {Enterspeed.Destinations.Relewise.Schemas.Product} */
export default {
  triggers: function(context) {
    context.triggers('pim', ['product']);
  },
  actions: function (sourceEntity, context) {
    context.destination('relewise').options({
      id: sourceEntity.originId,
      relewiseEntityType: 'product'
    });
  },
  properties: function ({properties: p}, context) {
    return {
      product: {
        displayName: {
          values: [
            {
              language: { value: "en-gb" },
              text: p.productName
            }
          ]
        },
        salesPrice: {
          values: [
            {
              amount: p.salesPrice,
              currency: { value: "Euro" }
            }
          ]
        }
      },
      variants: context.reference('variantSchema').children()
    }
  }
}
```

</TabItem>

<TabItem value="json" label="JSON">

```json title="Product schema with Relewise destination"
We recommend using JavaScript schemas when working with Relewise destination 
as it provides IntelliSense to map the complex models.
```

</TabItem>
</Tabs>
}
</BrowserOnly>

<BrowserOnly>
{() =>
<Tabs>
<TabItem value="js" label="JavaScript" default>

```js title="Content schema with Relewise destination"
/** @type {Enterspeed.Destinations.Relewise.Schemas.Content} */
export default {
  triggers: function(context) {
    context.triggers('cms', ['contentPage']);
  },
  actions: function (sourceEntity, context) {
    context.destination('relewise').options({
      id: sourceEntity.originId,
      relewiseEntityType: 'content'
    });
  },
  properties: function ({properties: p}, context) {
    return {
      displayName: {
        values: [
          {
            language: { value: "en-gb" },
            text: p.title
          }
        ]
      },
      data: {
        contentData: {
          type: "String",
          value: p.text
        }
      }
    }
  }
}
```

</TabItem>

<TabItem value="json" label="JSON">

```json title="Content schema with Relewise destination"
We recommend using JavaScript schemas when working with Relewise destination 
as it provides IntelliSense to map the complex models.
```

</TabItem>
</Tabs>
}
</BrowserOnly>

## What's supported

The integration supports the following types: `product` (with variants), `productCategory`, `content`, `contentCategory` and `brand` and the type needs to be defined in the `relewiseEntityType` property in the destination options together with a value for the id you want in Relewise.

See more details on the Relewise documentation: https://docs.relewise.com/docs/developer/implementation-steps.html#_1-provide-entities

:::info
All updates are done with `UpdateKind.ClearAndReplace` and all administrative actions are done with `UpdateKind.Disable`
:::