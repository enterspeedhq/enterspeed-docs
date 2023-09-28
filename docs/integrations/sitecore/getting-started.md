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
Once installed, your Sitecore instance will be loaded with a new item in ```/Sitecore/system``` called "Enterspeed Configuration".

You will have to create a Site configuration, for each Enterspeed configuration you would like to create. 

In the Site configuration file, we have 7 fields
* API Base Url

    > This is the api url for Enterspeed. Unless you have gotten a specific Enterspeed endpoint to call, please use: https://api.enterspeed.com

* API Key
   
    > This is the Source API key. This API key can be found in the settings section of your tenant in https://app.enterspeed.com/ (Settings/Data sources)

* Enabled Sites

    > With this field you are defining what area of the content is covered by the Site configuration. All items within this area, are pushed to the source defined in this configuration.

* Media Base Url
    
    > Base url for media being pushed to Enterspeed. This would be typically be a url provided by your CDN for media and file hosting

* Site Base Url

    > Base Url for your site.

* Publish Hook Url

    > You can call an external hook, when publish has finished. This could for example trigger a build in Netlify. 

* Enable Preview
   
    > With this checkbox you are defining where this configuration is for a preview site.
