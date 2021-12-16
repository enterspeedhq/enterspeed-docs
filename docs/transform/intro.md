---
sidebar_position: 1
sidebar_label: Intro
slug: '/transform'
---

# Transforming data
All data transformation in Enterspeed is done from a set of schema definitions. Schemas are the glue that ties your existing data to your new layout. 

So when designing your schema, you get to choose which of your existing data you wish to use in your new layout- and how it should be structured.


## How does it work?
You start by choosing which data sources you want to use (`sourceEntityTypes`).

Afterward, you begin designing your schema by mapping which data from your data sources you want to use, e.g., a *title*. The actual schema design is done in the `properties` object.

If you want to make your schema routable you define a [`route`](./transform/reference/schema#route). By defining a `route`, you can fetch it via the [Delivery API](./api#tag/Delivery).

When you finish designing your schema, it's time to deploy it. Deploying the schema will automatically generate a **View** for each Source Entity Type.

:::info
A View is the actual data that has been transformed. If you have 10 Source Entity Types linked to your schema, this will generate 10 Views.
:::

Views will be generated if you:
- Deploy the schema again (this will regenerate all Views).
- A new Source Entity with the same type is available (this will only generate Views for the new Source Entities).
- A Source Entity gets Created, Updated, or Deleted via the Ingest API (This will affect the Views for the specific Source Entity).

## Example

Below is a simple example showing how a schema can look for transforming *source entities* with the type of `frontPage`.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="ingest" label="1. Ingest: Source entity" default>

Given the `frontPage` source entity have the following content.

```json title="Source entity example"
{
  "id": "1044-en-us",
  "type": "frontPage",
  "url": "/frontPage",
  "properties": {
    "title": "Welcome"
  }
}
```

</TabItem>
<TabItem value="transform" label="2. Transform: Schema design">

When designing our we access the **title** property using `p.title`.

We make the schema **routable** by using `route` and using the `url` from the source entity.

```json title="Schema example"
{
  "sourceEntityTypes": ["frontPage"],
  "route": {
    "url": "{url}"
  },
  "properties": {
    "headline": "{p.title}"
  }
}
```

</TabItem>
<TabItem value="deliver" label="3. Deliver: Output data">

When querying the Delivery API with `url=/frontPage` the output will be:

```json title="Delivery API output example"
{
  "title": "Welcome"
}
```

</TabItem>
</Tabs>

***Next, let's start learning how to design a schema. [Go to designing a schema](./transform/designing-a-schema)***