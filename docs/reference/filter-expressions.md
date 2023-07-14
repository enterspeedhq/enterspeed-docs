---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BrowserOnly from '@docusaurus/BrowserOnly';

# Filter Expressions

Filter expressions are used when doing lookups in JSON or JavaScript schemas.

Below is a list of examples of what you can do with the filter.

## Examples

Examples of supported binary operators, expressions & lambda operators:

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

```javascript title="AND operator"
type eq 'article' and properties.isFeatured eq true
```

```javascript title="OR operator"
type eq 'article' or type eq 'contentPage'
```

```javascript title="An array contains any matching value:"
// Contains specific redirect with constant string value
redirects/any(r: r eq '/old-page')

// Contains specific tags with expression string value
properties.tags/any(t: t eq '{p.selectedTag}')

// Contains articles that feature, matching constant boolean value
properties.articles/any(a: a.isFeatured eq true)
```

```javascript title="Check whether the element exists in this collection"
// Finds matches in favorites selection (array of integers)
originId in {properties.favoriteIds}

// Finds matches in colors selection (array of strings)
properties.color in {properties.selectedColors}

// Finds matches in predefined integers array
originId in (100, 200)

// Finds matches in predefined strings array
properties.color in ('blue', 'red', 'green')
```


<BrowserOnly>
{() =>
<Tabs>
<TabItem value="json" label="JSON" default>

```json title="Lambda operator"
"sportArticles": {
    "type": "array",
    "input": {
        "$lookup": {
            "filter": "type eq 'article' and properties.tags/any(t: t eq 'sports')",
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

<TabItem value="js" label="JavaScript">

```js title="Lambda operator"
sportArticles: context
                .reference("featuredSportArticle")
                .filter("type eq 'article' and properties.tags/any(t: t eq 'sports')")
                .orderBy({ propertyName: 'properties.metaData.sortOrder', direction: "asc"})
                .limit(5);
```

</TabItem>
</Tabs>
}
</BrowserOnly>