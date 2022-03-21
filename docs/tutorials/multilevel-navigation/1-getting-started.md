---
sidebar_position: 1
title: 1. Getting started
---

# Create a multilevel navigation from your CMS

:::info 
This is a how-to for creating a simple two-level navigation for you website using data from your CMS.

We are assuming you are familiar with Enterspeed and will focus on transforming your data it using schemas so it fits a web app.
:::

**Prerequisites:**
- You have an Enterspeed user and is logged in
- Tenants, data sources etc. is setup
- You have Postman, Insomnia og similar app installed
- You are comfortable getting and posting data

## The data

Our data is a common and straight forward example, that consists of two types: *navigationGroup* and *navigationItem*.

A *navigationGroup* is the parent and can have *navigationItems* as children. We have kept the properties to a minimum of having a title, this can of course be extended with URL and more.

In this example we only have one level, but you could have as many you choose.

The structure in your CMS could look like this:

![Create source Enterspeed](/img/docs/examples/multilevel-navigation/cms-structure.png)

The output like this:

![Create source Enterspeed](/img/docs/examples/multilevel-navigation/output-example.png)

And finally the (simplified) data we are working with:
```json
{
	"id": "1",
	"type": "navigationGroup",
	"properties": {
		"title": {
			"type": "string",
			"name": "title",
			"value": "Main navigation"
		}
	},
	"id": "2",
	"parentId": "1",
	"type": "navigationItem",
	"properties": {
		"title": {
			"type": "string",
			"name": "title",
			"value": "Home"
		}
	},	
	"id": "3",
	"parentId": "1",
	"type": "navigationItem",
	"properties": {
		"title": {
			"type": "string",
			"name": "title",
			"value": "Books"
		}
	},	
	"id": "4",
	"parentId": "3",
	"type": "navigationItem",
	"properties": {
		"title": {
			"type": "string",
			"name": "title",
			"value": "Book 1"
		}
	},	
	"id": "5",
	"parentId": "3",
	"type": "navigationItem",
	"properties": {
		"title": {
			"type": "string",
			"name": "title",
			"value": "Book 2"
		}
	}	
}
```

This is what a single data entity will look like when ingested into Enterspeed:

```json
{
	"sourceId": "gid://Source/0edb780d-e053-46b1-bed9-d8fbb3417d37",
	"id": "gid://Source/0edb780d-e053-46b1-bed9-d8fbb3417d37/Entity/1",
	"type": "navigationGroup",
	"originId": "1",
	"originParentId": null,
	"url": null,
	"redirects": [],
	"properties": {
		"title": "Main navigation"
	}
}
```