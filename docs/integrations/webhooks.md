---
sidebar_position: 2
title: Webhooks
---

# Webhooks

:::info
Webhooks is still in preview, contact us if would like to try it out.
:::

Webhooks in Enterspeed are HTTP callbacks that will send all generated views by schemas with the [destinations field](../reference/fields.md#destinations) to a URL configured in the Webhook. This means that you can decide on the schema level which views you want to send to the webhook.

You will only have to set the destination field on the entity schema you want to send to the webhook. All schema references are automatically resolved so you don't have to set it on all referenced schemas.

It's possible to configure multiple Webhook destinations if you need to push different types of data to different URL endpoints.

## Configuration

In order to setup the Webhook configuration you need the following:

| Setting                               | Description                            |
| ------------------------------------- | -------------------------------------- |
| Name                                  | A name to identify the webhook |
| URL                                   | The url to call from the webhook |
| Access Key                            | An API key the client can use to identify that the call is in fact coming from Enterspeed |

## Request

The request to the client-configured URL will be made with the following configuration.

| Setting     | Value       | Description                            |
| ----------- | ----------- | -------------------------------------- |
| Retry count | 3           | How many times the webhook will try to send the request |
| Timeout     | 10          | The request timeout in seconds              |
| HTTP method | POST        | The requests is made as a POST |
| Headers     | `X-Api-Key`<br /><br />`X-Enterspeed-Webhook-Name`<br /><br />`X-Enterspeed-System`  | Two headers will be send with the request.<br /><br />X-Api-Key will hold a key so that the client can validate that the request is actually coming from Enterspeed<br /><br />X-Enterspeed-Webhook-Name will hold the name of the webhook<br /><br />X-Enterspeed-System will hold the version number of the webhook

### Payload

The request will send the following data. 

```json
{
  "id": "gid://Environment/2052b78d-6c34-4f11-bea5-296cf2d26968/Source/053b598b-c3d1-46fb-91e3-53115169cdb2/Entity/1234/View/product", // the Enterspeed view id
  "originId": "1234", // the origin id of the entity
  "type": "product", // the type of the entity
  "action": "Deploy", // can have the value of Deploy or Remove
  "Url": "https://weu.delivery.enterspeed.com/v2?id=gid://Environment/40bb2d76-3b71-4121-b9b6-238cf4f325c4/Source/9e78f134-cf84-4ec5-9180-0b72b94949be/Entity/1099-en-us/View/home" // the absolute url for the delivery api to fetch the view
}
```
