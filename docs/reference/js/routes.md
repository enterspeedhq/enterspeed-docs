---
sidebar_position: 4
---

# Routes

:::info
JavaScript schemas are currently in preview. Contact us if you would like to try it out.
:::

The `routes` method is where you define how you fetch the generated view from the [Delivery API](/api#tag/Delivery)

If your view should be routeable you must implement the `routes` method and return one or more routes.

```js title="Routes example"
routes: function(sourceEntity, context) {
    return [
        context.url(sourceEntity.url),
        context.handle('origin-' + sourceEntity.originId)
    ]
}
```

# RoutesContext object

The `RoutesContext` object is passed into the `routes` method and gives you access to a set of methods which is described below.

## Methods

| Method            | Description                                                                                                                       |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| [handle](#handle) | A handle is a key from which you can fetch the view. A view can have multiple handles. |
| [url](#url)       | A string value that represents the url you want to fetch the view by. A view can only have one url. |

### handle

Handle allows you to specify a key from which you can fetch the view from the Delivery API.

`handle(handle)`

#### Parameters

| Parameter    | Type    |  Description  |
| ------------ | ------- | --------------------------------------------------------------------------- |
| `handle`     | string  | The key you use to fetch the view from the Delivery API                     |

### url

url allows you to specify a url from which you can fetch the view from the delivery.

`url(url)`

#### Parameters

| Parameter    | Type    |  Description  |
| ------------ | ------- | --------------------------------------------------------------------------- |
| `url`        | string  | The url you use to fetch the view from the Delivery API                     |


## Examples

```js title="routes example with url and multiple handles"
routes: function(sourceEntity, context) {
    return [
        context.url(sourceEntity.url),
        context.handle('origin-' + sourceEntity.originId),
        context.handle(sourceEntity.properties.entityKey)
    ]
}
```

```js title="if you only have one route you dont need to return it as an array"
routes: function(sourceEntity, context) {
    return context.url(sourceEntity.url)
}
```

```js title="routes can also be expressed as an arrow function expression to make it even more compact"
routes: (sourceEntity, context) => context.url(sourceEntity.url)
```

You can then fetch the view using our [Delivery API](../../api#tag/Delivery/operation/getContent) using either the url or one of the handles.

You can also fetch multiple views in one request, although in this case it doesn't make sense to fetch the same view three time, but just to demonstrate if you want to fetch multiple different views in one request.

```
https://delivery.enterspeed.com/v2
                        ?url=/fairy-tales/the-emperors-new-clothes/
                        &handle=origin-1234
                        &handle=5678
```