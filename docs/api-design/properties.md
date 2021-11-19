---
sidebar_position: 3
---

# Properties

## string

```json title="Property type: string"
"title": "{properties.headline}"
```

```json title="Property type: string with value and default"
"title": {
  "type": "string",
  "value": "{properties.headline}",
  "default": "Unknown title"
}
```

## number

```json title="Property type: number"
"stock": {
  "type": "number",
  "value": "{variant.inventoryQuantity}"
}
```

## boolean

```json title="Property type: boolean"
"isPublished": {
  "type": "boolean",
  "value": "{properties.published}",
  "default": true
}
```

## array

Array property type is designed for working with collections.

| Property | Mandatory | Description                                                                                               |
| -------- | --------- | --------------------------------------------------------------------------------------------------------- |
| type     | true      | Constant value - array                                                                                    |
| input    | true      | States input, where to retrieve items collection to work with from. Support input types: `string` `$exp` `$lookup` |
| var      | false     | Collection iteration variable name. Default value is - item.                                              |

### `$exp` input

With expression input, you can reference the desired property on the source entity that is an array.

```json title="$exp input"
"tabs": {
  "type": "array",
  "input": "{properties.tabs}",
  "var": "tab",
  "items": {
    "type": "object",
    "properties": {
      "title": "{tab.title}",
      "content": "{tab.content}"
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
"navigationItems": {
   "type": "array",
   "input": {
      "$lookup": {
         "operator": "equals",
         "sourceEntityType": "*",
         "sourceEntityProperty": "originParentId",
         "matchValue": "{originId}",
         "orderBy": {
            "property": "properties.metaData.sortOrder",
            "sort": "asc"
         },
         "top": 5
      }
   },
   "items": {
      "type": "reference",
      "id": "{input.id}",
      "alias": "NavigationItem"
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
            "title": "{article.properties.title}",
            "content": "{article.properties.content}"
        }
    }
}
```

### Additional

Arrays have some additional properties available:

- `root`
    For schemas it will contain the source entity and for partial schemas the input.
    It is possible to access everything from the source entity like `root.originId` or `root.properties.headline`.
    All property values in `items` that supports expressions can access `root`.

    ```json
    "tabs": {
      "type": "array",
      "input": "{properties.tabs}",
      "var": "tab",
      "items": {
        "type": "object",
        "properties": {
          "title": "{root.properties.headline}: {tab.title}",
          "content": "{tab.content}"
        }
      }
    }
    ```

- `parent`
    If having multidimensional arrays `parent` can be used to access items of the parent array.
    For the first array `parent` will be equal to `root`. For the next levels `parent` will be equal to `item` of the parent array.
    All property values in `items` that supports expressions can use `parent`.

    ```json
    "tabs": {
      "type": "array",
      "input": "{properties.tabs}",
      "var": "tab",
      "items": {
        "type": "object",
        "properties": {
          "title": "{tab.title}",
          "content": "{tab.content}",
          "subTabs": {
            "type": "array",
            "input": "{tab.tabs}",
            "var": "subTab",
            "items": {
              "title": "{parent.title}: {subTab.title}",
              "content": "{subTab.content}",
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
    "title":  "{properties.title}",
    "content": "{properties.content}"
  }
}
```

## partial

The partial mapping property type allows for dynamically including partial schemas into the main schema. This is useful when you need to iterate an array of different objects that has an identifier, like an ID, alias or similar.

```json title="Property type: partial"
"blocks": {
  "type": "array",
  "input": "{properties.contentBlocks}",
  "items": {
    "type": "partial",
    "input": "{item}",
    "alias": "Block-{item.contentType}"
  }
}
```

The `input` defines what goes into the partial schema and the `alias` is used to resolve what partial schema to use. So in this case we could have partial schema with alias: Block-headline.

## reference

The reference property type is a bit different than string, number, boolean, etc.

This property types allows to reference other views created from either this Source Entity or from another source entity.

When referenced Enterspeed will resolve the view when requested by the Delivery API, so that the data will stay up-to-date.

In order to reference desired source entity, you can use `alias` of the schema and `id` or `originId` of the source entity.

```json title="Property type: reference (static value) with originId"
"seoData": {
  "type": "reference",
  "originId": "{originId}",
  "alias": "Seo"
}
```

```json title="Property type: reference (static value)"
"seoData": {
  "type": "reference",
  "id": "{id}",
  "alias": "Seo"
}
```

```json title="Property type: reference (dynamic value)"
"seoData": {
  "type": "reference",
  "id": "{id}",
  "alias": "{properties.seoAlias}"
}
```

The `alias` can either be a static value, like "Seo" or it can be a dynamic value being resolved from the Source Entity that is being processed by Enterspeed. This allows for supporting almost any use case.
