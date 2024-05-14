---
sidebar_position: 1
title: Getting started
---

# Getting started with Umbraco & Enterspeed

The easiest way to get started with Umbraco and Enterspeed is by using the pre-built Umbraco integration.

**GitHub: [Enterspeed Source Umbraco CMS](https://github.com/enterspeedhq/enterspeed-source-umbraco-cms)**

This integration takes care of calling the Enterspeed Ingest API when changes occur in Umbraco. For a full overview of what Umbraco entities are sent to Enterspeed, please see Umbraco entities.

## Installation

The fastest way to get up and running is to install the Enterspeed Umbraco integration with NuGet.

**NuGet:**  
[Umbraco 7](https://www.nuget.org/packages/Enterspeed.Source.UmbracoCms.v7/)  
[Umbraco 8](https://www.nuget.org/packages/Enterspeed.Source.UmbracoCms.v8/)  
[Umbraco 9+](https://www.nuget.org/packages/Enterspeed.Source.UmbracoCms/)

:::info
Using Umbraco Cloud? If you have used the Umbraco Cloud UaaS.cmd tool to set up your solution,
you need to manually update the referenced dlls after installing the Enterspeed NuGet package. Specifically, Microsoft.Bcl.AsyncInterfaces.dll needs to be updated.

From Visual Studio navigate to the [Namespace].Web\bin folder, and right-click on Microsoft.Bcl.AsyncInterfaces.dll, and select "Update Reference".
:::

When the installation above has been completed two new dashboards have been added to your Umbraco solution.

- **Content:** To seed and check errors when data is ingested
- **Settings:** To configure Enterspeed in Umbraco

## Configuration

Before Umbraco starts sending data to Enterspeed you will need to add a little piece of configuration.

Luckily this can easily be done within Umbraco itself or via [appsettings.json](#app-settings-umbraco-9) (Umbraco 9 and up) or [Web.config](#webconfig-umbraco-7-or-8). (Umbraco 7 and 8)

### Source API key and Ingest endpoint

Firstly go to Settings and then select the Enterspeed Settings dashboard in your Umbraco backoffice.

You should see something like this:

![Umbraco v10 Enterspeed Settings](/img/docs/integrations/umbraco/umbraco-v8-enterspeed-settings.png)

#### Enterspeed endpoint

The Enterspeed endpoint is the ingest endpoint, that Umbraco will use to send content to Enterspeed.

Unless you have gotten a specific Enterspeed endpoint to call, please use: [https://api.enterspeed.com](https://api.enterspeed.com/)

#### Media domain

The Media domain is to tell the Enterspeed integration where you have your media placed, e.g. if you have a CDN.

If you leave it empty, it will just use your current Umbraco installation domain.

### API key

Before you can insert an API key, you must have created a Source within the [Enterspeed Management](https://app.enterspeed.com/settings/data-sources).

The API key looks something like this: source-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx. When you have gotten it, insert it in the API key input field.

### Preview API key

The optional API key serves the purpose of ingesting draft and unpublished content to the secondary (preview) source. Can be leveraged for your content editors to preview content, similarly to the in-built 'Save & Preview' functionality in Umbraco.

Before you can insert a Preview API key, you must have created a Source within the [Enterspeed Management](https://app.enterspeed.com/settings/data-sources).

Enterspeeds connector will automatically push data to relevant primary or secondary sources based on actions performed in Umbraco backoffice, such as - Unpublish, trash, save, publish, etc.

### Testing connection

When you have inserted the Enterspeed endpoint and the API key(-s) click on Test connection and make sure that you get a successful response. When you do go ahead and Save the configuration.

## App settings (Umbraco 9+)

For appsettings.json or environment-specific settings file, please use the following appSettings example:

```json
{
    ...
    "Enterspeed": {
        "Endpoint": "https://api.enterspeed.com", // required
        "Apikey": "", // required
        "MediaDomain": "", // optional
        "PreviewApikey": "" // optional
    }
    ...
}
```

## Web.config (Umbraco 7 or 8)

For Web.config, please use the following appSettings example:

```xml
<appSettings>
    <add key="Enterspeed.Endpoint" value="https://api.enterspeed.com" /> <!-- required -->
    <add key="Enterspeed.Apikey" value="" /> <!-- required -->
    <add key="Enterspeed.MediaDomain" value="" /> <!-- optional -->
    <add key="Enterspeed.PreviewApikey" value="" /> <!-- optional -->
</appSettings>
```

## Processed Umbraco entities

Here is an overview of what is processed and send to Enterspeed and what is not.

### Processed entities

- Published content
- Draft content (unpublished content/saved content)
- Media
- Dictionary

### Not processed entities

- Members
- Users
