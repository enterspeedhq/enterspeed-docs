---
sidebar_position: 1
title: Fields
---

# Fields

## Schema fields

| Field               | Type   | Required? | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------- | ------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `triggers`          | Object | **Yes**   | The source groups you want this schema to trigger on. A source group should contain one or more source entity types (`array`). <br /><br />You can add as many source groups and source entity types as you wish.                                                                                                                                                                                                                                                                                                                                                   |
| `properties`        | Object | **Yes**   | The properties you want your schema to consist of. See [properties types](./property-types) for supported types.                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `route`             | Object | No        | Defines if you want this schema to be retrievable by a route. A route is not specifically an URL, but it can be. <br /><br /> The route property contains 2 different properties: `url` or `handles`.                                                                                                                                                                                                                                                                                                                                                               |
| `actions`           | Array  | No        | Actions is used when a new view has been generated from a schema. It defines which specific actions to take following the newly generated view. Currently, Enterspeed supports triggering the `process` of another schema.<br /> <br /> The Array takes an object with the properties: <br />`type` <small>(e.g. process)</small><br />`alias` <small>(Alias of the schema to process)</small><br />`originId` <small>(Optional. id of source to trigger)</small><br />`source` <small>(Optional. Alias of destination source group)</small><br />|
| `destinations`      | Array  | No        | Destinations is a preview feature.<br /> <br />Destinations is used to push the generated views for a schema to a webhook or other third-party application.<br /> <br /> The Array takes an object with the properties: <br />`alias` <small>(e.g. webhook)</small><br /> |
| `sourceEntityTypes` | Array  | -         | **DEPRECATED** <br /><br /> <strike>The types of source entities you want this schema to trigger on.</strike>                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

## Examples

### Route

#### Routing by URL

If you want your schema to be routable by an URL, you can specify the `url` as an expression. Like the example below:

```json
{
  "triggers": {
    "umbraco": ["frontPage"]
  },
  "route": {
    "url": "{url}"
  },
  "properties": {}
}
```

You are not limited to using the built-in `url` property, you can also use properties defined by your source entity:

```json
{
  "triggers": {
    "umbraco": ["frontPage"]
  },
  "route": {
    "url": "{p.customFrontPageUrl}"
  },
  "properties": {}
}
```

The URL must be a valid URL: either relative `/about-us` or absolute `https://enterspeed.com/about-us`.

:::info
If you use relative URL's you must add a wildcard hostname, see more in [Setting up domains](../getting-started/domains.md)
:::

#### Routing by handles

If you don't want your schema to be routable by an URL but rather something more static, you can use a handle.

The `handles` is an array, so you can specify multiple handles per schema.

```json
{
  "triggers": {
    "umbraco": ["frontPage"]
  },
  "route": {
    "handles": ["front-page"]
  },
  "properties": {}
}
```

The handle supports expressions as described for `url`:

```json
{
  "triggers": {
    "umbraco": ["frontPage"]
  },
  "route": {
    "handles": ["front-page-{p.culture}"]
  },
  "properties": {}
}
```

##### Handle response

The response of the handles differs in V1 and V2+ of the delivery API. The structure is the same but V1 uses the schema alias as key for each handle where as V2+ uses the handle name as key. This means that in V1 you can only request one handle per schema in order to not have a duplicate key, where as in V2+ you can request multiple handles from the same schema.

```json title="Delivery API V1 uses the schema alias as key"
{
  // This example shows a response of a handle generated by a schema called
  // front-page. Because of that the handle key is front-page as well

  "views": {
    // The handle key is the schema alias
    "front-page": {
      "headline": "My headline"
    }
  }
}
```

```json title="Delivery API V2+ uses the handle name as key"
{
  // This example shows a response of two handles generated by the same
  // schema called front-page. In V2+ the handle keys is the handle names

  "views": {
    // The handle key is the handle name
    "front-page-da-dk": {
      "headline": "My danish headline"
    },
    // The handle key is the handle name
    "front-page-en-gb": {
      "headline": "My english headline"
    }
  }
}
```

### Actions

To give an example, you can use `actions` when you want to update a list in a new view that you have generated from other schemas.

For example, having a _product_ and _category_ source entity type.
When you ingest a _product_, the list of products should be updated in the generated category view and include the changes.
Consider the following examples where the ingest of _product_ will both generate a new view for the product _and_ trigger the process of the category schema to generate a new category view including the updated product:

:::tip
If you want to trigger actions across schemas, you must specify the source. The value of `source` is the alias of the destination source group.
:::

```json title="Schema with origin id"
{
  // This example will process a category schema where the category
  // id == category id of the data source. Schema is
  // processed in the source group "umbraco".

  "triggers": {
    "umbraco": ["product"]
  },
  "actions": [
    {
      "type": "process",
      "alias": "category",
      "originId": "{p.categoryId}"
    }
  ],
  "properties": {
    "name": "{p.name}"
  }
}
```

```json title="Schema with source and without originId."
{
  // This example will process the category schema in the "myCustomSourceGroup" source group.
  // This is due to the source property.

  "triggers": {
    "umbraco": ["product"]
  },
  "actions": [
    {
      "type": "process",
      "source": "myCustomSourceGroup",
      "alias": "category"
    }
  ],
  "properties": {
    "name": "{p.name}"
  }
}
```

```json title="Schema without source and originId "
{
  // This example will process the category schema in the source group "umbraco".
  "triggers": {
    "umbraco": ["product"]
  },
  "actions": [
    {
      "type": "process",
      "alias": "category"
    }
  ],
  "properties": {
    "name": "{p.name}"
  }
}
```

The schema that we are processing in the above examples.

```json title="Schema alias category - "
{
  "triggers": {
    "umbraco": ["category"]
  },
  "route": {
    "url": "/categories/{p.slug}"
  },
  "properties": {
    "title": "{p.name}",
    "description": "{p.description}",
    "products": {
      "type": "array",
      "input": {
        "$lookup": {
          "filter": "type eq 'product' and properties.categoryId eq '{originId}'"
        }
      },
      "var": "product",
      "items": {
        "type": "object",
        "properties": {
          "headline": "{product.p.name}"
        }
      }
    }
  }
}
```

### Destinations

:::info
Webhooks is still in preview, contact us if would like to test it out.
:::

To give an example, you can use `destinations` when you want to send views for e.g. all content pages or all products to a third-party system for searching.

```json title="Schema with destinations"
{
  // This example will send all generated views by this schema to the webhook.

  "triggers": {
    "umbraco": ["product"]
  },
  "destinations": [
		{
			"alias": "webhook"
		}
	],
  "properties": {
    "name": "{p.name}"
  }
}
```