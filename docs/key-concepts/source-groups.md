---
sidebar_position: 7
sidebar_label: Source Groups
---


# Source Groups

Source groups contains the sources you ingest your source entities into. Typically you have a source per environment inside a source group.

## Modes

:::info
Modes are currently in preview.
:::

Source groups works in two different modes. Modes are selected on source group creation and can't be changed afterwards.

### Schema Transformation (default)

Schema Transformation is the default and recommended mode for most scenarios. It enables you to transform and combine source entities into views or index items using defined schemas.

Once processed, views can be accessed via the [Delivery API](/api#tag/Delivery), while index items are available for querying through [Query API](../api#tag/Query).

The schema transformation is a powerfull feature, allowing you to tailor and structure data precisely to meet consumer needs. However, because the transformation process takes time, this mode is best suited for non-real-time data.

### Auto Indexing

On Auto indexing mode there is no transformation process. Instead, ingested source entities goes directly into an index, which can be queried using the [Query API](/api#tag/Query/operation/queryAutoIndengPost). 

Since no transformation is involved, the Auto Indexing mode is suited for scenarios such as handling large volumes of small, custom price objects that don’t require transformation, or frequently changing data like stock numbers.