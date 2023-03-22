---
sidebar_position: 2
sidebar_label: Partial schemas
---

# Partial schemas

import ReactPlayer from 'react-player/lazy'

Partial schemas are a bit different from the typical schema.
A partial schema is a reusable schema that is used across multiple schemas. A typical use case is when you want a specific data structure and type of data across many schemas.

The difference between using a partial schema versus referencing another schema is that a referenced schema is stored as a separate view.

Using a partial schema with your schema gives the output of a single view when processed.

:::tip
Partial schemas are typically used when you want a reusable schema for mapping data that is part of the same entity. Eg. meta data (title, description, ...) is the same across different entity types but the data lives on the entity it self.
:::

:::danger
Don't use partial schemas for mapping data from another entity that's being referenced, as your views can be outdated if the referenced entity is updated.

In this case you should use [reference schemas](//docs/key-concepts/referencing-schemas.md).
:::

## Configure a partial schema

When using a partial schema, you are giving it a data object. This data object is typically the value of a specific part of the data source you are working on. It is also possible to use `root`, which allows the whole data source to be used in the partial schema.

In the below example, we are using a partial schema called `seo`, and passing it the value of `p.seo` (a complex JSON object with SEO properties and data)

## Examples

Example of a schema that is referencing a partial schema

```json title='Schema'
{
  "properties": {
    "headline": "{p.title}",
    "seo": {
      "type": "partial",
      "value": "{p.seo}", // Seo property from below data source example.
      "alias": "seo" // Alias of the partial schema that you are referencing
    }
  }
}
```

Example of the partial schema being used by the schema.

```json title="Partial Schema with an alias called seo"
{
  "properties": {
    "metaTitle": "{item.seoTitle}",
    "metaDescription": "{item.seoDescription}"
  }
}
```

The data source used in this example.

```json title="Data source"
{
  "sourceId": "gid://Source/bfb8fd65-35d7-48d1-94bc-df0da13469d2",
  "id": "gid://Source/bfb8fd65-35d7-48d1-94bc-df0da13469d2/Entity/1103",
  "type": "product",
  "originId": "1103",
  "originParentId": "1098",
  "url": "http://localhost:57152/products/bowling-ball/",
  "redirects": [],
  "properties": {
    "title": "Bowling Ball",
    "seo": {
      "seoTitle": "Bowling Ball",
      "seoDescription": "A bowling ball is a hard spherical ball used to knock down bowling pins in the sport of bowling. Balls used in ten-pin bowling and American nine-pin bowling traditionally have holes for two fingers and the thumb."
    }
  }
}
```

More examples can be found here [here](./tutorials/../../tutorials/umbraco-nextjs/3-designing-your-apis.md#example-schemas--partial-schemas)
