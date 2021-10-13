---
sidebar_position: 2
---

# Properties

## string

```json title="Property type: string"
"title": {
  "type": "string",
  "value": {
    "$exp": "{properties.headline}"
  }
}
```

## number

```json title="Property type: number"
"stock": {
  "type": "number",
  "value": {
    "$exp": "{variant.inventoryQuantity}"
  }
}
```

## boolean

```json title="Property type: boolean"
"isPublished": {
  "type": "boolean",
  "default": true,
  "value": {
    "$exp": "{properties.published}"
  }
}
```

## array

Array property type is designed for working with collections.

| Property | Mandatory | Description                                                                                               |
| -------- | --------- | --------------------------------------------------------------------------------------------------------- |
| type     | true      | Constant value - array                                                                                    |
| input    | true      | States input, where to retrieve items collection to work with from. Support input types: `$exp` `$lookup` |
| var      | false     | Collection iteration variable name. Default value is - item.                                              |

### `$exp` input

With expression input, you can reference the desired property on the source entity that is an array.

```json title="$exp input"
"tabs": {
  "type": "array",
  "input": {
    "$exp": "{properties.tabs}"
  },
  "var": "tab",
  "items": {
    "type": "object",
    "properties": {
      "title": {
        "type": "string",
        "value": {
          "$exp": "{tab.title}"
        }
      },
      "content": {
        "type": "string",
        "value": {
          "$exp": "{tab.content}"
        }
      }
    }
  }
}
```

### `$lookup` input

Lookup input comparing to $exp allows you to define query-like and criteria match source entities lookup conditions.

#### `$lookup` with single property value match

| Property             | Mandatory | Description                                                                                          |
| -------------------- | --------- | ---------------------------------------------------------------------------------------------------- |
| operator             | true      | The operator for the lookup. Supported operators: `equals` `contains`                                |
| sourceEntityType     | true      | Type of source entity to use for lookup. To include all entity types available use - \*              |
| sourceEntityProperty | true      | The property to match the value on                                                                   |
| matchValue           | true      | The value to match the sourceEntityProperty                                                          |
| orderBy              | false     | Allows you to specify your desired sorting order                                                     |
| top                  | false     | Allows limiting the size of items collection. Can be a number, a number as a text, or an expression. |

```json title="$lookup with single property"
"navigationItems":{
   "type":"array",
   "input":{
      "$lookup":{
         "operator":"equals",
         "sourceEntityType":"*",
         "sourceEntityProperty":"originParentId",
         "matchValue":{
            "$exp":"{originId}"
         },
         "orderBy":{
            "property":"properties.metaData.sortOrder",
            "sort":"asc"
         },
         "top":5
      }
   },
   "items":{
      "type":"reference",
      "gid":{
         "$exp":"{input.id}"
      },
      "view":"NavigationItem"
   }
}
```

#### `$lookup` with filter

Particular lookup filter type allows you to be more flexible with your matching criteria.

| Property | Mandatory | Description                                                                                          |
| -------- | --------- | ---------------------------------------------------------------------------------------------------- |
| filter   | true      | Your filtering criteria                                                                              |
| orderBy  | false     | Allows you to specify your desired sorting order                                                     |
| top      | false     | Allows limiting the size of items collection. Can be a number, a number as a text, or an expression. |

**Examples of supported binary operators:**

```javascript title="EQUALS operator"
// Property value equal to constant string value
originId eq '100'

// Property value equal to expressed string value
originId eq '{properties.selectedOtherPageId}'

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
originId ne '{properties.selectedOtherPageId}'

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

**Examples of supported lambda operators:**

```javascript title="An array contains any matching value:"
// Contains specific redirect with constant string value
redirects/any(r: r eq '/old-page')

// Contains specific tag with expression string value
properties.tags/any(t: t eq '{properties.selectedTag}')

// Contains an articles that featured, matching constant boolean value
properties.articles/any(a: a.isFeatured eq true)
```

```json title="Lambda operator"
"featuredSportArticles": {
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
            "title": {
                "type": "string",
                "value": {
                    "$exp": "{article.properties.title}"
                }
            },
            "content": {
                "type": "string",
                "value": {
                    "$exp": "{article.properties.content}"
                }
            }
        }
    }
}
```

## object
```json title="Property type: object"
"item": {
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "value": {
        "$exp": "{properties.title}"
      }
    },
    "content": {
      "type": "string",
      "value": {
        "$exp": "{properties.content}"
      }
    }
  }
}
```

## partial

The partial mapping property type allows for dynamically including partial schemas into the main schema. This is useful when you need to iterate an array of different objects that has an identifier, like an ID, alias or similar.

```json title="Property type: partial"
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
      "$exp": "Block-{item.contentType}"
    }
  }
}
```

The `input` defines what goes into the partial schema and the `viewHandle` is used to resolve what partial schema to use. So in this case we could have partial schema with viewHandle: Block-headline.

## reference
The reference property type is a bit different than string, number, boolean, etc. 

This property types allows to reference other views created from either this Source Entity or from another Source Entity. 

When referenced Enterspeed will resolve the view when requested by the Delivery API, so that the data will stay up-to-date.

```json title="Property type: reference (static value)"
"seoData": {
  "type": "reference",
  "gid": {
    "$exp": "{id}"
  },
  "view": "Seo"
}
```

```json title="Property type: reference (dynamic value)"
"seoData": {
  "type": "reference",
  "gid": {
    "$exp": "{id}"
  },
  "view": {
     "$exp": "{properties.seoAlias}"
  }
}
```

The `view` can either be a static value, like "Seo" or it can be a dynamic value being resolved from the Source Entity that is being processed by Enterspeed. This allows for supporting almost any use case. 