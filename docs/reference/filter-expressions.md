---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Filter Expressions

Filter expressions are used when doing lookups in JSON or JavaScript schemas.

Below is a list of examples of what you can do with the filter.

:::tip
If you are using JavaScript and your filter contains expressions, it's often easier to use string interpolation instead of string concatination. See [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#string_interpolation) .
:::

## Examples

Examples of supported binary operators & expressions:

<Tabs>
<TabItem value="js" label="JavaScript" default>

```javascript title="EQUALS operator"
// Property value equal to constant string value
originId eq '100'

// Property value equal to expressed string value
originId eq '${sourceEntity.properties.selectedOtherPageId}'

// Property value is null
originParentId eq null

// Property value equal to integer value
properties.price eq 9

// Property value equal to decimal value
properties.price eq 9.99

// Property value equal to boolean value (true/false)
properties.isFeatured eq true
```

</TabItem>

<TabItem value="json" label="JSON">

```javascript title="EQUALS operator"
// Property value equal to constant string value
originId eq '100'

// Property value equal to expressed string value
originId eq '{p.selectedOtherPageId}'

// Property value is null
originParentId eq null

// Property value equal to integer value
properties.price eq 9

// Property value equal to decimal value
properties.price eq 9.99

// Property value equal to boolean value (true/false)
properties.isFeatured eq true
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="js" label="JavaScript" default>

```javascript title="NOT EQUALS operator"
// Property value not equal to constant string value
originId ne '100'

// Property value not equal to expressed string value
originId ne '${sourceEntity.properties.selectedOtherPageId}'

// Property value is not null
originParentId ne null

// Property value not equal to integer value
properties.price ne 9

// Property value not equal to decimal value
properties.price ne 9.99

// Property value not equal to boolean value (true/false)
properties.isFeatured ne true
```

</TabItem>

<TabItem value="json" label="JSON">

```javascript title="NOT EQUALS operator"
// Property value not equal to constant string value
originId ne '100'

// Property value not equal to expressed string value
originId ne '{p.selectedOtherPageId}'

// Property value is not null
originParentId ne null

// Property value not equal to integer value
properties.price ne 9

// Property value not equal to decimal value
properties.price ne 9.99

// Property value not equal to boolean value (true/false)
properties.isFeatured ne true
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="js" label="JavaScript" default>

```javascript title="AND operator"
type eq 'article' and properties.isFeatured eq true
```

</TabItem>

<TabItem value="json" label="JSON">

```javascript title="AND operator"
type eq 'article' and properties.isFeatured eq true
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="js" label="JavaScript" default>

```javascript title="OR operator"
type eq 'article' or type eq 'contentPage'
```

</TabItem>

<TabItem value="json" label="JSON">

```javascript title="OR operator"
type eq 'article' or type eq 'contentPage'
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="js" label="JavaScript" default>

```javascript title="An array contains any matching value:"
// Contains specific redirect with constant string value
redirects/any(r: r eq '/old-page')

// Contains specific tags with expression string value
properties.tags/any(t: t eq '${sourceEntity.properties.selectedTag}')

// Contains articles that feature, matching constant boolean value
properties.articles/any(a: a.isFeatured eq true)
```

</TabItem>

<TabItem value="json" label="JSON">

```javascript title="An array contains any matching value:"
// Contains specific redirect with constant string value
redirects/any(r: r eq '/old-page')

// Contains specific tags with expression string value
properties.tags/any(t: t eq '{p.selectedTag}')

// Contains articles that feature, matching constant boolean value
properties.articles/any(a: a.isFeatured eq true)
```

</TabItem>
</Tabs>

:::info
Please note that our filter expressions only support one use of `any` per expression.  
E.g. `properties.tags/any(t: t eq 'tag1') or properties.tags/any(t: t eq 'tag2')` is not supported.
:::

<Tabs>
<TabItem value="js" label="JavaScript" default>

```javascript title="Check whether the element exists in this collection"
// Finds matches in predefined integers array
properties.favoriteId in (100, 200)

// Finds matches in predefined strings array
properties.color in ('blue', 'red', 'green')

// Finds matches in favorites selection (array of integers)
properties.favoriteId in (${sourceEntity.properties.favoriteIds})

// Finds matches in colors selection (array of strings)
properties.color in (${sourceEntity.properties.colors.map(c => `'${c}'`)})
```

</TabItem>

<TabItem value="json" label="JSON">

```javascript title="Check whether the element exists in this collection"
// Finds matches in predefined integers array
properties.favoriteId in (100, 200)

// Finds matches in predefined strings array
properties.color in ('blue', 'red', 'green')

// Finds matches in favorites selection (array of integers)
properties.favoriteId in {properties.favoriteIds}

// Finds matches in colors selection (array of strings)
properties.color in {properties.selectedColors}
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="js" label="JavaScript" default>

```js title="Full example"
export default {
  // ...
  properties: function (sourceEntity, context) {
    return {
        // ...
        sportArticles: context
                .reference('featuredSportArticle')
                .filter(`type eq 'article' and properties.tags/any(t: t eq '${sourceEntity.properties.tag}')`)
                .orderBy({ propertyName: 'properties.metaData.sortOrder', direction: "asc"})
                .limit(5)
    }
  },
};
```

</TabItem>

<TabItem value="json" label="JSON">

```json title="Full example"
"sportArticles": {
    "type": "array",
    "input": {
        "$lookup": {
            "filter": "type eq 'article' and properties.tags/any(t: t eq '{p.tag}')",
            "orderBy": {
              "property": "properties.metaData.sortOrder",
              "sort": "asc"
            },
            "top": 5
        }
    },
    "var": "article",
    "items": {
        "type": "object",
        "properties": {
            "title": "{article.p.title}",
            "content": "{article.p.content}"
        }
    }
}
```

</TabItem>
</Tabs>