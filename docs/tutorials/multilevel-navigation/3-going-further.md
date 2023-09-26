---
sidebar_position: 2
title: 3. Going further
---

# Going further: Hamburger navigation

If you have a more than one level of items, the schema will cover that as well. E.g. if you need to create a hamburger navigation with deeper levels:

![Create source Enterspeed](/img/docs/examples/multilevel-navigation/cms-structure-multiple.png)

The schema will automatically include that in the output:

```json
{
  "meta": {
    "status": 200,
    "redirect": null,
    "missingViewReferences": []
  },
  "views": {
    "mainNavigation": {
      "children": [
        {
          "title": "Home",
          "children": []
        },
        {
          "title": "Books",
          "children": [
            {
              "title": "Book 1",
              "children": [
                {
                  "title": "Page 1",
                  "children": [
                    {
                      "title": "Paragraph 1",
                      "children": []
                    },
                    {
                      "title": "Paragraph 2",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "title": "Book 2",
              "children": []
            }
          ]
        }
      ]
    }
  }
}
```
