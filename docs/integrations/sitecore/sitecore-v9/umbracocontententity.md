---
sidebar_position: 5
title: UmbracoContentEntity
---

# UmbracoContentEntity

The UmbracoContentEntity is the concrete Umbraco specific implementation of the [IEnterspeedEntity](https://github.com/enterspeedhq/enterspeed-sdk-dotnet/tree/master/documentation/entities).

## Implementation details

### Abstract

| Name       | Type                                    | Description                                                                 |
| ---------- | --------------------------------------- | --------------------------------------------------------------------------- |
| Id         | string                                  | Unique identifier ie. "1078-en-us"                                          |
| Type       | string                                  | ContentType alias                                                           |
| Url        | string                                  | The current URL of the content, either relative or absolute                 |
| Redirects  | string[]                                | Array of redirects for the node                                             |
| ParentId   | string                                  | Unique identifier of the parent ie. "1078-en-us"                            |
| Properties | Dictionary<string, [IEnterspeedProperty](https://github.com/enterspeedhq/enterspeed-sdk-dotnet/blob/master/documentation/entities/properties/README.md)> | Dictionary of property alias and value is the converted Enterspeed property |

### Example

```json
{
  "id": "1055-en-us",
  "type": "site",
  "parentId": "1054-en-us",
  "url": "https://example.com/about-us",
  "redirects": ["/about"],
  "properties": {
    "includeInNavigation": {
      "name": "includeInNavigation",
      "type": "boolean",
      "value": false
    },
    "title": {
      "name": "title",
      "type": "string",
      "value": "Home"
    },
    "metaData": {}
  }
}
```

### Meta data
To process Umbraco specific properties we have added a `metaData` object that contains:

| Name       | Type     | Description                                  |
|------------|----------|----------------------------------------------|
| culture    | string   | ie. en-us                                    |
| nodeName   | string   | Name of the node                             |
| createDate | string   | Date for when the node has been created      |
| updateDate | string   | Date for when the node has last been updated |
| nodePath   | string[] | Path to ancestor nodes in the tree           |
| sortOrder  | number   | What order the nodes are sorted in           |
| level      | number   | What level in the tree the node has          |

```json
{
  "properties": {
    "metaData": {
      "culture": {
        "name": "culture",
        "type": "string",
        "value": "en-US"
      },
      "nodeName": {
        "name": "nodeName",
        "type": "string",
        "value": "This is the name of a node"
      },
      "createDate": {
        "name": "createDate",
        "type": "string",
        "value": "09-12-2020T10:49:01:00"
      },
      "updateDate": {
        "name": "updateDate",
        "type": "string",
        "value": "10-12-2020T10:49:01:00"
      },
      "nodePath": {
        "name": "nodePath",
        "type": "array",
        "items": [
          {
            "name": null,
            "type": "number",
            "value": 1061,
            "precision": 0
          },
          {
            "name": null,
            "type": "number",
            "value": 1062,
            "precision": 0
          },
          {
            "name": null,
            "type": "number",
            "value": 1063,
            "precision": 0
          },
        ]
      },
      "sortOrder": {
          "name": "sortOrder",
          "type": "number",
          "value": 1,
          "precision": 0
      },
      "level": {
          "name": "level",
          "type": "number",
          "value": 1,
          "precision": 0
      },
    },
  }
}
```