---
sidebar_position: 3
title: Algolia
---

# Algolia

:::info
Algolia is still in preview, contact us if would like to try it out.
:::

The Enterspeed Algolia integration uses the [destinations field](../reference/fields.md) to send data from views directly to a configured Algolia index. This means that you can decide on the schema level which views you want to send to Algolia.

You will only have to set the destination field on the entity schema you want to send to Algolia. All schema references are automatically resolved so you don't have to set it on all referenced schemas.

It's possible to configure multiple Algolia destinations if you need to push different types of data to different Algolia indexes.

## Configuration

In order to setup the Algolia configuration you need the following:

| Setting                               | Description                            |
| ------------------------------------- | -------------------------------------- |
| Algolia Index Name                    | The name of the Algolia index you want to integrate to |
| Algolia Application ID                | The unique application identifier used to identify you when working with Algolia's API |
| Algolia API Key                       | The API key needs `addObject` and `deleteObject` rights for the index you want to integrate to |
| Enterspeed Environment Client API Key | The API key for an Enterspeed Environment client. This is used to fetch the view that will be inserted into Algolia |

## Algolia specific properties

### objectId

The `objectID` property is the key for the entries in Algolia.

By default we use the Enterspeed view id as value for the `objectID`. 

If you want to use another value like e.g. the `originId` or any custom expression, you can just add a `objectID` property on root level in your Enterspeed schema, and we will use that value as `objectID` instead of the Enterspeed view id.

```json
{
  "destinations": [
    {
      "alias": "algolia"
    }
  ],
  "properties": {
    "objectID": "{originId}",
    ...
  }
}
```

### _geoloc

`_geoloc` is a special property in Algolia used for doing geo-searching. [See Algolia documentation](https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/)

As stated in the Algolia documentation, the `lat` and `lng` properties must be numeric values. This means that you will need to make sure that your Enterspeed schema is mapping these properties as numeric values and not as strings.


```json
{
  "destinations": [
    {
      "alias": "algolia"
    }
  ],
  "properties": {
    "_geoloc": {
      "type": "object",
      "properties": {
        "lat": {
          "type": "number",
          "value": "40.639751",
          "precision": 6
        },
        "lng": {
          "type": "number",
          "value": "-73.778925",
          "precision": 6
        }
      }
    }
  }
}
```