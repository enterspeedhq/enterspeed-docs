---
sidebar_position: 5
---

# ✂️ Schema snippets

Below you'll find a collection of useful schema snippets. Use these as a starting point or inspiration when designing your next schema.

:::info

These snippets are meant as examples and are meant to be modified to fit your own data structure.

:::

## Map all source entity properties

A schema which dynamically maps all properties from your source entities to the `product`-object.

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

## Site settings

A schema containing essential site settings, here Site name, Logo and Login page link.

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

## SEO Composition

A schema for basic SEO settings, here meta title, meta description and meta robots (index/noindex and follow/nofollow).

This schema can be used in other schemas using the [reference type](../reference/property-types#reference) as you can see in the code below.

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

How the _SEO Composition schema_ will be used in another schema afterwards:

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

## Breadcrumb navigation

A schema for generating a [breadcrumb navigation](https://en.wikipedia.org/wiki/Breadcrumb_navigation).

This schema can be used in other schemas using the [reference type](../reference/property-types#reference) as you can see in the code below.

```json title="Breadcrumb item"
{
  "triggers": {
	  "cms": ["homePage",	"contentPage"]
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

How the _Breadcrumb item schema_ will be used in another schema afterwards:

```json title="_Breadcrumb item used in another schema"
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

## Category products

A schema for listing all the products related to a specific category.

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

## Top 3 product reviews

A schema for listing the 3 highest rated product reviews.

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
