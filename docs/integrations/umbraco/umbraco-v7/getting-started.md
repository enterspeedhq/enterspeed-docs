---
sidebar_position: 1
title: Getting started
---

# Getting started

The easiest way getting started with Umbraco and Enterspeed is using the pre-built Umbraco integration.

**GitHub:** [Enterspeed Source Umbraco CMS](https://github.com/enterspeedhq/enterspeed-source-umbraco-cms)
This integration takes care of calling the Enterspeed Ingest API when changes occurs in Umbraco. For a full overview of what Umbraco entities are send to Enterspeed, please see this list.

## Installation

**Prerequisite:** Umbraco 7.4 or above.

The fastest way to get up and running, is to install the Enterspeed Umbraco integration with NuGet.

**NuGet:** [Enterspeed.Source.UmbracoCms.V7](https://www.nuget.org/packages/Enterspeed.Source.UmbracoCms.V7/)

You can either install it manually from the NuGet manager in Visual Studio or execute the Install-Package command:

```
Install-Package Enterspeed.Source.UmbracoCms.V7
```

**Install specific version:**

```
Install-Package Enterspeed.Source.UmbracoCms.V7 -Version <version>
```

When the installation above has completed two new dashboards has been added to your Umbraco solution.

- **Content**: To seed and check errors when data is ingested
- **Settings**: To configure Enterspeed in Umbraco

## Configuration

Before Umbraco starts sending data to Enterspeed you will need to add a little piece of configuration.

Luckily this can easily be done within Umbraco itself or via Web.config.

### Source API key and Ingest endpoint

Firstly go to Settings and then select the Enterspeed Settings dashboard in your Umbraco backoffice.

You should see something like this:

![Umbraco v7 Enterspeed settings](/img/docs/integrations/umbraco/umbraco-v7-enterspeed-config.png)

### Enterspeed endpoint

The Enterspeed endpoint is the ingest endpoint, that Umbraco will use to send content to Enterspeed.

Unless you have gotten a specific Enterspeed endpoint to call, please use: https://api.enterspeed.com

### Media domain

The Media domain is to tell the Enterspeed integration where you have your media placed, e.g. if you have a CDN.

If you leave it empty, it will just use your current Umbraco installation domain.

### Api key

Before you can insert an API key, you must have created a Source within the [Enterspeed Management](https://app.enterspeed.com/settings/data-sources).

The API key looks something like this: source-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx. When you have gotten it, insert it in the Api key input field.

### Preview API key

Optional API key, serves the purpose of ingesting draft and unpublished content to the secondary (preview) source. Can be leveraged for your content editors to preview content, similarly to in-built 'Save & Preview' functionality in Umbraco.

Before you can insert a Preview API key, you must have created a Source within the [Enterspeed Management](https://app.enterspeed.com/settings/data-sources).

Enterspeeds connector will automatically push data to relevant primary or secondary sources based on actions performed in Umbraco backoffice, such as - Unpublish, trash, save, publish, etc.

### Testing connection

When you have inserted the Enterspeed endpoint and the API key(-s) click on Test connection and make sure that you get a successful response. When you do go ahead and Save the configuration.

## Web.config app settings

For Web.config, please use the following appSettings:

```xml
<add key="Enterspeed.Endpoint" value="" /><add key="Enterspeed.MediaDomain" value="" /><add key="Enterspeed.Apikey" value="" >
```

## Processed Umbraco entities

Here is an overview of what is processed and send to Enterspeed and what is not.

### Processed entities

- Published content
- Draft content (unpublished content/saved content)

### Not processed entities

- Dictionary
- Members
