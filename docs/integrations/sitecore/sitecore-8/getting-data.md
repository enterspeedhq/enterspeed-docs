---
sidebar_position: 2
title: Getting data
---

# Getting data from Sitecore to Enterspeed
When you press publish on a piece of content in Sitecore, Sitecore handles the content as normally: validation, trigger events, etc. The integration into Enterspeed is simply just a couple of events that the integration listens to. 

## When content is being published
When a piece of content is being published in Sitecore, the integration reacts upon this and pushes it to Enterspeed, when the item has successfully been published.

It has then been sent to the Enterspeed Ingest API for Enterspeed to process it and deliver it to the Delivery API. 

## Seeding content to Enterspeed
If you have an existing site, have installed Enterspeed later in the development process or just want to make sure all your content is in Enterspeed, you can seed or re-seed all the content from Sitecore into Enterspeed.

This can simply be done by going to the root item of the Site that you would like to push to Enterspeed, and doing a republish with the language, subitems and relations checked. This way we ensure that all datasources on the pages are sent to Enterspeed as well. 