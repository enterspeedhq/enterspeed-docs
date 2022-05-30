---
sidebar_position: 3
title: 4. Create schemas
---

# Create schemas

Now lets transform that data and create the output we need for our frontend.

## PIM categories

First create a schema named _PimCategory_:

```json
{
	"sourceEntityTypes": [
		"PimCategory"
	],
	"properties": {
		"image": "{p.image}",
		"title": "{p.title}",
		"lead": "{p.lead}",
		"button": "{p.button}"
	}
}
```

This will hold the structure of our category coming from the PIM.

## Product Category List

Now create a _ProductCategoryList_ schema:

```json
{
	"sourceEntityTypes": [
		"CategoryList"
	],
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

This is where we control number of items, based on a _PimCategory_ lookup filter.

## Product Categories

Finally we need a _ProductCategories_ schema, that references our _ProductCategoryList_ schema.

```json
{
	"sourceEntityTypes": [
		"productList"
	],
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
					"operator": "equals",
					"sourceEntityType": "CategoryList",
					"sourceEntityProperty": "originId",
					"matchValue": {
						"$exp": "CategoryList"
					}
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

This schema holds the data from our CMS (_headline_ and _lead_) and looks up the PIM data and matches the _originId_.