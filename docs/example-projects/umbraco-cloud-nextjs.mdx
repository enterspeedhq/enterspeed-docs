---
sidebar_position: 1
slug: /umbraco-cloud-nextjs
title: Umbraco Cloud & Next.js
---

# Setting up Enterspeed with Umbraco Cloud and Next.js

:::info 
This tutorial uses Umbraco Cloud V8. You can view the finished project [here](https://enterspeed-demo-nextjs.netlify.app/) and the code on [Github](https://github.com/enterspeedhq/enterspeed-demo-nextjs). 
:::

In this tutorial, we’re going to see how we can set up a Next.js application, using data from Enterspeed and Umbraco Cloud.

We’re going to sync all of our content from Umbraco Cloud to our new Enterspeed-project. This will enable us to design a whole new front-end application, while still using our data from our existing CMS.

You might be wondering: *“But why, though? 🤷‍♂️“*. The answer is **performance** and **flexibility**.

It’s no secret that traditional CMS' can be quite cumbersome to work on, when optimizing for performance, for instance improving [Core Web Vitals](https://web.dev/vitals/). This is why many websites are moving away from traditional, [monolithic](https://en.wikipedia.org/wiki/Monolithic_application) solutions and over to new [headless](https://en.wikipedia.org/wiki/Headless_software) solutions like a JAMstack (**J**avascript, **A**PI, and **M**arkup) solution.

By syncing your content to Enterspeed, you get the flexibility to design and optimize your front-end application as you please. Content can be rendered in whichever framework you prefer, be it Next.js, Nuxt.js, Gatsby, or simply plain vanilla JS.

This makes developers happy since they now can build a blazing fast application. The content creators are also happy since they can keep the editor experience (their CMS) they are familiar with and don’t have to learn a new tool.

Should content creators wish to switch to another CMS, the developers can simply connect this new source to Enterspeed without worrying about losing data or risking downtime.

Everybody gets it their way ❤️

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

![Umbraco Cloud Enterspeed Config](../../static/img/docs/example-projects/umbraco-cloud-enterspeed-config.png)

1. Set the **Enterspeed endpoint** to [https://api.enterspeed.com/](https://api.enterspeed.com/)

2. Set your media domain (optional).

3. Insert your API key generated in the Enterspeed-app under “Sources” (*We will do this in step 2.1.*).

4. Test the connection and save configuration afterward.

Your data will now be synced to Enterspeed each time you publish content. 

### 1.1. Sending content to Enterspeed manually

When you click **Save and publish** in Umbraco, the content will automatically be sent to Enterspeed. There may be cases where you need to trigger it manually, for instance when you import content - e.g. from a starter kit.

To send content manually to Enterspeed go to the **Content** tab in the top menu. Click the **Enterspeed content** tab and select **Seed**. 

To send published content to Enterspeed, click the **Seed** button. This will queue a transfer of all your Umbraco content to Enterspeed.

![Umbraco Cloud Seed Content](../../static/img/docs/example-projects/umbraco-cloud-enterspeed-seed.png)

## 2. Setting up your Enterspeed account
For this tutorial, we already assume that you have an Enterspeed-account with a **tenant** attached to it. First, let’s take a closer look at the Enterspeed interface and see how everything works.

:::info
If you are already familiar with the Enterspeed interface, you can skip section “2.1. The Enterspeed Interface” and go directly to “2.2. Setting up your first project”
:::

## 2.1. The Enterspeed interface
Once you’re logged in, you’ll see an empty Frontpage. Don’t worry, you didn’t do anything wrong - we’re still working on it ⚒️ 

In the blue sidebar, you have all the navigation. 

Right under the logo, you’ll find the name of the **tenant** you are on. Think of a tenant as a property for your website. You can have multiple tenants under your account. If you have more than one, you can switch tenants by using the arrows next to the tenant name.

:::info
An account can have access to multiple tenants.
:::

In the menu below you’ll find three sections: **Sources, API Design & Environments**. We’ll dive into each section explaining its purpose and how to use it.

### 2.1.1. Sources
Sources are where we create our connection to our data source. In this example, our data source is Umbraco Cloud, but it might as well have been another CMS, a PIM-system, or perhaps a development instance of your CMS. 

When we create a source, we start by giving it a name and selecting a type (e.g. CMS). After we have created a source an API key is generated. This API key will be used in our data source, in this example Umbraco Cloud.

Once we have set up the Enterspeed Umbraco package and configured our new API key, the data will be pushed to Enterspeed via our Ingest API.

All content will now be available under **Source entities**.

On the Source entities page, you will find all the content from your sources. You can switch between sources and view the raw data that has been injected into Enterspeed.

:::info
All ingested data is saved “as a copy” in Enterspeed. Therefore, deleting data in Enterspeed won’t delete data in Umbraco Cloud.
:::

### 2.1.2. API Design
API design is where you design the schemas you’re going to use on your new application (in our example it's Next.js).

This section consists of two pages: **Schemas** and **Partial schemas**. 

You can think of **Partial schemas** as reusable components/building blocks for your **Schemas**. This can for instance be a button or headline component that is used in the Umbraco Block Editor.

Once you have designed and deployed your schemas they will be available via our Delivery API which fetches the data.

### 2.1.3. Environments
Environments are an area for your new application (in this example, our new Next.js application). You can set up multiple environments, for instance, a development environment and a production environment. 

In each environment, you can have multiple **Environment clients**. You can think of an **Environment client** as a single site. 

You start by giving the **Environment** a name, afterwards, you can create an **Environment client**. Once you have given it a name and selected which **Environment** it should be attached to, an API key is generated.

On the **Domain** page, you can add your domain name(s). This/these can then be attached to your **Environment client** on the **Environment client** page.

The **Domain** helps to filter your data correctly in the Enterspeed Delivery API. Since you might have multiple sites configured in Enterspeed, it is important for us to know which site you want data from, when sending the request.

:::info
Each **Domain** can have multiple hostnames attached.
:::

Great, now that we have an understanding of the interface, it’s time for the fun part: Setting up your first project! 👏

## 2.2. Setting up your first project
Setting up a new project in Enterspeed consists of 3 steps, which are:

1. Creating your sources

2. Configuring your environments

3. Designing your API’s

Once these steps are complete we can start using the data in our Next.js application.

### 2.2.1. Creating your sources
Go to **Sources** and click the “**Create new**” button. Give your source a name (e.g. Umbraco Cloud) and select **CMS** in type. Afterward, click on the **Create** button.

An API key is now generated. Copy the API key and paste it into the Enterspeed settings in your Umbraco backend (*See step 1*).

After a couple of minutes, all your data from Umbraco Cloud will have been synced to Enterspeed. You can view it by navigating to **Source Entities** and selecting your source (the name you provided when creating it) in the **Source** dropdown.

### 2.2.2. Configuring your environments
Now it’s time to configure your environments. Go to **Environments** and click the “**Create new**” button. Give your environment a name (e.g. Production) and click on the Create button.

Go to **Domains** and click the “**Create new**” button. Give your domain a name (e.g. Production) and click on the **Create** button.

:::info
**Domains** are used in Enterspeed as a way of filtering your data if you have multiple data sources. You can name it whatever you like, but we recommend using the same name as your domain name for ease of use.

If you’re working on a multi-site project, you will also need to configure hostnames. This can be done by clicking on the three dots next to the domain name. 
:::

Navigate to **Environment clients** and click the “**Create new**” button. Give your environment client a name (e.g. My Next.js Application) and select the **Environment** you just created. Afterward, click on the **Create** button.

An API key is now generated. We’re going to use this in our Next.js application (*See step 3.1.*).

Next to your new environment client click on the three dots and select **Edit domains**. Select the domain you just created and click the “**Save changes**” button.

### 2.2.3. Designing your API’s
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

#### 2.2.3.1. Example schemas

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
Copy the API key from your Environment client in the Enterspeed app (*See step 2.2.2.*).

Go to your Next.config.js and insert your API key under **env** in a key called **enterspeedApiKey**. It should look like this:

```json title="next.config.js"
module.exports = {
  env: {
    enterspeedApiKey: 'YOUR-ENVIRONMENT-KEY-HERE'
  }
}
```