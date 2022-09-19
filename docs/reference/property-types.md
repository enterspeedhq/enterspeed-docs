---
sidebar_position: 2
title: Property types
---

# Property types

| Property                | Description                                                                                                                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [String](#string)       | Basic string mapping. <br /><br />Accepts the following fields: `type` `value` `default` <br /><br />Note: `type` and `value` are required if you aren't using the shorthand - e.g. `"title": "{p.headline}"` |
| [Number](#number)       | Basic number or integer mapping. <br /><br />Required fields: `type` `value` <br /><br />Optional fields: `default`                                                                                           |
| [Boolean](#boolean)     | Basic boolean mapping. <br /><br />Required fields: `type` `value` <br /><br />Optional fields: `default`                                                                                                     |
| [Array](#array)         | Mapping of an array, defining the input to iterate and the items definition. <br /><br />Required fields: `type` `input` <br /><br />Optional fields: `items` `var`                                           |
| [Object](#object)       | Mapping of an object. <br /><br />Required fields: `type` `properties`                                                                                                                                        |
| [Reference](#reference) | Referencing another schema. <br /><br /> Required fields: `type` `alias` - use `id` **OR** `originId`                                                                                                         |
| [Partial](#partial)     | Referencing a partial schema to map the data into. <br /><br />Required fields: `type` `input` `alias`                                                                                                        |
| [Dynamic](#dynamic)     | Dynamic mapping using the [path selector](./path-selector). <br /><br />Required fields: `*`                                                                                                                  |

:::tip
There is no `Date` property type. But if you ingest your dates as strings in the following format `yyyy-MM-ddTHH:mm:ss`, you can still sort by date and the value can easily be parsed to Date on the client in javascript and other languages.
:::

## string

Basic string mapping.

Since string is the most commonly used property type you can access it without writing the `type` and `value` property. This is meant as syntactic sugar making it easier and quicker to work with.

### Fields

| Property  | Required? | Description                       |
| --------- | --------- | --------------------------------- |
| `type`    | **Yes**   | The property type - here `string` |
| `value`   | **Yes**   | The value of the property         |
| `default` | No        | The default value of the property |

### Examples

```json title="Property type: string"
"title": "{p.headline}"
```

```json title="Property type: string with value and default"
"title": {
  "type": "string",
  "value": "{p.headline}",
  "default": "Unknown title"
}
```

---

## number

Basic number or integer mapping.

### Fields

| Property  | Required? | Description                       |
| --------- | --------- | --------------------------------- |
| `type`    | **Yes**   | The property type - here `number` |
| `value`   | **Yes**   | The value of the property         |
| `default` | No        | The default value of the property |

### Examples

```json title="Property type: number"
"stock": {
  "type": "number",
  "value": "{p.inventoryQuantity}"
}
```

---

## boolean

Basic boolean mapping.

### Fields

| Property  | Required? | Description                        |
| --------- | --------- | ---------------------------------- |
| `type`    | **Yes**   | The property type - here `boolean` |
| `value`   | **Yes**   | The value of the property          |
| `default` | No        | The default value of the property  |

### Examples

```json title="Property type: boolean"
"isPublished": {
  "type": "boolean",
  "value": "{p.published}",
  "default": true
}
```

---

## array

Mapping of an array, defining the input to iterate and the items definition.

Array property type is designed for working with collections.

### Fields

| Property | Required? | Description                                                                                                        |
| -------- | --------- | ------------------------------------------------------------------------------------------------------------------ |
| `type`   | **Yes**   | property type - here `array`                                                                                       |
| `input`  | **Yes**   | States input, where to retrieve items collection to work with from. Support input types: `string` `$exp` `$lookup` |
| `items`  | No        | Used for mapping results.                                                                                          |
| `var`    | No        | Collection iteration variable name. Default value is - `item`.                                                     |

### `string` type

A simple example showing how to use a `string` type in `items`.

```json title="string simple example"
"categories": {
  "type": "array",
  "input": "{p.categories}",
  "items": {
    "type": "string",
    "value": "{item}"
  }
},
```

### `$exp` input

With expression input, you can reference the desired property on the source entity that is an array.

```json title="$exp input"
"tabs": {
  "type": "array",
  "input": "{p.tabs}",
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

### `$path` input

With path input, you can select the desired items on the source entity using the [path selector](./path-selector).

```json title="$path input"
"tabs": {
  "type": "array",
  "input": {
    "$path": "p.tabs[*]"
  },
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

Filter items:

```json title="$path input with filter"
"tabs": {
  "type": "array",
  "input": {
    "$path": "p.tabs[?(@.display==true)]"
  },
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

| Property             | Required? | Description                                                                                                                                                                                                                      |
| -------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| operator             | **Yes**   | The operator for the lookup. Supported operators: `equals` `contains`                                                                                                                                                            |
| sourceEntityProperty | **Yes**   | The property to match the value on                                                                                                                                                                                               |
| matchValue           | **Yes**   | The value to match the sourceEntityProperty                                                                                                                                                                                      |
| sourceEntityType     | No   | Type of source entity to use for lookup. Default value is include all entity types available - \*                                                                                                                                          |
| orderBy              | No        | Allows you to specify your desired sorting order                                                                                                                                                                                 |
| top                  | No        | Allows limiting the size of items collection. Can be a number, a number as a text, or an expression.                                                                                                                             |
| source               | No        | Allows you to define a different source as the property. The `source` should be equal to the desired source group alias, where you want to look for source entities.<br/><br/> If not defined, it uses the current source group. |

```json title="$lookup with a single property"
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

| Property | Required? | Description                                                                                                                                                                                                                      |
| -------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| filter   | **Yes**   | Your filtering criteria                                                                                                                                                                                                          |
| orderBy  | No        | Allows you to specify your desired sorting order                                                                                                                                                                                 |
| top      | No        | Allows limiting the size of items collection. Can be a number, a number as a text, or an expression.                                                                                                                             |
| source   | No        | Allows you to define a different source as the property. The `source` should be equal to the desired source group alias, where you want to look for source entities.<br/><br/> If not defined, it uses the current source group. |

**Examples of supported binary operators, expressions & lambda operators:**

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

// Contains specific tag with expression string value
properties.tags/any(t: t eq '{p.selectedTag}')

// Contains an articles that featured, matching constant boolean value
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
            "title": "{article.p.title}",
            "content": "{article.p.content}"
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
    "input": "{p.tabs}",
    "var": "tab",
    "items": {
      "type": "object",
      "properties": {
        "title": "{root.p.headline}: {tab.title}",
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
    "input": "{p.tabs}",
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

---

## object

Mapping of an object.

### Fields

| Property     | Required? | Description                       |
| ------------ | --------- | --------------------------------- |
| `type`       | **Yes**   | The property type - here `object` |
| `properties` | **Yes**   | The properties of the object      |

### Examples

```json title="Property type: object"
"item": {
  "type": "object",
  "properties": {
    "title":  "{p.title}",
    "content": "{p.content}"
  }
}
```

---

## reference

Referencing another schema.

The reference property type is a bit different than string, number, boolean, etc.

This property types allows referencing other views created from either this Source Entity or from another source entity.

When referenced Enterspeed will resolve the view when requested by the Delivery API, so that the data will stay up-to-date.

In order to reference desired source entity, you can use `alias` of the schema and `id` or `originId` of the source entity.

### Fields

| Property   | Required?    | Description                                                 |
| ---------- | ------------ | ----------------------------------------------------------- |
| `type`     | **Yes**      | The property type - here `alias`                            |
| `alias`    | **Yes**      | The alias of the schema you wish to reference               |
| `id`       | **Yes** / No | The id of the source entity. `originId` can be used instead |
| `originid` | **Yes** / No | The originId of the source entity. `id` can be used instead |

### Examples

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
  "alias": "{p.seoAlias}"
}
```

The `alias` can either be a static value, like "Seo" or it can be a dynamic value being resolved from the Source Entity that is being processed by Enterspeed. This allows for supporting almost any use case.

---

## partial

Referencing a partial schema to map the data into.

The partial mapping property type allows for dynamically including partial schemas into the main schema. This is useful when you need to iterate an array of different objects that has an identifier, like an ID, alias or similar.

### Fields

| Property | Required? | Description                                   |
| -------- | --------- | --------------------------------------------- |
| `type`   | **Yes**   | The property type - here `partial`            |
| `input`  | **Yes**   | Defines what goes into the partial schema     |
| `alias`  | **Yes**   | Is used to resolve what partial schema to use |

### Examples

```json title="Property type: partial"
"blocks": {
  "type": "array",
  "input": "{p.contentBlocks}",
  "items": {
    "type": "partial",
    "input": "{item}",
    "alias": "Block-{item.contentType}"
  }
}
```

The `input` defines what goes into the partial schema and the `alias` is used to resolve what partial schema to use. So in this case we could have partial schema with alias: Block-headline.

:::tip
If you want to pass the entire current source entity to input, you can use `{root}`.
:::

---

## dynamic

### Fields

| Property | Required? | Description                      |
| -------- | --------- | -------------------------------- |
| `*`      | **Yes**   | [Path selector](./path-selector) |

### Examples

```json title="Property type: dynamic"
"blocks": {
  "*": "p.contentBlocks"
}
```
