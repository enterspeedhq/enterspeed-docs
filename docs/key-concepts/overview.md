---
sidebar_position: 1
sidebar_label: Overview
---

# Overview
To understand the concept of Enterspeed, you would have to look at it as a 3 step process. 
1. Ingest data
2. Transform data
3. Delivery data


## Ingesting data

### Environment settings
Enterspeed will automatically create two environments for you. You can view them under Environment settings in the [settings section](https://app.enterspeed.com/settings/environment-settings)

You can create new environments, edit the name of your environments or delete them. Beware of deleting environments, since this is an irreversible action that will remove all data attached to the environment.

### Data source settings
We need to prepare Enterspeed, so your tenant can receive data. This is done by creating a data source. Data sources are where a connection is created to your CMS, PIM-system, or perhaps a development instance of your CMS.

Data sources are always part of a source group. A source group can have multiple data sources attached and each data source have its own unique API key.

Go to [data sources](https://app.enterspeed.com/settings/data-sources) and create a data source group. (e.g. Demo CMS)

Now it is time to create a data source. Give your data source a name, select one or more environments that you created earlier and then click the Add-button. Once you have added your data sources, click the Create-button.

You should now have an API key available for you. Data source API keys is a unique key used for both authentication when pushing data and also as an id for the data source that you will be pushing source entities to. 

Read more about data sources [here](/key-concepts/overview).

### Preparing your system
You will need a way to ingest data into Enterspeed from your source system. Luckily this is already made easy for you, with some great documentation on the [Ingest API](https://docs.enterspeed.com/api). We also have some premade [connectors](https://docs.enterspeed.com/integrations) so you can get started immediately. 





### Source entities

## Transforming data
### Schemas 
### Routing 
### Partial Schemas
### Actions
### References
### Views

## Delivering data
### Environment settings
### Getting started guides
