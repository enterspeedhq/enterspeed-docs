---
sidebar_position: 2
---

# Designing a schema
import ReactPlayer from 'react-player/lazy'

Our schema can be divided into two areas: “Settings” and the actual data.

In our settings, we define:

1. Which source entity types to use
2. Set if the schema should be available via routes
3. Set if actions should occur when the schema is processed.

And in our data, we map our existing data to our new content. This is all done under the "properties"-object.

<ReactPlayer controls="true" url='https://www.youtube-nocookie.com/watch?v=_Q-0VWkHtxE' />

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

Next, we need to define how we can fetch the data. We do this under **route**. Fetching can be done by URL, Handle, and ID. In this example, we do it by URL.

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

First, we give our new property a name. Let's simply call it **title**. 


Next, we need to set the **value** for this property. We do this by mapping to the data we wish to use from our **sourceEntityTypes**, which we defined earlier.

:::info
Click the **Source entities** button on the Schema page and click View next to the Source you want to use. Here you can see all the available data.
:::

The title we wish to use is called **pageTitle** in the data source and is inside the **properties**-object.

We can access this property by typing `p.` followed by the name of the property, here `p.pageTitle`

```json
{
    "sourceEntityTypes": [
        "contentPage"
    ],
    "route": { 
        "url": "{url}" 
    },
    "properties": {
        "title": "{p.pageTitle}"
    }
}
```

:::info
The default type of a property is a **string**. If you need another [property type](./reference/property-types), simply change your property to an object and use `type` and `value`, like this:

```json title="Property type: number"
"stock": {
  "type": "number",
  "value": "{p.inventoryQuantity}"
}
```
:::

## Deploying and testing your schema

Let's deploy and test our new schema.

Click on the **Deploy schema** button, select your data source and new version and click **Deploy schema**.

You can now test your schema via Postman, Insomnia, etc.

<ReactPlayer controls="true" url='https://www.youtube-nocookie.com/watch?v=adkdGwVEjnI' />
