---
sidebar_position: 2
title: Getting data
---

# Getting data from Sitecore to Enterspeed
When you press publish on a piece of content in Sitecore, Sitecore handles the content as normally: validation, trigger events, etc. The integration into Enterspeed is simply just a couple of events that the integration listens to. 

## When content is being published
When a piece of content is being published in Sitecore, the integration reacts upon this and pushes it to Enterspeed, when the item has successfully been published.

It has then been sent to the Enterspeed Ingest API for Enterspeed to process it and deliver it to the Delivery API.

## SitecoreContentEntity explained
To make sure you understand the whole process from end to end, an important detail is how the SitecoreContentEntity is created, because these properties define the entity you work within Enterspeed.

The properties within the properties object don’t change when it gets ingested in Enterspeed, this means that when you are to create your Schemas to model your API, you can rely 1:1 on what you ingest and what you can query in Enterspeed.

## Seeding content to Enterspeed
If you have an existing site, have installed Enterspeed later in the development process or just want to make sure all your content is in Enterspeed, you can seed or re-seed all the content from Sitecore into Enterspeed.

This can simply be done by going to the root item of the Site that you would like to push to Enterspeed, and doing a republish with the language, subitems and relations checked. This way we ensure that all data sources on the pages are sent to Enterspeed as well. 