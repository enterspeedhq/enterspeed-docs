---
sidebar_position: 5
title: SitecoreContentEntity
---

# SitecoreContentEntity

The SitecoreContentEntity is the concrete Sitecore specific implementation of the [IEnterspeedEntity](https://github.com/enterspeedhq/enterspeed-sdk-dotnet/tree/master/documentation/entities).

## Implementation details

### Abstract

| Name       | Type                                                                                                                                                     | Description                                                                      |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Id         | string                                                                                                                                                   | Unique identifier ie. "e61ddc8e-90ad-4d31-bb00-024987a5f2d1"                     |
| Type       | string                                                                                                                                                   | ContentType alias                                                                |
| Url        | string                                                                                                                                                   | The current URL of the content, either relative or absolute                      |
| Redirects  | string[]                                                                                                                                                 | Array of redirects for the item                                                  |
| ParentId   | string                                                                                                                                                   | Unique identifier of the parent ie. "e61ddc8e-90ad-4d31-bb00-024987a5f2d1-en-us" |
| Properties | Dictionary<string, [IEnterspeedProperty](https://github.com/enterspeedhq/enterspeed-sdk-dotnet/blob/master/documentation/entities/properties/README.md)> | Dictionary of property alias and value is the converted Enterspeed property      |

### Example

```json
{
  "id": "e61ddc8e-90ad-4d31-bb00-024987a5f2d1",
  "type": "site",
  "parentId": "e61ddc8e-90ad-4d31-bb00-024987a5f2d1-en-us",
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

| Name               | Type                     | Description                                                              |
| ------------------ | ------------------------ | ------------------------------------------------------------------------ |
| name               | string                   | Name of the item                                                         |
| displayName        | string                   | DisplayName of the item                                                  |
| sitecoreId         | string                   | Id of the Sitecore Item                                                  |
| language           | string                   | ie. en-us                                                                |
| sortOrder          | number                   | What order the item is sorted in                                         |
| level              | number                   | What level in the tree the item is in                                    |
| createDate         | string                   | Date for when the item has been created                                  |
| updateDate         | string                   | Date for when the node has last been updated                             |
| updatedBy          | string                   | Name of the user that has updated the item                               |
| fullPath           | string[]                 | Ancestors id's                                                           |
| languages          | string[]                 | Langauge versions available                                              |
| isAccessRestricted | boolean                  | Value determining if the item is restricted for anonymous users/visitors |
| accessRestrictions | Dictionary<string, bool> | List of users and, and if they can read                                  |

```json
{
  "properties": {
      "metaData": {
          "name": "Name of the item",
          "displayName": "displayName of the item",
          "sitecoreId": "{0138AB78-5146-4A0C-82F5-DD2FB786C381}",
          "language": "en",
          "sortOrder": -463,
          "level": 4,
          "createDate": "2022-05-02T12:33:40",
          "updateDate": "2022-05-09T13:03:58",
          "updatedBy": "sitecore\\admin",
          "fullPath": [
            "984169440b16415e8a04d19ca522caed-en",
            "a5fb76a88b9341c19d9f7ec0f04c654b-en",
            "4228f830dbc64303ba22fbb5faae4af6-en",
            "92a5b6dec6474ee4bce685475d10a650-en",
            "0138ab7851464a0c82f5dd2fb786c381-en"
          ],
          "languages": [
            "sv-SE",
            "en"
          ],
          "isAccessRestricted": false,
          "accessRestrictions": []
        },
    }
}
```