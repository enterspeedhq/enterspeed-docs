---
sidebar_position: 2
title: 2. Create schemas
---

# Create schemas

Now to the fun part: creating schemas and transforming our data into something we can use in the frontend app.

## Navigation Item schema

Go to Schemas and hit the Create button, use “Get Navigation Item“ as name. Navigate to the schema and replace the content with this snippet:

```
{
	"sourceEntityTypes": [
		"navigationItem"
	],
	"actions": [
		{
			"type": "process",
			"alias": "getNavigationItem",
			"originId": "{originParentId}"
		}
	],
	"properties": {
		"title": "{p.title}",
		"children": {
			"type": "array",
			"input": {
				"$lookup": {
					"filter": "originParentId eq '{originId}'",
					"orderBy": {
						"property": "{item.metaData.sortOrder}",
						"sort": "desc"
					}
				}
			},
			"items": {
				"type": "reference",
				"gid": "{item.id}",
				"alias": "getNavigationItem"
			}
		}
	}
}
```

*Save* the draft and *deploy* your schema.

**Actions**
The key part of the schema is actions:

```
	"actions": [
		{
			"type": "process",
			"alias": "getNavigationItem",
			"originId": "{originParentId}"
		}
	],
```

In short this tells another schema to update if this one affected.

[Read more about actions](https://docs.enterspeed.com/reference/fields#actions)

## Navigation Group schema
Next we want to create a schema called “Get Main Navigation”, so hit that create button again.

Replace the content with this snippet:

```
{
	"sourceEntityTypes": [
		"navigationGroup"
	],
	"route": {
		"handles": [
			"mainNavigation"
		]
	},
	"properties": {
		"children": {
			"type": "array",
			"input": {
				"$lookup": {
					"filter": "originParentId eq '{originId}'",
					"orderBy": {
						"property": "{item.metaData.sortOrder}",
						"sort": "desc"
					}
				}
			},
			"items": {
				"type": "reference",
				"gid": "{item.id}",
				"alias": "getNavigationItem"
			}
		}
	}
}
```
The key part here is reference for the children. This will make sure to resolve the view when referenced.

[Read more about reference](https://docs.enterspeed.com/reference/property-types#reference)

## Output

To make sure we get the output we are looking for, generate a curl request by testing your NavigationGroup entity (remember to include handle):

(replace “[your_environment_key]” with your key)

```
curl -L -X GET 'https://delivery.enterspeed.com/v1?handle=mainNavigation' -H 'X-Api-Key: [your_environment_key]'
```

You should get a response that looks like this:

```
{
	"meta": {
		"status": 200,
		"redirect": null
	},
	"views": {
		"getMainNavigation": {
			"children": [
				{
					"id": "gid://Environment/8d69146b-dedb-4fe5-864d-d4704bb6a639/Source/affbfc34-5897-4437-a224-49720334e009/Entity/1079-en-us/View/getNavigationItem",
					"view": {
						"title": "Home",
						"children": []
					},
					"type": "ViewReference"
				},
				{
					"id": "gid://Environment/8d69146b-dedb-4fe5-864d-d4704bb6a639/Source/affbfc34-5897-4437-a224-49720334e009/Entity/1067-en-us/View/getNavigationItem",
					"view": {
						"title": "Books",
						"children": [
							{
								"id": "gid://Environment/8d69146b-dedb-4fe5-864d-d4704bb6a639/Source/affbfc34-5897-4437-a224-49720334e009/Entity/1068-en-us/View/getNavigationItem",
								"view": {
									"title": "Book 1",
									"children": []
								},
								"type": "ViewReference"
							},
							{
								"id": "gid://Environment/8d69146b-dedb-4fe5-864d-d4704bb6a639/Source/affbfc34-5897-4437-a224-49720334e009/Entity/1069-en-us/View/getNavigationItem",
								"view": {
									"title": "Book 2",
									"children": []
								},
								"type": "ViewReference"
							}
						]
					},
					"type": "ViewReference"
				}
			]
		}
	}
}
```

Now you can go to your web app start creating your navigation!

**Note:** that if you have multiple levels of navigationItems, the schemas will cover those as well!