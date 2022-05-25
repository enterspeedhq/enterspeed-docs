---
sidebar_position: 3
title: 4. Create schemas
---

# Create schemas

Now lets transform that data and create the output we need for our frontend.

## PIM categories

First create a schema names _PimCategory_:

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

## Product Categories

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

## Product Category List

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