---
sidebar_position: 1
sidebar_label: Overview
---

# Overview
To understand the concept of Enterspeed, you would have to look at it as a 3 step process. 
1. Ingest data
2. Transform data
3. Delivering data

## Ingesting data
To get started ingesting data we need to do a few things first. 
### Environment settings
The first thing to do is ensure that we have an environment available.
Enterspeed will automatically create two environments for you. You can view them under Environment settings in the [settings section](https://app.enterspeed.com/settings/environment-settings)

You can create new environments, edit the name of your environments or delete them. Beware of deleting environments, since this is an irreversible action that will remove all data attached to the environment.

### Data source settings
Then we also need to prepare Enterspeed, so your tenant can receive data. This is done by creating a data source. Data sources are where a connection is created to your CMS, PIM-system, or perhaps a development instance of your CMS.

Go to [data sources](https://app.enterspeed.com/settings/data-sources) and create a data source group. (e.g. Demo CMS), and your data sources. 

You should now have an API key available for you. Data source API keys is a unique key used for both authentication when pushing data and also as an id for the data source that you will be pushing source entities to. 

Read more about data sources and how to manage them [here](/key-concepts/overview).

### Preparing your system
You will need a way to ingest data into Enterspeed from your source system. 
We currently have multiple options to get started with pushing source entities to Enterspeed. 

1. Through our API. Find the [API documentation here](../api#tag/Ingest).
2. Premade [connectors](https://docs.enterspeed.com/integrations) so you can get started immediately.
3. Our .NET SDK. https://github.com/enterspeedhq/enterspeed-sdk-dotnet

```json title="Example of data sent to the ingest API"
{
  "type": "string",
  "url": "https://enterspeed.com/product-enterspeed-tshirt-old-xs/",
  "originParentId": "123",
  "redirects": [
    "https://enterspeed.com/product-enterspeed-tshirt-old/"
  ],
  "properties": {
    "name": "Official Enterspeed T-shirt",
    "price": 199.99,
    "inStock": true,
    "features": [
      {
        "name": "color",
        "value": "blue"
      },
      {
        "name": "size",
        "value": "M"
      }
    ],
    "information": {
      "short": "Nice t-shirt",
      "long": "Nice t-shirt in cotton"
    }
  }
}
```

### Source Entities
When the above steps have been applied successfully you are ready to push data to Enterspeed. 
Data in Enterspeed is called Source Entities. Source Entities conform to a specific format. The important thing to know about source entities is that these are not representing the final output of your Enterspeed routes, but should be seen as the data that is available for you to work with and [transform](#transforming-data) to your needs through your schemas.

```json title="Source entity example"
{
  "id": "1044-en-us",
  "type": "frontPage",
  "url": "/frontPage",
  "properties": {
    "title": "Welcome",
    "description": "description value"
  }
}
```

## Transforming data
### Schemas 
The data now exists as source entities in Enterspeed and can be formed and modeled easily with data mapping in Enterspeed schemas. 
Read more about [schemas](/docs/key-concepts/schemas.md).
```json title="Schema"
{
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

### Routing 
Routing is set up in Schemas and is a part of setting up schemas and API's. We currently offer 2 ways of setting up routing. 
- [Url routing](/docs/key-concepts/schemas.md)
- [Handles](/docs/key-concepts/schemas.md)

### Partial Schemas
Partial schemas are a bit different from the typical schema.
A partial schema is a reusable schema that is used across multiple schemas. A typical use case is when you want a specific data structure and type of data across many schemas. 
You can read more about partials [here](/docs/key-concepts/partial-schemas.md) and how it is used.

### Actions
Actions are used when a new view has been generated from a schema. It defines which specific actions to take following the newly generated view. 
Currently, Enterspeed supports triggering the `process` of another schema.

Imagine the following.
You have a _product_ and _category_ source entity type.
When you ingest a _product_, the list of products should be updated in the generated category view and include the changes. This is a typical use-case scenario for actions.

Read more about [Actions](/docs/reference/fields.md#actions)

### References
Referencing another schema.

The [Reference](/reference/property-types#reference) property type is a bit different than the [Partial](/reference/property-types#partial) property type.
The [Reference](/reference/property-types#reference) property allows referencing other views created from either this Source Entity or from another source entity and the Partial property can only use data from this Source Entity. 

A benefit of a reference field is that the referenced view is resolved when requested by the Delivery API. There is no need the update the requested view if a referenced view has been updated.

Read more about the Reference property [here](/docs/key-concepts/referencing-schemas.md) with a more in-depth explanation and examples.

### Views
A view should be considered as the output. Data is mapped in a Schema from source entities. When a source entity is created, updated or deleted, all schemas that are set up for the type of this source entity will create, update or delete the view accordingly.
In short, the view is the response when calling the Delivery API.

## Delivering data
Your data has now been ingested as source entities and transformed using schemas. 
An example of calling the delivery API can be found [here](/tutorials/umbraco-nextjs/fetching-data-in-nextjs). 
```js title="JavaScript example of calling the delivery API"
const call = async (query, preview) => {
  const url = `https://delivery.enterspeed.com/v1?${query}`;
  const response = await fetch(new Request(url), {
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": preview
        ? process.env.ENTERSPEED_PREVIEW_ENVIRONMENT_API_KEY
        : process.env.ENTERSPEED_PRODUCTION_ENVIRONMENT_API_KEY,
    },
  });

  return response.json();
};

export const getByHandle = async (handle, preview) => {
  const response = await call(`handle=${handle}`, preview);
  return response.views[handle];
};

export const getByUrl = async (url, preview) => {
  const response = await call(`url=${url}`, preview);
  return response.route;
};
```

### Environment clients
You need to set up an environment client. 
Navigate to Environment clients under Settings -> Environment settings and click the Create button. Give your environment client a name (e.g. My My Client Application) and select one of the environments that you have created. Afterward, click on the Create button.

A Delivery API key has now been created. Copy and save it for use in your client application. 

Next to your environment client, select edit domains. Select the Domain and press save changes. 

You should now be ready to call the Enterspeed Delivery API. Go to the [docs](https://docs.enterspeed.com/api#tag/Delivery) for requirements regarding this. We also have an example [here](/docs/tutorials/umbraco-nextjs/4-fetching-data-in-nextjs.md)

### Final notes
We would suggest going to the [tutorials section](/docs/tutorials/overview.md) for examples and some in-depth samples of getting started.