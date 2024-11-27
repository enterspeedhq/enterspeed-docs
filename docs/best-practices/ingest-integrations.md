---
sidebar_position: 2
title: Ingest integrations
---


# Ingest integrations

#### One Source Group per system
Before you can ingest data (source entities) into Enterspeed, you need to create a Source Group where the data can go into. In general you want to create a Source Group per system you wan't to ingest data from. This means one Source Group for your CMS data, one Source Group for you PIM data, one Source Group for you ERP data and so on. 

#### Only ingest source entities when fully updated
When ingesting source entities it's important to not do multiple "partial" ingests, like ingesting a single source entity everytime a single field is updated in the source system.  
This could be if your source system auto saves and sends a save event everytime an editor changes a single field, instead of when the editor is done updating all nessecary fields and click save. 

Doing multiple ingests for a single source entity, one for every single property change, will do multiple unnessecary view generations, creating a larger queue of jobs and delaying the final view generation. Instead make sure to only ingest source entities one time once they are fully updated.

#### Exclude unsed properties that changes often
In general you can ingest all your properties for a source entity type into Enterspeed and then only map the properties you actually need in the schemas. Enterspeed will even detect if you are ingesting a source entity with know changes since the last ingested version of the source entity, and will start processing a now view.

However if you have properties that changes often and you don't use these properties you should not ingest these properties, as this will generate new views on every ingest even though the views are not changing. This could be if you have a stock count properties changing everytime a customer buys a product and you are not using the stock count or you are only using it to return a boolean like true if stock count is larger than zero or false if it is zero. Then Enterspeed will regenerate the view everytime the stock count changes from 100 to 99 to 98 to 97 and so on with the same result.
In this case you should ingest the boolean value instead of the stock count.

:::tip
You can use the log in the Management App and filter by Ingest API to see exactly how many ingest requests you are doing.

![Create source Enterspeed](/img/docs/best-practices/ingest-log.png)
:::

#### Don't delete all source entities on every import run
When running import jobs you should not start by deleting all source entities and then reingest all source entities again. 

First of it means that all your views will be deleted and is missing until all source entities has been reingest and all views has been reprocessed again.

Secondly, Enterspeed has a feature to only reprocess views if the source entities has changed and by deleting all source entities and reingesting them, this feature of course doesn't work which can cause an extensive amount of extra jobs and view generations.

If you don't get delete events from your backend system so you delete source entities right away, you should keep a list of previous ingested source entities, so you can compare which source entities must be deleted.

#### Don't duplicate information on multiple source entity types
When ingesting data to Enterspeed you should avoid having the same information duplicated on multiple source entity types. E.g. if you have a product source entity and a price source entity, the sales price should not be ingested as property on both the product and the price source entity. 

Having duplicate data like this means that you have have to ingest both source entities everytime the sales price changes, which means Enterspeed needs to process extra views. 

Enterspeed has features like [references](https://docs.enterspeed.com/reference/js/properties#reference) and [lookup](https://docs.enterspeed.com/reference/js/properties#lookup) that let's you use data from other source entities in the schemas, so use these features instead.

