# 1 - Ingesting data

The first step when working with Enterspeed is to get your current data sources into Enterspeed.

Go to Data sources under Settings and click the Create group button. This will open a modal that allows you to create a new source group. A source group can have multiple data sources attached, which each have its own unique API key.

![Data sources](../static/img/docs/ingest/data-sources.png)

## How to ingest data

There are three ways of doing this:

1. Using one of our integrations
2. Using our .NET SDK
3. Using our API.

### Ingesting data via an integration

Using one of our [integrations](./integrations/overview.md) is the easiest way to get data ingested. This integration takes care of calling the Enterspeed Ingest API when changes occur in your backend system.

### Ingesting data via our .NET SDK

Another way of ingesting data is by using our .NET SDK. You'll find more information about it here: https://github.com/enterspeedhq/enterspeed-sdk-dotnet

### Ingesting data via our API

Last but now least, you can of course use our API directly to ingest your data. [You can find the API documentation right here.](../api#tag/Ingest)

## Viewing ingested data

Once your data has been ingested into Enterspeed, it will be visible under Source Entities.

You can click on the View button to see the data for the source entity.

![Viewing ingested data](../static/img/docs/ingest/view-source-entities.png)
