---
sidebar_position: 3
title: Content dashboard
---

# Content dashboard

The content dashboard is for the editor to get an overview of the Enterspeed integration, ie. seeding content and the data integrity: has something failed while being sent to Enterspeed Ingest and what failed?

The Content dashboard lives in the Content section in the Umbraco backoffice.

![Umbraco v9 Content dashboard](/img/docs/integrations/umbraco/umbraco-v8-enterspeed-content-dashboard.png)

## Failed jobs
This list is to get an overview of what, if any, has failed while been sent to the Enterspeed Ingest API.

If an entity fails being sent, a row will be added and can be unfolded to see error details.

![Umbraco v9 Failed jobs](/img/docs/integrations/umbraco/umbraco-v8-enterspeed-failed-jobs.png)

## Seed
Seeding allows the editor to send all published content to Enterspeed for processing. 

Seed is an asynchronous action and can take a while to process. 

![Umbraco v9 Seed Content](/img/docs/integrations/umbraco/umbraco-v8-enterspeed-seed.png)