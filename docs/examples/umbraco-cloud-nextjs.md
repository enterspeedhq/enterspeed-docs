---
sidebar_position: 1
title: Umbraco Cloud & Next.js
---

# Setting up Enterspeed with Umbraco Cloud and Next.js

:::info 
This tutorial uses Umbraco Cloud V8. You can view the finished project [here](https://enterspeed-demo-nextjs.netlify.app/) and the code on [Github](https://github.com/enterspeedhq/enterspeed-demo-nextjs). 
:::

In this tutorial, we’re going to see how we can set up a Next.js application, using data from Enterspeed and Umbraco Cloud.

**So what do you need to get started? You’ll need:**
- An Enterspeed account.

- A Umbraco Cloud account ([Start 14-day free trial here](https://umbraco.com/products/umbraco-cloud/)).

- A Next.js application (If you don’t want to host it locally, we suggest using [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/) - both have a free tier available).

## 1. Configuring your Umbraco Cloud account
For this tutorial, we’ll assume that you already have a Umbraco Cloud account. If you don’t, you can set up a free trial at [https://try.umbraco.com/](https://try.umbraco.com/)

In order to send data to Enterspeed, we need to install the Enterspeed Umbraco package. Go to the **Packages** tab in the top menu and search for **“Enterspeed Umbraco source integration”**. Select the package and hit install.

:::caution
For production setups, we recommend installing the NuGet package instead. You can find it here: [https://www.nuget.org/profiles/Enterspeed](https://www.nuget.org/profiles/Enterspeed) 
:::

Now it’s time to configure the package. Go to the **Settings** tab in the top menu and select **Enterspeed settings**.

![Umbraco Cloud Enterspeed Config](../../static/img/docs/examples/umbraco-cloud-enterspeed-config.png)

1. Set the **Enterspeed endpoint** to [https://api.enterspeed.com/](https://api.enterspeed.com/)

2. Set your media domain (optional).

3. Insert your API key generated in the Enterspeed-app under “Sources” (*We will do this in step 2.1.*).

4. Test the connection and save configuration afterward.

Your data will now be synced to Enterspeed each time you publish content. 

### 1.1. Sending content to Enterspeed manually

When you click **Save and publish** in Umbraco, the content will automatically be sent to Enterspeed. There may be cases where you need to trigger it manually, for instance when you import content - e.g. from a starter kit.

To send content manually to Enterspeed go to the **Content** tab in the top menu. Click the **Enterspeed content** tab and select **Seed**. 

To send published content to Enterspeed, click the **Seed** button. This will queue a transfer of all your Umbraco content to Enterspeed.

![Umbraco Cloud Seed Content](../../static/img/docs/examples/umbraco-cloud-enterspeed-seed.png)

## 2. Setting up your first project
For this tutorial, we already assume that you have an Enterspeed-account with a **tenant** attached to it.

Setting up a new project in Enterspeed consists of 3 steps, which are:

1. Creating your sources

2. Configuring your environments

3. Designing your API’s

Once these steps are complete we can start using the data in our Next.js application.

### 2.1. Creating your sources
Go to **Sources** and click the “**Create new**” button. Give your source a name (e.g. Umbraco Cloud) and select **CMS** in type. Afterward, click on the **Create** button.

An API key is now generated. Copy the API key and paste it into the Enterspeed settings in your Umbraco backend (*See step 1*).

After a couple of minutes, all your data from Umbraco Cloud will have been synced to Enterspeed. You can view it by navigating to **Source Entities** and selecting your source (the name you provided when creating it) in the **Source** dropdown.

### 2.2. Configuring your environments
Now it’s time to configure your environments. Go to **Environments** and click the “**Create new**” button. Give your environment a name (e.g. Production) and click on the Create button.

Go to **Domains** and click the “**Create new**” button. Give your domain a name (e.g. Production) and click on the **Create** button.

:::info
**Domains** are used in Enterspeed as a way of filtering your data if you have multiple data sources. You can name it whatever you like, but we recommend using the same name as your domain name for ease of use.

If you’re working on a multi-site project, you will also need to configure hostnames. This can be done by clicking on the three dots next to the domain name. 
:::

Navigate to **Environment clients** and click the “**Create new**” button. Give your environment client a name (e.g. My Next.js Application) and select the **Environment** you just created. Afterward, click on the **Create** button.

An API key is now generated. We’re going to use this in our Next.js application (*See step 3.1.*).

Next to your new environment client click on the three dots and select **Edit domains**. Select the domain you just created and click the “**Save changes**” button.

### 2.3. Designing your API’s
Now for the fun part - designing the APIs we're going to use. This will be the glue that ties our Sources and Environments together. We do this by setting up schemas.

The powerful thing about setting up schemas yourself is you get to decide precisely which data you need and how it gets structured.

:::info
You can find all of the example schemas on [Github](https://github.com/enterspeedhq/enterspeed-demo-nextjs/tree/master/example-data/umbraco-cloud).
:::

:::info
If you get stuck on the way, don't hesitate to reach out to us. We're more than happy to help! You can contact us at [support@enterspeed.com](mailto:support@enterspeed.com).
:::

Let's take a look at how a schema can be structured. In **2.2.3.1. Example schemas** you'll see three examples from this project. We'll look at the **contentPage** example.

The first thing you need to define is your **sourceEntityTypes** - what kind of data should this schema use? You can find a list of all the Source Entity Types in the **Source entities** table under **Type**.

Next, we need to define the **route** - how should we be able to fetch the data? We can do this by URL, Handle, and ID. For our contentPages URL makes the most sense.

:::tip
See Step 3.2. how we fetch the data in our Next.js application.
:::

Lastly, but certainly not least, we need to define which data we want in our schema. We do this under **properties**. 

For each object, we need to define both the type (string, array, etc.) and the value of it (what value in our source entity are we looking for). 

The name of the object is the name we're going to use in our application. As you can see in the example, we have chosen to rename **pageTitle** to **headline** for our use case.

:::tip
When designing your schema, use the **Source entities** button to both tests and view your Source entities.
:::

When you're finished designing your schema, it's time to deploy it. Click the **Deploy schema** and choose the version of your schema you wish to deploy.

#### 2.3.1. Example schemas

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

## 3. Fetching Enterspeed-data in Next.js
For this tutorial, we assume you already have some knowledge of setting up a Next.js-project. If you not, you can read the getting started guide here: [https://nextjs.org/docs/getting-started](https://nextjs.org/docs/getting-started).

We’ve made a demo site you can view here: [https://enterspeed-demo-umbraco-cloud-next.netlify.app/](https://enterspeed-demo-umbraco-cloud-next.netlify.app/) 

The GitHub repo is available here: [https://github.com/enterspeedhq/enterspeed-demo-umbraco-cloud-next](https://github.com/enterspeedhq/enterspeed-demo-umbraco-cloud-next)

### 3.1. Inserting the API key
Copy the API key from your Environment client in the Enterspeed app (*See step 2.2.*).

Go to your Next.config.js and insert your API key under **env** in a key called **enterspeedApiKey**. It should look like this:

```javascript title="next.config.js"
module.exports = {
  env: {
    enterspeedApiKey: 'YOUR-ENVIRONMENT-KEY-HERE'
  }
}
```