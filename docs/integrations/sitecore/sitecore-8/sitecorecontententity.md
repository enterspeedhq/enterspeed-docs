---
sidebar_position: 5
title: SitecoreContentEntity
---

# SitecoreContentEntity

The SitecoreContentEntity is the concrete Sitecore specific implementation of the [IEnterspeedEntity](https://github.com/enterspeedhq/enterspeed-sdk-dotnet/tree/master/documentation/entities).

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
  "id": "e61ddc8e-90ad-4d31-bb00-024987a5f2d1",
  "type": "site",
  "parentId": "16841a71-fdec-4a7d-bc5c-f5d257d95206",
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
To process Sitecore specific properties we have added a `metaData` object that contains:

| Name       | Type     | Description                                  |
|------------|----------|----------------------------------------------|
| name    | string   | ie. en-us                                    |
| displayName   | string   | Name of the node                             |
| sitecoreId | string   | Date for when the node has been created      |
| language | string   | Date for when the node has last been updated |
| sortOrder   | string[] | Path to ancestor nodes in the tree           |
| level      | number   | What level in the tree the node has          |
| createDate      | number   | What level in the tree the node has          |
| updateDate      | number   | What level in the tree the node has          |
| updatedBy      | number   | What level in the tree the node has          |
| fullPath      | number   | What level in the tree the node has          |
| languages      | number   | What level in the tree the node has          |
| isAccessRestricted      | number   | What level in the tree the node has          |
| accessRestrictions      | number   | What level in the tree the node has          |

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