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

### Environment settings
Enterspeed will automatically create two environments for you. You can view them under Environment settings in the [settings section](https://app.enterspeed.com/settings/environment-settings)

You can create new environments, edit the name of your environments or delete them. Beware of deleting environments, since this is an irreversible action that will remove all data attached to the environment.

### Data source settings
We need to prepare Enterspeed, so your tenant can receive data. This is done by creating a data source. Data sources are where a connection is created to your CMS, PIM-system, or perhaps a development instance of your CMS.

Go to [data sources](https://app.enterspeed.com/settings/data-sources) and create a data source group. (e.g. Demo CMS), and your data sources. 

You should now have an API key available for you. Data source API keys is a unique key used for both authentication when pushing data and also as an id for the data source that you will be pushing source entities to. 

Read more about data sources and how to manage them [here](/key-concepts/overview).

### Preparing your system
You will need a way to ingest data into Enterspeed from your source system. 
We currently have multiple options to get started with pushing source entities to Enterspeed. 

1. Through our API. Find the [API documentation here](../api#tag/Ingest).
2. Premade [connectors](https://docs.enterspeed.com/integrations) so you can get started immediately.
3. Our .NET SDK. https://github.com/enterspeedhq/enterspeed-sdk-dotnet

### Source entities
When the above steps have been applied successfully you are ready to push data to Enterspeed. 
Data in Enterspeed is called Source Entities. Source entities conform to a specific format. The important thing to know about source entities is that these are not representing the final output of your Enterspeed routes, but should be seen as the data that is available for you to work with and [transform](#transforming-data) to your needs through your schemas.

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
When you ingest a _product_, the list of products should be updated in the generated category view and include the changes. This is a typical use case scenario for actions.

Read more about [Actions](/docs/key-concepts/actions.md)

### References
Referencing another schema.

The [Reference](/reference/property-types#reference) property type is a bit different than the [Partial](/reference/property-types#partial) property type.
The [Reference](/reference/property-types#reference) property allows referencing other views created from either this Source Entity or from another source entity and the Partial property can only use data from this Source Entity. 

A benefit of a reference field is that the referenced view is resolved when requested by the Delivery API. There is no need the update the requested view if a referenced view has been updated.

Read more about the Reference property [here](/docs/key-concepts/referencing-schemas.md) with a more in-depth explanation and examples.

### Views


## Delivering data
### Environment settings
### Getting started guides
