---
sidebar_position: 2
title: Ingest integrations
---

# Ingest integrations

#### One source group per system
Before you can ingest data (source entities) into Enterspeed, you need to create a source group to store the data. In general, you want to create a source group for every source system that you're ingesting data from. So basically, that's one source group for your CMS data, one source group for you PIM data, one source group for you ERP data, and so on. 

#### Only ingest your source entities when fully updated
When you ingest source entities, it's important not to do multiple "partial" ingests, such as ingesting a single source entity every time a single field is updated in the source system.  
This could be if your source system auto saves and sends a save event everytime an editor changes a single field, instead of when the editor is done updating all necessary fields and clicks save. 

Doing multiple ingests for a single source entity, one for every single property change, will create multiple unnecessary view generations. And that can result in larger job queues and delay the final view generation. 

Instead, make sure to only ingest source entities one time once they're fully updated.

#### Exclude unused properties that change often
In general, you can ingest all your properties for a source entity type to Enterspeed - and then only map the properties you actually need in the schemas. Enterspeed will even detect if you're ingesting a source entity with no changes since the last ingested version of the source entity, and will not start processing a new view.

However, if some of your properties change often and you don't use these properties, you shouldn't ingest them. If you do it'll generate new views on every ingest even though the views aren't changing. This could be if you have a stock count property that change every time a customer buys a product - but you either aren't using that stock count or perhaps only use it to return a boolean such as "true" if the stock count is larger than zero or "false" if it's zero. If that's the case, Enterspeed will regenerate the view every time the stock count changes from 100 to 99 to 98 to 97 and so on with the same result.
In this case you should ingest the boolean value instead of the stock count.

:::tip
You can use the Management App's log function and filter by Ingest API to see exactly how many ingest requests you're doing.

![Create source Enterspeed](/img/docs/best-practices/ingest-log.png)
:::

#### Don't delete all source entities on every import run
When running import jobs, you should not start by deleting all source entities and then reingesting them again. 

First off, it means that you'll delete all your views and they'll stay missing until all source entities has been reingest and all views has been processed again.

Secondly, Enterspeed has a feature to only reprocess views if the source entities have changed. So by deleting all source entities and reingesting them, this feature of course doesn't work - and that can cause an extensive amount of extra jobs and view generations.

If you don't get delete events from your backend system so you can delete source entities right away, you should keep a list of previous ingested source entities, so you can compare which source entities you need to delete in the next run.

#### Don't duplicate information on multiple source entity types
When you ingest data to Enterspeed, you should avoid ducplicated information across source entity types. E.g. if you have a product source entity and a price source entity, the sales price should not be ingested as property on both of them. 

If you have duplicated data, you need to ingest both source entities every time the sales price changes and then Enterspeed needs to process extra views. 

Enterspeed has features like [references](https://docs.enterspeed.com/reference/js/properties#reference) and [lookup](https://docs.enterspeed.com/reference/js/properties#lookup) that lets you use data from other source entities in the schemas, so use those features instead.

