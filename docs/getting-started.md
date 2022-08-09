---
slug: /getting-started
title: Getting started
---

# Getting started

## The ITD-process

To get started using Enterspeed, we need to go through a three-step process - the ITD-process:

1. **I**ngest data
2. **T**ransform data
3. **D**eliver data

![The Enterspeed process](../static/img/docs/general/the-enterspeed-process.png)

### Ingesting data

In this step, we ingest the data from your current data source(s) into Enterspeed. You can do this by using one of our [integrations](./integrations) or by using our [API](./api).

**_[Go to the Ingest data section.](./ingest)_**

### Transforming data

Once the data have been ingested into Enterspeed, we can start transforming it.

We do this by using our Schema designer. Here you can combine data from multiple sources and select which data you want to be available to the front-end.

Once the data is transformed it gets stored in a high-performance Redis database across multiple geographical regions.

**_[Go to the Transforming data section.](./transform)_**

### Delivering data

The data is now available to fetch via the Enterspeed Delivery API.

Like working with any other APIs, it's extremely easy to integrate into your front-end project.

**_[Go to the Delivering data section.](./deliver)_**
