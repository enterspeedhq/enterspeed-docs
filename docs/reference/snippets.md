---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ✂️ Schema snippets

Below you'll find a collection of useful schema snippets. Use these as a starting point or inspiration when designing your next schema.

:::info
These snippets are meant as examples and are meant to be modified to fit your own data structure.
:::

## Map all source entity properties

A schema which dynamically maps all properties from your source entity to the view.

<Tabs>
<TabItem value="js" label="JavaScript" default>

```js
/** @type {Enterspeed.FullSchema} */
export default {
  triggers: function(context) {
    context.triggers('cms', ['contentPage']);
  },
  routes: function(sourceEntity, context) {
    context.url(sourceEntity.url);
  },
  properties: function (sourceEntity, context) {
    return sourceEntity.properties;
  }
}
```

</TabItem>

<TabItem value="json" label="JSON">

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
</Tabs>

## Site settings

A schema containing essential site settings, here Site name, Logo and Login page link.

<Tabs>
<TabItem value="js" label="JavaScript" default>

```js title="Site settings"
/** @type {Enterspeed.FullSchema} */
export default {
  triggers: function(context) {
    context.triggers('cms', ['site']);
  },
  routes: function(sourceEntity, context) {
    context.handle('settings');
  },
  properties: function (sourceEntity, context) {
    const p = sourceEntity.properties;
    return {
      siteName: p.siteName,
      logo: p.logo[0].url,
      loginPage: context
                  .reference("linkItem")
                  .byOriginId(p.loginPage[0].id),
    };
  }
}
```

</TabItem>

<TabItem value="json" label="JSON">

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
</Tabs>

## SEO Composition

A schema for basic SEO settings, here meta title, meta description and meta robots (index/noindex and follow/nofollow).

This schema can be used in other schemas using the [reference type](../reference/json/property-types#reference) as you can see in the code below.

<Tabs groupId="seo-composition-example">
<TabItem value="js" label="JavaScript" default>

```js title="SEO Composition"
/** @type {Enterspeed.FullSchema} */
export default {
  triggers: function(context) {
    context.triggers("cms", ["frontpage", "article", "articles"]);
  },
  properties: function (sourceEntity, context) {
    const p = sourceEntity.properties;
    return {
      title: p.seoTitle,
      description: p.seoDescription,
      robots: {
        follow: p.robotsFollow,
        index: p.robotsIndex,
      },
    };
  }
}
```

</TabItem>

<TabItem value="json" label="JSON">

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
</Tabs>

How the _SEO Composition schema_ will be used in another schema afterwards:

<Tabs groupId="seo-composition-example">
<TabItem value="js" label="JavaScript" default>

```js title="SEO Composition used in another schema"
/** @type {Enterspeed.FullSchema} */
export default {
  triggers: function(context) {
    context.triggers("cms", ["article"]);
  },
  properties: function (sourceEntity, context) {
    return {
      seoComposition: context
                        .reference("seoComposition")
                        .byOriginId(sourceEntity.originId),
    };
  }
}
```

</TabItem>

<TabItem value="json" label="JSON">

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
</Tabs>

## Breadcrumb navigation

A schema for generating a [breadcrumb navigation](https://en.wikipedia.org/wiki/Breadcrumb_navigation).

This schema can be used in other schemas using the [reference type](../reference/json/property-types#reference), as you can see in the code below.

<Tabs groupId="breadcrumb-navigation-example">
<TabItem value="js" label="JavaScript" default>

```js title="SEO Composition used in another schema"
/** @type {Enterspeed.FullSchema} */
export default {
  triggers: function(context) {
    context.triggers("cms", ["homePage", "contentPage"]);
  },
  properties: function (sourceEntity, context) {
    return {
      link: {
        name: sourceEntity.properties.metaData.name,
        url: sourceEntity.url,
        originId: sourceEntity.originId,
      },
      level: sourceEntity.properties.metaData.level,
    };
  }
}
```

</TabItem>

<TabItem value="json" label="JSON">

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
</Tabs>

How the _Breadcrumb item schema_ will be used in another schema afterwards:

<Tabs groupId="breadcrumb-navigation-example">
<TabItem value="js" label="JavaScript" default>

```js title="SEO Composition used in another schema"
/** @type {Enterspeed.FullSchema} */
export default {
  triggers: function(context) {
    context.triggers("cms", ["contentPage"]);
  },
  properties: function (sourceEntity, context) {
    return {
      breadcrumbs: context
                    .reference("seoComposition")
                    .byOriginIds(sourceEntity.properties.metaData.nodePath),
    };
  }
}
```

</TabItem>

<TabItem value="json" label="JSON">

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
</Tabs>

## Category products

A schema for listing all the products related to a specific category.

<Tabs>
<TabItem value="js" label="JavaScript" default>

```js
/** @type {Enterspeed.FullSchema} */
export default {
  triggers: function(context) {
    context.triggers("cms", ["category"]);
  },
  routes: function(sourceEntity, context) {
    context.url("/categories/" + sourceEntity.properties.slug);
  },
  properties: function (sourceEntity, context) {
    return {
      title: sourceEntity.properties.name,
      description: sourceEntity.properties.description,
      products: context
                  .reference("product")
                  .filter(`type eq 'product' and properties.categoryId eq '${sourceEntity.originId}'`)
    };
  }
}
```

</TabItem>

<TabItem value="json" label="JSON">

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
</Tabs>

## Top 3 product reviews

A schema for listing the 3 highest-rated product reviews.

<Tabs>
<TabItem value="js" label="JavaScript" default>

```js
/** @type {Enterspeed.FullSchema} */
export default {
  triggers: function(context) {
    context.triggers("cms", ["reviews"]);
  },
  properties: function (sourceEntity, context) {
    return {
      title: sourceEntity.properties.name,
      description: sourceEntity.properties.description,
      reviews: context
                .reference("review")
                .filter("type eq 'review' and properties.hashtags/any(t: t eq '#productreviews')")
                .orderBy({propertyName: "properties.rating", direction: "asc"})
                .limit(3)
    };
  }
}
```

</TabItem>

<TabItem value="json" label="JSON">

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
        "view": "review"
      }
    }
  }
}
```

</TabItem>
</Tabs>
