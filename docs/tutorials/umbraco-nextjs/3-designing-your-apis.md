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

:::info
Partial schemas will soon be moved into the list of full schemas, bringing all the benefits you know from full schemas like the testing before deployment, environment-specific deployments and versioning.
:::

![Create new schema](/img/docs/examples/create-new-schema.png)

The powerful thing about setting up schemas yourself is you get to decide precisely which data you need and how it gets structured.

Let's take a look at how a schema can be structured. In _Example schemas & partial schemas_ below you'll see three examples from this project. We'll look at the **contentPage** example.

The first thing you need to define is your **triggers**. Triggers consist of one or more source groups, which contain one or more source entity types (the data your schema should use). You can find a list of all the Source Entity Types in the **Source entities** table in your Enterspeed-project under **Type**.

```json
{
  "triggers": {
    "umbracoCloud": ["contentPage"]
  }
}
```

Next, we need to define the **route** - how should we be able to fetch the data? We can do this by URL, Handle, and ID. For our contentPages URL makes the most sense.

```json
{
  "route": {
    "url": "{url}"
  }
}
```

Lastly, but certainly not least, we need to define which data we want in our schema. We do this under **properties**.

For each object, we need to define both the type (string, array, etc.) and the value of it (what value in our source entity are we looking for).

The name of the object is the name we're going to use in our application. As you can see in the example, we have chosen to rename **pageTitle** to **headline** for our use case.

:::caution
Notice how we refer to a alias called **umbraco-{item.contentType}**. This is our partial schema **umbraco-blockText** we are referencing.

If we don't create this partial schema, the ContentPage-schema won't work.
:::

```json
{
  "properties": {
    "type": {
      "type": "string",
      "value": "{type}"
    },
    "headline": {
      "type": "string",
      "value": "{p.pageTitle}"
    },
    "blocks": {
      "type": "array",
      "input": "{p.contentBlocks}",
      "items": {
        "type": "partial",
        "input": "{item}",
        "alias": "umbraco-{item.contentType}"
      }
    }
  }
}
```

:::tip
When designing your schema, use the **Source entities** button to both test and view your Source entities.
:::

When you're finished designing your schema, it's time to deploy it. Click the **Save draft** button. Next click the **Deploy schemas** button in the top right corner.

This will open the deploy pane. Choose the environment you wish to deploy to (e.g. Production) and click the **Deploy 1 change**-button.

![Deploy schema](/img/docs/examples/deploy-schema.png)

## Example schemas & partial schemas

### ContentPage

```json title="Example schema: ContentPage"
{
  "triggers": {
    "umbracoCloud": ["contentPage"]
  },
  "route": {
    "url": "{url}"
  },
  "properties": {
    "type": "{type}",
    "headline": "{p.pageTitle}",
    "blocks": {
      "type": "array",
      "input": "{p.contentBlocks}",
      "items": {
        "type": "partial",
        "input": "{item}",
        "alias": "umbraco-{item.contentType}"
      }
    }
  }
}
```

### umbraco-blockText (Partial schema)

:::caution
Notice how the alias is automatically generated as **umbracoBlockText**.

Click the lock to the right in the **Create new partial schema** dialog and change the alias to **umbraco-blockText**, so that it matches the reference we created in the ContentPage-schema.
:::

```json title="Example partial schema: umbraco-blockText"
{
  "properties": {
    "text": "{item.content.text}",
    "alias": "{item.contentType}"
  }
}
```

### Navigation

```json title="Example schema: Navigation"
{
  "triggers": {
    "umbracoCloud": ["home"]
  },
  "route": {
    "handles": ["navigation"]
  },
  "properties": {
    "navigationItems": {
      "type": "array",
      "input": {
        "$lookup": {
          "operator": "equals",
          "sourceEntityProperty": "originParentId",
          "matchValue": "{originId}"
        }
      },
      "items": {
        "type": "reference",
        "gid": "{item.id}",
        "view": "navigationItem"
      }
    }
  }
}
```

:::info
You can find all of the example schemas on [Github](https://github.com/enterspeedhq/enterspeed-demos/tree/master/umbraco-next/DEMO-DATA/enterspeed-schemas). The project consists of the following schemas and partial schemas:

- [ContentPage](https://github.com/enterspeedhq/enterspeed-demos/blob/master/umbraco-next/DEMO-DATA/enterspeed-contentPage.json)
- [Currency](https://github.com/enterspeedhq/enterspeed-demos/blob/master/umbraco-next/DEMO-DATA/enterspeed-curreny.json)
- [Home](https://github.com/enterspeedhq/enterspeed-demos/blob/master/umbraco-next/DEMO-DATA/enterspeed-home.json)
- [Link](https://github.com/enterspeedhq/enterspeed-demos/blob/master/umbraco-next/DEMO-DATA/enterspeed-link.json)
- [Navigation](https://github.com/enterspeedhq/enterspeed-demos/blob/master/umbraco-next/DEMO-DATA/enterspeed-navigation.json)
- [NavigationItem](https://github.com/enterspeedhq/enterspeed-demos/blob/master/umbraco-next/DEMO-DATA/enterspeed-navigationItem.json)
- [Product](https://github.com/enterspeedhq/enterspeed-demos/blob/master/umbraco-next/DEMO-DATA/enterspeed-product.json)
- [ProductListingView](https://github.com/enterspeedhq/enterspeed-demos/blob/master/umbraco-next/DEMO-DATA/enterspeed-ProductListingView.json)
- [Products](https://github.com/enterspeedhq/enterspeed-demos/blob/master/umbraco-next/DEMO-DATA/enterspeed-products.json)
- [umbraco-blockText](https://github.com/enterspeedhq/enterspeed-demos/blob/master/umbraco-next/DEMO-DATA/enterspeed-partial-umbraco-blockText.json) **(Partial schema)**

:::
