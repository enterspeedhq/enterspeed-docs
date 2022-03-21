---
sidebar_position: 2
title: 3. Going further
---

# Going further: Hamburger navigation

If you have a more than one level of items, the schema will cover that as well. E.g. if you need to create a hamburger navigation with deeper levels:

![Create source Enterspeed](/img/docs/examples/multilevel-navigation/cms-structure-multiple.png)

The schema will automatically include that in the output:

```json
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
									"children": [
										{
											"id": "gid://Environment/8d69146b-dedb-4fe5-864d-d4704bb6a639/Source/affbfc34-5897-4437-a224-49720334e009/Entity/1074-en-us/View/getNavigationItem",
											"view": {
												"title": "Page 1",
												"children": [
													{
														"id": "gid://Environment/8d69146b-dedb-4fe5-864d-d4704bb6a639/Source/affbfc34-5897-4437-a224-49720334e009/Entity/1075-en-us/View/getNavigationItem",
														"view": {
															"title": "Paragraph 1",
															"children": []
														},
														"type": "ViewReference"
													},
													{
														"id": "gid://Environment/8d69146b-dedb-4fe5-864d-d4704bb6a639/Source/affbfc34-5897-4437-a224-49720334e009/Entity/1076-en-us/View/getNavigationItem",
														"view": {
															"title": "Paragraph 2",
															"children": []
														},
														"type": "ViewReference"
													}
												]
											},
											"type": "ViewReference"
										}
									]
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
