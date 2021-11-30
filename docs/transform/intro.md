---
sidebar_position: 1
sidebar_label: Intro
---

# Transforming data
import ReactPlayer from 'react-player/lazy'

All data transformation in Enterspeed is done from a set of schema definitions. Schemas are the glue that ties your existing data to your new layout. 

So when designing your schema, you get to choose which of your existing data you wish to use in your new layout- and how it should be structured.

Our schema can be divided into two areas: “Settings” and the actual data. Just like an HTML documents ``<Head>`` and ``<Body>``.

In our settings, we define:

1. Which source entity types to use
2. Set if the schema should be available via routes
3. Set if actions should occur when the schema is processed.

And in our data, we map our existing data to our new content. This is all done under the "properties"-object.

## Configuring the settings

The first thing we need to define is our **sourceEntityTypes**, which tells the schema what kind of data it should use. You can find all available types under **Source entities**.

:::info
The Source entity types are fetched from your data source, e.g. your CMS.
:::

Let's have a look. Say we wish to use data from our **contentPage** type, we simply define it like this:

```json
{
    "sourceEntityTypes": [
        "contentPage"
    ]
}
```

Next, we need to define is how we can fetch the data. We do this under **route**. Fetching can be done by URL, Handle, and ID. In this example, we do it by URL.

```json
{
    "sourceEntityTypes": [
        "contentPage"
    ],
    "route": { 
        "url": "{url}" 
    }
}
```

To keep this example simple, we're not going to define any actions.

Great, so we have defined our settings, where we chose which data our schema should use (sourceEntityTypes) and how we should be able to fetch it (routes).

## Defining the data

Now it's time to tie our existing data to our new content. We do this under **properties**.

We can define as many properties as we wish. For this example, we are going to define just one: a title.

First, we give our new property a name. Let's simply call it **title**. Next, we need to define which type we will use. In this case, it's a **string**.

Lastly, we need to set the **value** for this property. We do this by mapping to the data we wish to use from our **sourceEntityTypes**, which we defined earlier.

:::info
Click the **Source entities** button on the Schema page and click View next to the Source you want to use. Here you can see all the available data.
:::

The title we wish to use is called **pageTitle** in the data source and is inside the **properties**-object.

```json
{
    "sourceEntityTypes": [
        "contentPage"
    ],
    "route": { 
        "url": "{url}" 
    },
    "properties": {
        "title": "{properties.pageTitle}"
    }
}
```

## Deploying and testing your schema

Let's deploy and test our new schema.

Click on the **Deploy schema** button, select your data source and new version and click **Deploy schema**.

You can now test your schema via Postman, Insomnia, etc.

<ReactPlayer url='https://www.youtube-nocookie.com/watch?v=jrGPa8lXbio' />
