---
sidebar_position: 2
title: Getting data
---

# Getting data from Umbraco to Enterspeed

When you press Save and publish on a piece of content in Umbraco, Umbraco handles the content as normally: validation, trigger events, etc. The integration into Enterspeed is simply just a couple of events that the integration listens to.

## When content is being published

When a piece of content is published in Umbraco, the integration reacts to this and adds a job for the process in the database. Each job is unique and will only be processed once by the integration. You can read more about the jobs in the reference section.

Directly after the job is added to the database it will be processed by the integration and sent to the Enterspeed Ingest API for Enterspeed to process it and deliver it to the Delivery API.

## UmbracoContentEntity explained

To make sure you understand the whole process from end to end, an important detail is how the UmbracoContentEntity is created, because these properties define the entity you work with in Enterspeed.

The properties within the properties object don’t change when it gets ingested in Enterspeed, this means that when you are to create your Schemas to model your API, you can rely 1:1 on what you ingest and what you can query in Enterspeed.

## Seeding content to Enterspeed

If you have an existing site, have installed Enterspeed later in the development process or just want to make sure all your content is in Enterspeed, you can seed or re-seed all the content from Umbraco into Enterspeed.

This can simply be done by going to the Enterspeed Content dashboard and then going to Seed and pressing the button. In theory, the same happens when you press Save and publish. The seeding pulls all the content from the published cache and inserts a new EnterspeedJob in the database for each piece of content.

![Umbraco v10 Seed Content](/img/docs/integrations/umbraco/umbraco-v8-enterspeed-seed.png)

Every minute the database is checked for pending entities and if it has any it will be sent to the Enterspeed Ingest API, equivalent to the process from steps 3 to 7 in Publishing step by step. You can read more about the jobs in the reference section.
