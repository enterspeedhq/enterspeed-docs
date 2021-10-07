---
sidebar_position: 4
title: 3. Designing your API's
---
import ReactPlayer from 'react-player/lazy'

# Designing your API's in Enterspeed

:::info
If you get stuck on the way, don't hesitate to reach out to us. We're more than happy to help! You can contact us at [support@enterspeed.com](mailto:support@enterspeed.com).
:::

Now for the fun part - designing the APIs we're going to use. This will be the glue that ties our Sources and Environments together. We do this by setting up schemas.

You find the schema editor in Enterspeed under API Design. Here you can add and edit Schemas and Partial schemas.

![Create new chema](../../../static/img/docs/examples/create-new-schema.png)

The powerful thing about setting up schemas yourself is you get to decide precisely which data you need and how it gets structured.

Let's take a look at how a schema can be structured. In *Example schemas & pertial schemas* below you'll see three examples from this project. We'll look at the **contentPage** example.

The first thing you need to define is your **sourceEntityTypes** - what kind of data should this schema use? You can find a list of all the Source Entity Types in the **Source entities** table in your Enterspeed-project under **Type**.

```json
{
	"sourceEntityTypes": [
		"contentPage"
	]
}
```

Next, we need to define the **route** - how should we be able to fetch the data? We can do this by URL, Handle, and ID. For our contentPages URL makes the most sense.

```json
{
   "route": {
        "url": {
            "$exp": "{url}"
        }
    }
}
```

Lastly, but certainly not least, we need to define which data we want in our schema. We do this under **properties**. 

For each object, we need to define both the type (string, array, etc.) and the value of it (what value in our source entity are we looking for). 

The name of the object is the name we're going to use in our application. As you can see in the example, we have chosen to rename **pageTitle** to **headline** for our use case.

:::caution
Notice how we refer to a viewHandle called **umbraco-{item.contentType}**. This is our partial schema **umbraco-blockText** we are referencing. 

If we don't create this partial schema, the ContentPage-schema won't work. 
:::

```json
{
	"properties": {
		"type": {
			"type": "string",
			"value": {
				"$exp": "{type}"
			}
		},
		"headline": {
			"type": "string",
			"value": {
				"$exp": "{properties.pageTitle}"
			}
		},
		"blocks": {
			"type": "array",
			"input": {
				"$exp": "{properties.contentBlocks}"
			},
			"items": {
				"type": "partial",
				"input": {
					"$exp": "{item}"
				},
				"viewHandle": {
					"$exp": "umbraco-{item.contentType}"
				}
			}
		}
	}
}
```

:::tip
When designing your schema, use the **Source entities** button to both tests and view your Source entities.
:::

When you're finished designing your schema, it's time to deploy it. Click the **Deploy schema** and choose the version of your schema you wish to deploy.

:::caution
Remember to check the box of your Sources. In the example below, our source is Umbraco Cloud.

If you don't select any Sources, nothing will be deployed.
:::

![Deploy schema](../../../static/img/docs/examples/deploy-schema.png)

## Example schemas & pertial schemas

### ContentPage
```json title="Example schema: ContentPage"
{
	"sourceEntityTypes": [
		"contentPage"
	],
	"route": {
		"url": {
			"$exp": "{url}"
		}
	},
	"properties": {
		"type": {
			"type": "string",
			"value": {
				"$exp": "{type}"
			}
		},
		"headline": {
			"type": "string",
			"value": {
				"$exp": "{properties.pageTitle}"
			}
		},
		"blocks": {
			"type": "array",
			"input": {
				"$exp": "{properties.contentBlocks}"
			},
			"items": {
				"type": "partial",
				"input": {
					"$exp": "{item}"
				},
				"viewHandle": {
					"$exp": "umbraco-{item.contentType}"
				}
			}
		}
	}
}
```
### umbraco-blockText (Partial schema)
```json title="Example partial schema: umbraco-blockText"
{
	"name": "Block Text",
	"viewHandle": "umbraco-blockText",
	"properties": {
		"text": {
			"type": "string",
			"value": {
				"$exp": "{item.content.text}"
			}
		},
		"alias": {
			"type": "string",
			"value": {
				"$exp": "{item.contentType}"
			}
		}
	}
}
```

### Navigation
```json title="Example schema: Navigation"
{
	"sourceEntityTypes": [
		"home"
	],
	"route": {
		"handles": [
			{
				"$exp": "navigation"
			}
		]
	},
	"properties": {
		"navigationItems": {
			"type": "array",
			"input": {
				"$lookup": {
					"operator": "equals",
					"sourceEntityProperty": "originParentId",
					"matchValue": {
						"$exp": "{originId}"
					}
				}
			},
			"items": {
				"type": "reference",
				"gid": {
					"$exp": "{item.id}"
				},
				"view": "navigationItem"
			}
		}
	}
}
```

:::info
You can find all of the example schemas on [Github](https://github.com/enterspeedhq/enterspeed-demo-nextjs/tree/master/example-data/umbraco-cloud). The project consists of the following schemas and partial schemas:

- [ContentPage](https://github.com/enterspeedhq/enterspeed-demo-nextjs/blob/master/example-data/umbraco-cloud/schemas/ContentPage.json)
- [Currency](https://github.com/enterspeedhq/enterspeed-demo-nextjs/blob/master/example-data/umbraco-cloud/schemas/Currency.json)
- [Home](https://github.com/enterspeedhq/enterspeed-demo-nextjs/blob/master/example-data/umbraco-cloud/schemas/Home.json)
- [Link](https://github.com/enterspeedhq/enterspeed-demo-nextjs/blob/master/example-data/umbraco-cloud/schemas/Link.json)
- [Navigation](https://github.com/enterspeedhq/enterspeed-demo-nextjs/blob/master/example-data/umbraco-cloud/schemas/Navigation.json)
- [NavigationItem](https://github.com/enterspeedhq/enterspeed-demo-nextjs/blob/master/example-data/umbraco-cloud/schemas/NavigationItem.json)
- [Product](https://github.com/enterspeedhq/enterspeed-demo-nextjs/blob/master/example-data/umbraco-cloud/schemas/Product.json)
- [ProductListingView](https://github.com/enterspeedhq/enterspeed-demo-nextjs/blob/master/example-data/umbraco-cloud/schemas/ProductListingView.json)
- [Products](https://github.com/enterspeedhq/enterspeed-demo-nextjs/blob/master/example-data/umbraco-cloud/schemas/Products.json)
- [umbraco-blockText](https://github.com/enterspeedhq/enterspeed-demo-nextjs/blob/master/example-data/umbraco-cloud/partial-schemas/umbraco-blockText.json) **(Partial schema)**
:::

## Testing your schemas
<ReactPlayer url='https://www.youtube-nocookie.com/watch?v=jrGPa8lXbio' />