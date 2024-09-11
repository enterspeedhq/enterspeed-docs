---
sidebar_position: 4
---

# Properties

The `properties` method is where you define the output that goes into the view you fetch from the [Delivery API](/api#tag/Delivery)

```js title="Properties example"
properties: function (sourceEntity, context) {
  return {
    title: sourceEntity.properties.title,
    seo: {
      title: sourceEntity.properties.seoTitle,
      description: sourceEntity.properties.seoDescription,
    }
    categoryIds: sourceEntity.properties.categoryIds
                                .map(categoryId => parseInt(categoryId))
  };
}
```

The properties method must return an object with the data you want to include in your view.

# PropertiesContext object

The `PropertiesContext` object is passed into the `properties` method and gives you access to a set of methods described below.

## Methods

| Method                             | Description                                                                                                                   |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| [lookup](#lookup)                  | Lookup allows you to search source entities using a filter string and work with the source entities directly in the schema.   |
| [partial](#partial)                | Referencing a partial schema. Mapped data from a partial schema is embedded into the calling schema.                          |
| [reference](#reference)            | Referencing a full schema. References to other schemas are resolved on delivery request time.                                 |

### lookup

Lookup source entities.

Lookup allows you to search source entities using a filter string and work with the data from the source entities directly in the schema.

Note the `lookup` is an async function so you have to use [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) when you are using the `lookup` function.

`lookup(filter)`

:::note
The `lookup` function is limited to a maximum number of items to return, based on the tenant plan. It can however be increased per tenant basis. Please reach out to Enterspeed if needed.

The default limits are:

- Free & Premium plans: 100 items  
- Enterprise plan: 500 items
:::

#### Parameters

| Parameter       | Type   | Description                                                  |
| --------------- | ------ | ------------------------------------------------------------ |
| `filter`        | string | A filtering criteria.                              |

See list of filter examples [here](/reference/filter-expressions.md)

#### Required function calls

After the `lookup` function it's required to call `toPromise` to excecute the query and return a [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

<details>
<summary>toPromise</summary>

Using the toPromise function excecutes the query and return a promise you must resolve.

```js title="look toPromise"
const newsArticles: await context
                .lookup("type eq 'newsArticle'")
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
const newsArticles: await context
                .lookup("type eq 'newsArticle'")
                .limit(5)
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
const newsArticles: await context
                .lookup("type eq 'newsArticle'")
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
const newsArticles: await context
                .lookup("type eq 'newsArticle'")
                .sourceGroup("anotherSourceGroup")
                .toPromise()
```

</details>

#### Examples

```js title="lookup with async/await"
properties: async function (sourceEntity, context) {
  const latestNews = await context
                          .lookup("type eq 'newsArticle'")
                          .orderBy({ propertyName: "properties.createdDate", direction: "desc"})
                          .limit(3)
                          .toPromise();

  const mappedNews = latestNews
                  .map((news) => ({
                      url: news.url,
                      title: news.properties.title,
                      teaser: news.properties.teaser
                  }));

  return {
    latestNews: mappedNews
  }
}
```

---

### partial

Referencing a partial schema.

The partial mapping property type allows for dynamically including partial schemas into the main schema. This is useful when you need to iterate an array of different objects that has an identifier, like an ID, alias or similar.

:::tip
Partial schemas are typically used when you want a reusable schema for mapping data that is part of the same entity. E.g. if metadata (title, description, etc.) is the same across different entity types, but the data lives on the entity itself.

Read more about partial schemas [here](/key-concepts/partial-schemas.md)
:::

`partial(schemaAlias, input)`

#### Parameters

| Parameter       | Type   | Description                                                  |
| --------------- | ------ | ------------------------------------------------------------ |
| `schemaAlias`   | string | The alias of a partial schema.                               |
| `input`         | object | You can pass whatever data you need for your partial schema. |

#### Examples

```js title="partial"
contentBlocks: sourceEntity.properties.contentBlocks.map((contentBlock) =>
    context.partial(`block-${contentBlock.contentType}`, contentBlock)
  )
```

```js title="passing extra properties to the partial schema"
contentBlocks: sourceEntity.properties.contentBlocks.map((contentBlock) =>
    context.partial(`block-${contentBlock.contentType}`, {
        block: contentBlock,
        pageOriginId: sourceEntity.originId
      })
  )
```

The `input` defines what goes into the partial schema and can be any custom object, and the `schemaAlias` is used to resolve what partial schema to use. So, in this case, we could have a partial schema with an alias: block-headline.

---

### reference

The `reference` are used to reference other views created from either this source entity or another source entity.

When referenced, Enterspeed will resolve the view when requested by the Delivery API so that the data will stay up-to-date if a reference view is updated.

The `reference` function is the starting point where you can use our fluent API to configure the reference(s) you want (by filter, by originId, take only top 5, and so on).

:::tip
Reference schemas are typically used when you are mapping data from another entity. E.g. a page has a reference to another page entity or media entity.

Read more about reference schemas [here](/key-concepts/referencing-schemas.md)
:::

`reference(schemaAlias)`

#### Parameters

| Parameter     | Type   | Description                                        |
| ------------- | ------ | -------------------------------------------------- |
| `schemaAlias` | string | The alias of a schema.                             |

#### Required function calls

After the `reference` function it's required to call one of the following functions to define what source entities you want references to.

<details>
<summary>byOriginId</summary>

Using the byOriginId function lets you create a reference to a source entity by its oringinId.

#### Parameters

| Parameter     | Type   | Description                                        |
| ------------- | ------ | -------------------------------------------------- |
| `originId`    | string | The original id from the source system.                           |

```js title="reference by byOriginId"
contentTeaser: context
                .reference("contentTeaser")
                .byOriginId(sourceEntity.properties.link.id)
```

</details>

<details>
<summary>byOriginIds</summary>

Using the byOriginIds function lets you create a references to a list of source entity by their oringinId.

#### Parameters

| Parameter     | Type     | Description                                        |
| ------------- | -------- | -------------------------------------------------- |
| `originIds`   | string[] | A list of original ids from the source system.                           |

```js title="reference by byOriginIds"
contentTeaser: context
                .reference("contentTeaser")
                .byOriginIds(sourceEntity.properties.links.map(link => link.id))
```

</details>

<details>
<summary>children</summary>

The children function creates a reference to all the children of the current source entity. It's basicly a shortcut for `.filter("originParentId eq '{sourceEntity.properties.originId}'")`.

```js title="reference by children"
childPages: context.reference("page").children()
```

```js title="reference by children and type"
childPages: context.reference("page").children("type eq 'subpage'")
```

:::note
The `children` function is limited to a maximum number of items to return, based on the tenant plan. It can however be increased per tenant basis. Please reach out to Enterspeed if needed.

The default limits are:

- Free & Premium plans: 100 items  
- Enterprise plan: 500 items
:::

</details>

<details>
<summary>filter</summary>

Using the filter function lets you do a dynamic search for source entities you want to make references to.

#### Parameters

| Parameter     | Type   | Description                                        |
| ------------- | ------ | -------------------------------------------------- |
| `filter`      | string | A filtering criteria.                              |

See list of filter examples [here](/reference/filter-expressions.md)

```js title="reference by filter"
newsTeasers: context
              .reference("newsTeaser")
              .filter("type eq 'newsArticle'")
```

:::note
The `filter` function is limited to a maximum number of items to return, based on the tenant plan. It can however be increased per tenant basis. Please reach out to Enterspeed if needed.

The default limits are:

- Free & Premium plans: 100 items  
- Enterprise plan: 500 items
:::

</details>

<details>
<summary>parent</summary>

The parent function creates a reference to the parent of the current source entity. It's basicly a shortcut for `.filter("originId eq '{sourceEntity.properties.originParentId}'")`.

```js title="reference by parent"
parentPage: context
              .reference("page")
              .parent()
```

</details>

<details>
<summary>self</summary>

The self method creates a reference to a view created by the specified schema on the current source entity. The helper method is equivalent to calling `.byOriginId(sourceEntity.originId)`.

```js title="reference by self"
selfPage: context
              .reference("page")
              .self()
```

</details>

#### Optional function calls

To filter the source entities you are making references to even further you can call some of the following optional functions.

<details>
<summary>limit</summary>

The `limit` function limits the number of references.

#### Parameters

| Parameter     | Type   | Description                                        |
| ------------- | ------ | -------------------------------------------------- |
| `limit`       | number | The maximum number of references to return.        |

```js title="reference by filter and limit"
topFiveNewsTeasers: context
                      .reference("newsTeaser")
                      .filter("type eq 'newsArticle'")
                      .limit(5)
```

</details>

<details>
<summary>orderBy</summary>

The order sequence of references.

#### Parameters

| Parameter     | Type   | Description                                        |
| ------------- | ------ | -------------------------------------------------- |
| `orderBy`      | \{ propertyName: string, direction: "asc" \| "desc" } | Allows you to specify your desired sorting order.        |

```js title="reference by filter and orderBy"
newsArticles: context
                .reference("newsArticle")
                .filter("type eq 'newsArticle'")
                .orderBy({ propertyName: "properties.createdDate", direction: "desc"})
```

</details>

<details>
<summary>sourceGroup</summary>

The `sourceGroup` function lets you specify the source group. By default the source group of the current source entity is used.

#### Parameters

| Parameter     | Type   | Description                                        |
| ------------- | ------ | -------------------------------------------------- |
| `sourceGroup` | string | Allows you to define a different source group. The sourceGroupAlias should be equal to the desired source group alias where you want to look for source entities.

If not defined, it uses the current source group.

```js title="reference by filter and sourceGroup"
newsTeasers: context
              .reference("newsTeaser")
              .filter("type eq 'newsArticle'")
              .sourceGroup("anotherSourceGroup")
```

</details>

<details>
<summary>first</summary>

The `first` function return the first item in the result set. The item i returned as an object instead of an array with one item.

The function must always be called as the last function.

#### Parameters

| Parameter     | Type   | Description                                        |
| ------------- | ------ | -------------------------------------------------- |
| `sourceGroup` | string | Allows you to define a different source group. The sourceGroupAlias should be equal to the desired source group alias where you want to look for source entities.

```js title="reference to only the first news teaser"
newsTeaser: context
              .reference("newsTeaser")
              .filter("type eq 'newsArticle'")
              .orderBy({ propertyName: "properties.createdDate", direction: "desc"})
              .first()
```

</details>

#### Examples

```js title="Property type: reference (static value) with originId"
seoData: context.reference("seo").byOriginId(sourceEntity.originId)
```

```js title="reference by filter and sourceGroup"
products: context
            .reference("product")
            .filter("type eq 'product'")
            .orderBy({ propertyName: name, direction: "asc"})
            .limit(10)
            .sourceGroup("commerce")
```

The `schemaAlias` can either be a static value, like "seo", or it can be a dynamic value being resolved from the Source Entity that is being processed by Enterspeed. This allows for supporting almost any use case.

#### Reference response

The response of references differs in V1 and V2+ of the delivery API. V1 return the id, type and wraps the properties from the referenced view in a `view` property. The response of references in V2+ is much cleaner and only returns the actual properties from the referenced schema. If a reference is not found in V2+, the reference information is added in the `missingViewReference` property in the `meta` object for debugging purpose.

```json title="Delivery API V1 uses a nested view property"
{
  // This example shows a response of a view with two schema references.
  // image1 is referencing a found view with a url and name property
  // and image2 is referencing a view that doesn't exist.

  "meta": {
    "missingViewReferences": []
  },
  "route": {
    "image1": {
      "id": "gid://Environment/8ef2bdc0-c352-4190-a344-c51d1f5e72ea/Source/dc5d9518-b96a-428a-a9b3-31fb601376c2/Entity/1234/View/image",
      "view": {
        "url": "https://test.com/how-to-write-a-good-blog-post.png",
        "name": "How To Write A Good Blog Post"
      },
      "type": "ViewReference"
    },
    "image2": {
      "id": "gid://Environment/8ef2bdc0-c352-4190-a344-c51d1f5e72ea/Source/dc5d9518-b96a-428a-a9b3-31fb601376c2/Entity/1235/View/image",
      "view": null,
      "type": "ViewReference"
    }
  }
}
```

```json title="Delivery API V2+ only returns the actual view properties"
{
  // This example shows a response of a view with two schema references.
  // image1 is referencing a found view with a url and name property
  // and image2 is referencing a view that doesn't exist.

  "meta": {
    "missingViewReferences": [
      {
        "path": "image2",
        "viewId": "gid://Environment/8ef2bdc0-c352-4190-a344-c51d1f5e72ea/Source/dc5d9518-b96a-428a-a9b3-31fb601376c2/Entity/1235/View/image"
      }
    ]
  },
  "route": {
    "image1": {
      "url": "https://test.com/how-to-write-a-good-blog-post.png",
      "name": "How To Write A Good Blog Post"
    },
    "image2": null
  }
}
```
