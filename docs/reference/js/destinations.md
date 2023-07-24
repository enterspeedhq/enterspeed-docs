---
sidebar_position: 6
---

# Destinations

:::info
JavaScript schemas are currently in preview. Contact us if you would like to try it out.
:::

The `destinations` method is used to push generated views for a schema to a webhook, to Algolia or another third-party application.

You can add multiple destinations to a schema.

```js title="Destinations example"
destinations: function(sourceEntity, context) {
    return [
        context.destination('webhooks'),
        context.destination('algolia')
    ]
}
```

# DestinationsContext object

The `DestinationsContext` object is passed into the `destinations` method and gives you access to a set of methods which is described below.

## Required Methods

| Method                      | Description                                                                 |
| ----------------------------| ----------------------------------------------------------------------------|
| [destination](#destination) | Specifies the destination where the generated view is pushed to.            |

### destination

Specifies the destination where the generated view is pushed to.

`destination(destination)`

#### Parameters

| Parameter      | Type    |  Description  |
| -------------- | ------- | --------------------------------------------------------------------------- |
| `destination`  | string  | The alias of the destination you want the generated view is pushed to.      |


## Examples

```js title="if you only have one destination you dont need to return it as an array"
destinations: function(sourceEntity, context) {
    return context.destination('webhook')
}
```

```js title="destinations can also be expressed as an arrow function expression to make it even more compact"
destinations: (sourceEntity, context) => context.destination('webhook')
```
