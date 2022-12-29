---
sidebar_position: 4
title: 3. Designing your APIs
---

# Designing your APIs in Enterspeed

:::info
If you get stuck on the way, don't hesitate to reach out to us. We're more than happy to help! You can contact us at [support@enterspeed.com](mailto:support@enterspeed.com).
:::

Now for the fun part - designing the APIs we're going to use. This will be the glue that ties our Sources and Environments together. We do this by setting up schemas.

You find the schema editor in Enterspeed under **Schemas** and **Partial schemas**.

![Create new schema](/img/docs/examples/create-new-schema.png)

The powerful thing about setting up schemas yourself is you get to decide precisely which data you need and how it gets structured.

## Designing the `Blog Post` schema

Let's take a look at how a schema can be structured. We'll look at the **Blog Post**-schema, which will be responsible for showing the individual blog posts.

Go to **Schemas** and create a new schema called _Blog Post_. Open the editor and follow the steps below.

### Triggers

The first thing you need to define is your **triggers**. Triggers consist of one or more source groups, which contain one or more source entity types (the data your schema should use). You can find a list of all the Source Entity Types in the **Source entities** table in your Enterspeed-project under **Type**.

In our case, we have a source group called `postman` (note that we're using the **alias** of the source group and not the name).

```json
"triggers": {
  "postman": ["blogPost"]
}
```

### Route

Next, we need to define the **route** – how should we be able to fetch the data? We can do this by URL, Handle, and ID. For our blog posts URL makes the most sense.

```json
"route": {
  "url": "{url}"
}
```

### Actions

Next, we need to set up an action. This may seem a little complicated but is actually quite simple.

We're going to create a list of all the blog posts we have (we'll do this in the next schema). The reason we do this is to get the performance benefits of having a static (already generated) list, instead of having to do expensive lookups.

For this list to update, it needs to know _when_ to update.

:::danger
Explain action here
:::

```json
"actions": [
  {
    "type": "process",
    "originId": {
      "$exp": "{originParentId}"
    }
  }
]
```

### Properties

Lastly, but certainly not least, we need to define which data we want in our schema. We do this under **properties**.

For each object, we need to define both the type (string, array, etc.) and the value of it (what value in our source entity are we looking for).

:::tip
Since string is the most commonly used property type you can access it without writing the type and value property. This is meant as syntactic sugar making it easier and quicker to work with.

Example: `"title": "{p.headline}"`
:::

If we don't want to map all individual properties, we can also use [**dynamic mapping**](reference/property-types#dynamic), which automatically maps all available properties. This is exactly what we are going to do here since we are going to use all the available properties, and since they're already conveniently named.

Now all of our content will be available in the `content` object.

```json
"properties": {
  "content": {
    "*": "p"
  }
}
```

:::tip
When designing your schema, use the **Source entities** button to both test and view your Source entities.
:::

## Designing the `Blog list` schema

## Deploying the schemas

When you're finished designing your schema, it's time to deploy it. Click the **Save draft** button. Next click the **Deploy schemas** button in the top right corner.

This will open the deploy pane. Choose the environment you wish to deploy to (e.g. Production) and click the **Deploy 1 change**-button.

![Deploy schema](/img/docs/examples/deploy-schema.png)
