---
sidebar_position: 4
---

# Routes

The `routes` method is where you define how you fetch the generated view from the [Delivery API](/api#tag/Delivery)

If your view should be routable you must implement the `routes` method and call context methods to build routes.

```js title="Routes example"
routes: function(sourceEntity, context) {
    context.url(sourceEntity.url);
    context.handle('origin-' + sourceEntity.originId);
}
```

# RoutesContext object

The `RoutesContext` object is passed into the `routes` method and gives you access to a set of methods which is described below.

## Methods

| Method            | Description                                                                                                                       |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| [handle](#handle) | A handle is a key from which you can fetch the view. A view can have multiple handles.                                            |
| [lookup](#lookup) | Lookup allows you to search source entities using a filter string and work with the source entities directly in the schema.       |
| [url](#url)       | A string value that represents the url you want to fetch the view by. A view can only have one url.                               |

### handle

Handle allows you to specify a key from which you can fetch the view from the Delivery API.

`handle(handle)`

#### Parameters

| Parameter    | Type    |  Description  |
| ------------ | ------- | --------------------------------------------------------------------------- |
| `handle`     | string  | The key you use to fetch the view from the Delivery API                     |

### lookup

Lookup allows you to search source entities using a filter string and build dynamic handles or URLS based on data from other source entities.

Note the `lookup` is an async function so you have to use [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) or [`then`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) when you are using the `lookup` function.

`lookup(filter)`

#### Parameters

| Parameter       | Type   | Description                                                  |
| --------------- | ------ | ------------------------------------------------------------ |
| `filter`        | string | A filtering criteria.                              |

See list of filter examples [here](//docs/reference/filter-expressions.md)

#### Required function calls

After the `lookup` function it's required to call `toPromise` to excecute the query and return a [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

<details>
<summary>toPromise</summary>

Using the toPromise function excecutes the query and return a promise you must resolve.

```js title="look toPromise"
const category: await context
                .lookup(`originId eq '${sourceEntity.properties.categoryId}'`)
                .toPromise()
```

</details>

#### Optional function calls

To filter the source entities even further you can call some of the following optional functions.

<details>
<summary>limit</summary>

The `limit` function limits the number of source entities.

#### Parameters

| Parameter     | Type   | Description                                        |
| ------------- | ------ | -------------------------------------------------- |
| `limit`       | number | The maximum number of source entities to return.   |

```js title="look and limit"
const mainCategory: await context
                .lookup(`type eq 'mainCategory'`)
                .limit(1)
                .toPromise()
```

</details>

<details>
<summary>orderBy</summary>

The order sequence of the source entities.

#### Parameters

| Parameter     | Type   | Description                                        |
| ------------- | ------ | -------------------------------------------------- |
| `orderBy`      | \{ propertyName: string, direction: "asc" \| "desc" } | Allows you to specify your desired sorting order.        |

```js title="lookup and orderBy"
const categories: await context
                .lookup(`type eq 'category'`)
                .orderBy({ propertyName: "properties.createdDate", direction: "desc"})
                .toPromise()
```

</details>

<details>
<summary>sourceGroup</summary>

The sourceGroup function lets you specify the source group. By default the source group of the current source entity is used.

#### Parameters

| Parameter     | Type   | Description                                        |
| ------------- | ------ | -------------------------------------------------- |
| `sourceGroup` | string | Allows you to define a different source group. The sourceGroupAlias should be equal to the desired source group alias where you want to look for source entities.

If not defined, it uses the current source group.

```js title="lookup and sourceGroup"
const categories: await context
                .lookup(`type eq 'category'`)
                .sourceGroup("anotherSourceGroup")
                .toPromise()
```

</details>

#### Examples

```js title="lookup using async/await"
routes: async function(sourceEntity, context) {
    const categories = await context.lookup(`originId in (${sourceEntity.properties.categoryIds.map(c => `'${c}'`)})`).toPromise();

    categories.forEach((category) => {
        context.url(`${category.url}/${sourceEntity.properties.slug}`)
    })
}
```

```js title="lookup using 'then'"
routes: function(sourceEntity, context) {
    context.lookup(`originId in (${sourceEntity.properties.categoryIds.map(c => `'${c}'`)})`)
            .toPromise()
            .then((categories) => {
                categories.forEach((category) => {
                    context.url(`${category.url}/${sourceEntity.properties.slug}`)
                })
            });
}
```

### url

url allows you to specify a url from which you can fetch the view from the delivery.

`url(url)`

#### Parameters

| Parameter    | Type    |  Description  |
| ------------ | ------- | --------------------------------------------------------------------------- |
| `url`        | string  | The url you use to fetch the view from the Delivery API                     |


##### Optional function calls

To the `url` function you can call some of the following optional functions.

<details>
<summary>redirects</summary>

The `redirects` function creates incomming redirects to a specific url.

:::info
Setting the redirects to an empty array clears any potential implicit redirects.
:::

#### Parameters

| Parameter     | Type   | Description                                        |
| ------------- | ------ | -------------------------------------------------- |
| `redirects`   | string[] | Adds a list of incomming redirects to the URL.   |

```js title="routes with url and redirects"
context
    .url(sourceEntity.url)
    .redirects(sourceEntity.redirects);
```

</details>

## Examples

```js title="routes example with url and multiple handles"
routes: function(sourceEntity, context) {
    context.url(sourceEntity.url);
    context.handle('origin-' + sourceEntity.originId);
    context.handle(sourceEntity.properties.entityKey);
}
```

```js title="routes example with single url"
routes: function(sourceEntity, context) {
    context.url(sourceEntity.url);
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