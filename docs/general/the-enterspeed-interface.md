---
sidebar_position: 2
title: The Enterspeed Interface
---

# The Enterspeed interface
## General
Right next to the logo, you’ll find the name of the **tenant** you are on. Think of a tenant as a property for your website. You can have multiple tenants under your account. If you have more than one, you can switch tenants by using the arrows next to the tenant name.

:::info
An account can have access to multiple tenants.
:::

## Home

### Source entities
On the Source entities page, you will find all the content from your sources. You can switch between sources and view the raw data that has been injected into Enterspeed.

:::info
All ingested data is saved “as a copy” in Enterspeed. Therefore, deleting data in Enterspeed won’t delete data in for instance Umbraco.
:::

### Schemas
Is where you design the schemas you’re going to use on your new application.

Once you have designed and deployed your schemas they will be available via our Delivery API which fetches the data.

### Partial schemas
You can think of **Partial schemas** as reusable components/building blocks for your **Schemas**. This can for instance be a button or headline component that is used in the Umbraco Block Editor.

Once you have designed and deployed your partial schemas they will be available via our Delivery API which fetches the data.

## Settings

### Data sources
Data sources are where we create our connection to our data source. In this example, our data source is Umbraco, but it might as well have been another CMS, a PIM-system, or perhaps a development instance of your CMS. 

When we create a source, we start by giving it a name and selecting a type (e.g. CMS). After we have created a source an API key is generated. This API key will be used in our data source, in this example Umbraco.

Once we have set up the Enterspeed Umbraco package and configured our new API key, the data will be pushed to Enterspeed via our Ingest API.

All content will now be available under **Source entities**.
### Environment settings
Environments are an area for your new application. You can set up multiple environments, for instance, a development environment and a production environment. 

In each environment, you can have multiple **Environment clients**. You can think of an **Environment client** as a single site. 

You start by giving the **Environment** a name, afterwards, you can create an **Environment client**. Once you have given it a name and selected which **Environment** it should be attached to, an API key is generated.

On the **Domain** page, you can add your domain name(s). This/these can then be attached to your **Environment client** on the **Environment client** page.

The **Domain** helps to filter your data correctly in the Enterspeed Delivery API. Since you might have multiple sites configured in Enterspeed, it is important for us to know which site you want data from, when sending the request.

:::info
Each **Domain** can have multiple hostnames attached.
:::

### Logs
Here you can view log details from our services:

- Delivery API (all regions)
- Import Worker
- Ingest API
- Management API
- Processing Worker