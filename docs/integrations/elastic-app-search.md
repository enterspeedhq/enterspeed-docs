---
sidebar_position: 4
title: Elastic App Search
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BrowserOnly from '@docusaurus/BrowserOnly';

# Elastic App Search

:::info
Elastic App Search is still in preview, contact us if would like to try it out.
:::

The Enterspeed Elastic App Search integration uses the [destinations field](../reference/fields.md) to send data from views directly to a configured Elastic App Search engine. This means that you can decide on the schema level which views you want to send to Elastic App Search.

You will only have to set the destination field on the entity schema you want to send to Elastic App Search.
It's possible to configure multiple Elastic App Search destinations if you need to push different types of data to different Elastic App Search engines.

## Configuration

In order to setup the Elastic App Search configuration you need the following:

| Setting                               | Description                            |
| ------------------------------------- | -------------------------------------- |
| Engine API Endpoint                   | The endpoint of Elastic App Search engine you want to integrate to |
| Private API Key                       | The Private API key used for calling Engine API endpoint |
| Enterspeed Environment Client API Key | The API key for an Enterspeed Environment client. This is used to fetch the view that will be inserted into Enterspeed Elastic App |

## Elastic App Search specific properties

Useful resources about document limitations and other requirements:
- https://www.elastic.co/guide/en/app-search/current/api-reference.html
- https://www.elastic.co/guide/en/app-search/current/documents.html#documents-create

### id
By default we use the Enterspeed view id as value for the `id`, but you have an option to specify desired document id to use.

## Example of usage

<BrowserOnly>
{() =>
<Tabs>
<TabItem value="json" label="JSON" default>

```json title="Schema with elastic app search destination"
{
	"triggers": {
		"geodata": [
			"city"
		]
	},
	"destinations": [
		{
			"alias": "elastic-app-search",
			"options": {
				"documentId": "city-{originId}"
			}
		}
	],
	"properties": {
		"url": "{url}",
		"name": "{p.city}",
		"country": "{p.country}",
		"photo": "{p.photo}",
		"location": "{p.lat},{p.lng}",
		"population": {
		  "type": "number",
		  "value": "{p.population}"
		}
	}
}
```

</TabItem>

<TabItem value="js" label="JavaScript">

```js title="Schema with elastic app search destination"
/** @type {Enterspeed.FullSchema} */
export default {
  triggers: function(context) {
    context.triggers('geodata', ['city']);
  },
  actions: function (sourceEntity, context) {
    context.destination('elastic-app-search', {
		documentId: `city-${sourceEntity.originId}`
	});
  },
  properties: function ({url, properties: p}, context) {
    return {
      url: url,
      name: p.city,
      country: p.country,
      population: parseInt(p.population),
      location: `${p.lat},${p.lng}`,
      photo: p.photo,
    }
  }
}
```

</TabItem>
</Tabs>
}
</BrowserOnly>