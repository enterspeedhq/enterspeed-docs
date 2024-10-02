---
sidebar_position: 1
title: Getting started
---

# Getting started Sitecore & Enterspeed

The easiest way to get started with Sitecore and Enterspeed is using the pre-built Sitecore integration. 

**GitHub: [Enterspeed Source Sitecore CMS](https://github.com/enterspeedhq/enterspeed-source-sitecore-cms)**

This integration takes care of calling the Enterspeed Ingest API when changes occur in Sitecore.

## Installation
**Prerequisite:** Sitecore 8 or 9

:::info
If your want to use Sitecore 10 with Enterspeed please reach out to us as we would love to look into it.
:::

The fastest way to get up and running is to install the Enterspeed Sitecore integration with NuGet.

**NuGet:**  
[Enterspeed.Source.SitecoreCms.V8](https://www.nuget.org/packages/Enterspeed.Source.SitecoreCms.V8/)  
[Enterspeed.Source.SitecoreCms.V9](https://www.nuget.org/packages/Enterspeed.Source.SitecoreCms.V9/)

You can either install it manually from the NuGet manager in Visual Studio or execute one of the Install-Package command:

```bash
Install-Package Enterspeed.Source.SitecoreCms.V8
```

```bash
Install-Package Enterspeed.Source.SitecoreCms.V9
```

The NuGet package installs config files into this directory; verify that this folder contains config files.

```bash
~\App_Config\Include\Enterspeed
```

## Configuration

Once installed, please navigate to ```/sitecore/templates/System/Enterspeed``` in the Master database, and publish the item, including all descendants.
These templates must exist in the Web database as a prerequisite for Enterspeed configuration items.

You will see that your Sitecore instance is loaded with a new item in ```/Sitecore/system``` called "Enterspeed Configuration".

You will have to create a Site configuration, for each Enterspeed configuration you would like to create. 

In the Site configuration file, we have 7 fields
* API Base Url (required)

    > This is the api url for Enterspeed. Unless you have gotten a specific Enterspeed endpoint to call, please use: https://api.enterspeed.com

* API Key (required)
   
    > This is the Source API key. This API key can be found in the settings section of your tenant in https://app.enterspeed.com/ (Settings/Data sources)

* Enabled Sites

    > In this field, you define the area of content covered by the site configuration. All items within this area are pushed to the source specified in this configuration. Selected items must share the same fullPath as the rootPath(s) configured in your site configuration within the Sitecore config files.

* Media Base Url
    
    > Base url for media being pushed to Enterspeed. This would be typically be a url provided by your CDN for media and file hosting

* Site Base Url (required)

    > Base Url for your site.

* Publish Hook Url

    > You can call an external hook, when publish has finished. This could for example trigger a build in Netlify. 

* Enable Preview
   
    > With this checkbox you are defining where this configuration is for a preview site.


## First load after installing the Sitecore connector. 
A table called EnterspeedJobs must be created so that jobs can be processed asynchronously. This table is created in the master database, meaning the SQL user specified in the connection string must have the necessary permissions to create tables (e.g., db owner).

Ensure that the master database user has temporary rights to create tables in your master database.

## Enterspeed Logs
If something unexpected occurs or the need for investigation arises, the connector creates an Enterspeed log, which collects any exceptions encountered during data ingestion.

This log can be found in your Sitecore logs folder.
The format of the file is:
```Enterspeed.log.{date}.{time}.txt```