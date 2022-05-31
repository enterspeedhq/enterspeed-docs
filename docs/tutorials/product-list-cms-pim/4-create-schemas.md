---
sidebar_position: 3
title: 4. Create schemas
---

# Create schemas

Now let's transform that data and create the output we need for our frontend.

## PIM categories

First, create a schema named _Pim Category_:

```json
{
  "triggers": {
    "pim": ["PimCategory"]
  },
  "properties": {
    "image": "{p.image}",
    "title": "{p.title}",
    "lead": "{p.lead}",
    "button": "{p.button}"
  }
}
```

:::danger
**TODO:** Update the schemas below to use triggers instead of sourceEntityTypes
:::

This will hold the data model for our category coming from the PIM, creating a view for each individual category.

## Product Category List

Now create a _Product Category List_ schema:

```json
{
  "sourceEntityTypes": ["CategoryList"],
  "properties": {
    "vacationHouses": {
      "type": "array",
      "input": {
        "$lookup": {
          "filter": "type eq 'PimCategory'",
          "top": 4
        }
      },
      "items": {
        "type": "reference",
        "gid": {
          "$exp": "{item.id}"
        },
        "alias": "PimCategory"
      }
    }
  }
}
```

This is where we list the product categories. We use the `filter` feature in the `input` type `$lookup`.

In the `items` we reference the _Pim Category_ schema (see above), se that each view for each individual category is applied.

## Product Categories

Finally we need a _Product Categories_ schema, that references our _Product Category List_ schema.

```json
{
  "sourceEntityTypes": ["productList"],
  "route": {
    "url": "{url}"
  },
  "properties": {
    "headline": "{p.headline}",
    "lead": "{p.lead}",
    "listing": {
      "type": "array",
      "input": {
        "$lookup": {
          "filter": "type eq CategoryList and originId eq pim-category-list"
        }
      },
      "items": {
        "type": "reference",
        "gid": {
          "$exp": "{item.id}"
        },
        "view": "productCategoryList"
      }
    }
  }
}
```

This schema holds the data model for our CMS data (_headline_ and _lead_) and looks up the PIM.

## Deploy and test output

Now we are ready to deploy the schemas and make sure the output, is as expected.

:::danger
**TODO:** Add descrioption of how to deply with the new update

**TODO:** Add screenshot after update
:::
