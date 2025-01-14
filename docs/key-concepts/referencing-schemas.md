---
sidebar_position: 3
sidebar_label: Referencing schemas
---

# Referencing schemas

The reference property allows referencing other views created from either its Source Entity or from another Source Entity.
Read more about reference property for JSON schemas [here](/reference/json/property-types.md#reference) or for JS schemas [here](/reference/js/full-schema/properties.md#reference).

:::tip
Reference schemas are typically used when you are mapping data from another entity. E.g. a page has a reference to another page entity or media entity.
:::

The reason why you would use reference schemas when mapping data from two different entities is to make sure your views are fully updated if one of the entities is updated.

Let's say you have a page schema that triggers on the page entity type. This means that every time the page is ingested the schema is processed and the view is updated.

Inside the schema, you are mapping the url and name of an image entity that the page is referencing, either directly in the schema or by using a partial schema.

Now, what happens if the image entity is ingested again with a new url or name? Nothing, because our page schema only triggers when a page is ingested.

This means that your page view with the image data is outdated, which is not good. That's why you use reference schemas when mapping data from other entities.

References are resolved on delivery request time. This means that if you have a page schema being processed every time a page is ingested with a schema reference to the image and an image schema being processed every time an image is ingested, then when you make a delivery request to the page, the views are merged together and you view data is always up to date.

Keep in mind, that you can only avoid reprocessing the referencing schema (the page schema) if you build the reference using `byOriginId` or `byOriginIds`. If you build the refernce using the `filter` function, you will still need to reprocess the referencing schema. You can read more about why that is and the reprocessing in general [here](/key-concepts/reprocessing.md)

## Use cases

Here is a list of examples of how to use the reference property and how it's used to reference schemas.

[Site settings](/reference/snippets.md#site-settings)

[SEO Composition](/reference/snippets.md#seo-composition)

[Breadcrumb navigation](/reference/snippets.md#breadcrumb-navigation)

[Top 3 product reviews](/reference/snippets.md#top-3-product-reviews)

[Referencing with static and dynamic values](/reference/fields.md#examples)
