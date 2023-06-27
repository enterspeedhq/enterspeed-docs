---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BrowserOnly from '@docusaurus/BrowserOnly';

# ✂️ Schema snippets

Below you'll find a collection of useful schema snippets. Use these as a starting point or inspiration when designing your next schema.

:::info

These snippets are meant as examples and are meant to be modified to fit your own data structure.

:::

## Map all source entity properties

A schema which dynamically maps all properties from your source entities to the `product`-object.

<BrowserOnly>
{() =>
<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "triggers": {
    "cms": ["product"]
  },
  "route": {
    "url": "{url}"
  },
  "properties": {
    "product": {
      "*": "p"
    }
  }
}
```

</TabItem>

<TabItem value="js" label="JavaScript">

```js
module.exports = {
  triggers: {
    "cms": ["contentPage"]
  },
  route: async function(sourceEntity) {
    return {
        url: sourceEntity.url
    }
  },
  properties: async function (sourceEntity, context) {
    return sourceEntity.properties
  }
}
```

</TabItem>
</Tabs>
}
</BrowserOnly>

## Site settings

A schema containing essential site settings, here Site name, Logo and Login page link.

<BrowserOnly>
{() =>
<Tabs>
<TabItem value="json" label="JSON" default>

```json title="Site settings"
{
  "triggers": {
    "cms": ["site"]
  },
  "route": {
    "handles": ["settings"]
  },
  "properties": {
    "siteName": "{p.siteName}",
    "logo": "{properties.logo[0].url}",
    "loginPage": {
      "type": "reference",
      "originId": "{properties.loginPage[0].id}",
      "view": "LinkItem"
    }
  }
}
```

</TabItem>

<TabItem value="js" label="JavaScript">

```js title="Site settings"
module.exports = {
  triggers: {
    "cms": ["site"]
  },
  route: async function(sourceEntity) {
    return {
        handles: ["settings"]
    }
  },
  properties: async function (sourceEntity, context) {
    let p = sourceEntity.properties;
    return {
      siteName: p.siteName,
      logo: p.logo[0].url,
      loginPage: await context.referenceByOriginId("LinkItem", p.loginPage[0].id)
    }
  }
}
```

</TabItem>
</Tabs>
}
</BrowserOnly>

## SEO Composition

A schema for basic SEO settings, here meta title, meta description and meta robots (index/noindex and follow/nofollow).

This schema can be used in other schemas using the [reference type](../reference/property-types#reference) as you can see in the code below.

<BrowserOnly>
{() =>
<Tabs groupId="seo-composition-example">
<TabItem value="json" label="JSON" default>

```json title="SEO Composition"
{
  "triggers": {
    "cms": ["frontpage", "article", "articles"]
  },
  "properties": {
    "title": "{p.seoTitle}",
    "description": "{p.seoDescription}",
    "robots": {
      "type": "object",
      "properties": {
        "follow": {
          "type": "boolean",
          "value": "{p.robotsFollow}"
        },
        "index": {
          "type": "boolean",
          "value": "{p.robotsIndex}"
        }
      }
    }
  }
}
```

</TabItem>

<TabItem value="js" label="JavaScript">

```js title="SEO Composition"
module.exports = {
  triggers: {
    "cms": ["frontpage", "article", "articles"]
  },
  properties: async function (sourceEntity, context) {
    let p = sourceEntity.properties;
    return {
      title: p.seoTitle,
      description: p.seoDescription,
      robots: {
        follow: p.robotsFollow,
        index: p.robotsIndex
      }
    }
  }
}
```

</TabItem>
</Tabs>
}
</BrowserOnly>

How the _SEO Composition schema_ will be used in another schema afterwards:

<BrowserOnly>
{() =>
<Tabs groupId="seo-composition-example">
<TabItem value="json" label="JSON" default>

```json title="SEO Composition used in another schema"
{
  "triggers": {
    "cms": ["article"]
  },
  "properties": {
      "seoComposition": {
          "type": "reference",
          "gid": "{id}",
          "view": "seoComposition"
      },
      ...
  }
}
```

</TabItem>

<TabItem value="js" label="JavaScript">

```js title="SEO Composition used in another schema"
module.exports = {
  triggers: {
    "cms": ["article"]
  },
  properties: async function (sourceEntity, context) {
    return {
      seoComposition: await context.referenceById("seoComposition", sourceEntity.id),
    }
  }
}
```

</TabItem>
</Tabs>
}
</BrowserOnly>

## Breadcrumb navigation

A schema for generating a [breadcrumb navigation](https://en.wikipedia.org/wiki/Breadcrumb_navigation).

This schema can be used in other schemas using the [reference type](../reference/property-types#reference), as you can see in the code below.

<BrowserOnly>
{() =>
<Tabs groupId="breadcrumb-navigation-example">
<TabItem value="json" label="JSON" default>

```json title="Breadcrumb item"
{
  "triggers": {
    "cms": ["homePage", "contentPage"]
  },
  "properties": {
    "link": {
      "type": "object",
      "properties": {
        "name": "{p.metaData.name}",
        "url": "{url}",
        "originId": "{originId}"
      }
    },
    "level": {
      "type": "number",
      "value": "{p.metaData.level}"
    }
  }
}
```

</TabItem>

<TabItem value="js" label="JavaScript">

```js title="SEO Composition used in another schema"
module.exports = {
  triggers: {
    "cms": ["homePage", "contentPage"]
  },
  properties: async function (sourceEntity, context) {
    return {
      link: {
        name: sourceEntity.properties.metaData.name,
        url: sourceEntity.url,
        originId: sourceEntity.originId,
      },
      level: sourceEntity.properties.metaData.level
    }
  }
}
```

</TabItem>
</Tabs>
}
</BrowserOnly>

How the _Breadcrumb item schema_ will be used in another schema afterward:

<BrowserOnly>
{() =>
<Tabs groupId="breadcrumb-navigation-example">
<TabItem value="json" label="JSON" default>

```json title="Breadcrumb item used in another schema"
{
  "triggers": {
    "cms": ["contentPage"]
  },
  "properties": {
    "breadcrumbs": {
      "type": "array",
      "input": "{p.metaData.nodePath}",
      "var": "breadcrumbItem",
      "items": {
        "type": "reference",
        "originId": "{breadcrumbItem}",
        "alias": "breadcrumbItem"
      }
    },
    ...
  }
}
```

</TabItem>

<TabItem value="js" label="JavaScript">

```js title="SEO Composition used in another schema"
module.exports = {
  triggers: {
    "cms": ["contentPage"]
  },
  properties: async function (sourceEntity, context) {
    return {
      breadcrumbs: await context.referenceByOriginIds("seoComposition", sourceEntity.properties.metaData.nodePath)
    }
  }
}
```

</TabItem>
</Tabs>
}
</BrowserOnly>

## Category products

A schema for listing all the products related to a specific category.

<BrowserOnly>
{() =>
<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "triggers": {
    "cms": ["category"]
  },
  "route": {
    "url": "/categories/{p.slug}"
  },
  "properties": {
    "title": "{p.name}",
    "description": "{p.description}",
    "products": {
      "type": "array",
      "input": {
        "$lookup": {
          "filter": "type eq 'product' and properties.categoryId eq '{originId}'"
        }
      },
      "var": "product",
      "items": {
        "type": "object",
        "properties": {
          "headline": "{product.p.name}"
        }
      }
    }
  }
}
```

</TabItem>

<TabItem value="js" label="JavaScript">

```js
module.exports = {
  triggers: {
    "cms": ["category"]
  },
  route: async function(sourceEntity) {
    return {
        url: "/categories/" + sourceEntity.properties.slug
    }
  },
  properties: async function (sourceEntity, context) {
    return {
      title: sourceEntity.properties.name,
      description: sourceEntity.properties.description,
      products: await context.lookup(`type eq 'product' and properties.categoryId eq '${originId}'`).map(product => 
      {
        headline: product.properties.name
      })
    }
  }
}
```

</TabItem>
</Tabs>
}
</BrowserOnly>

## Top 3 product reviews

A schema for listing the 3 highest rated product reviews.

<BrowserOnly>
{() =>
<Tabs>
<TabItem value="json" label="JSON" default>

```json
{
  "triggers": {
    "cms": ["reviews"]
  },
  "properties": {
    "reviews": {
      "type": "array",
      "input": {
        "$lookup": {
          "filter": "type eq 'review' and properties.hashtags/any(t: t eq '#productreviews')",
          "orderBy": {
            "property": "properties.rating",
            "sort": "desc"
          },
          "top": 3
        }
      },
      "items": {
        "type": "reference",
        "originId": "{item.originId}",
        "view": "Review"
      }
    }
  }
}
```

</TabItem>

<TabItem value="js" label="JavaScript">

```js
module.exports = {
  triggers: {
    "cms": ["reviews"]
  },
  properties: async function (sourceEntity, context) {
    return {
      title: sourceEntity.properties.name,
      description: sourceEntity.properties.description,
      products: context.lookup("type eq 'review' and properties.hashtags/any(t: t eq '#productreviews')", 3, { direction: "desc", propertyName: "rating" }).map(review => 
        context.referenceByOriginId("Review", review.originId)
      )
    }
  }
}
```

</TabItem>
</Tabs>
}
</BrowserOnly>
