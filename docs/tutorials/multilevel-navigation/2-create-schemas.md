---
sidebar_position: 2
title: 2. Create schemas
---

# Create schemas

Now to the fun part: creating schemas and transforming our data into something we can use in the frontend app.

## Navigation Item schema

Go to Schemas and hit the Create button, use “Navigation Item“ as name. Navigate to the schema and replace the content with this snippet:

```js
/** @type {Enterspeed.FullSchema} */
export default {
  triggers: function(context) {
    context.triggers('umbraco', ['navigationItem'])
  },
  actions: function (sourceEntity, context) {
    context.reprocess('navigationItem').parent()
    context.reprocess('mainNavigation').parent()
  },
  properties: function (sourceEntity, context) {
    return {
      title: sourceEntity.properties.title,
      children: context.reference('navigationItem')
                          .children()
                          .orderBy({ 
                            propertyName: 'properties.metaData.sortOrder', 
                            direction: 'desc' 
                          })
    }
  }
}
```

_Save_ the draft and _deploy_ your schema.

**Actions**
The key part of the schema is actions:

```js
actions: function (sourceEntity, context) {
  context.reprocess('navigationItem').parent()
  context.reprocess('mainNavigation').parent()
}
```

In short this tells another schema to update if this one affected.

[Read more about actions](https://docs.enterspeed.com/reference/fields#actions)

## Navigation Group schema

Next we want to create a schema called “Main Navigation”, so hit that create button again.

Replace the content with this snippet:

```js
/** @type {Enterspeed.FullSchema} */
export default {
  triggers: function(context) {
    context.triggers('umbraco', ['mainNavigation'])
  },
  routes: function(sourceEntity, context) {
    context.handle('mainNavigation')
  },
  properties: function (sourceEntity, context) {
    return {
      children: context.reference('navigationItem')
                          .children()
                          .orderBy({ 
                            propertyName: 'properties.metaData.sortOrder', 
                            direction: 'desc' 
                          })
    }
  }
}
```

The key part here is reference for the children. This will make sure to resolve the view when referenced.

[Read more about reference](https://docs.enterspeed.com/reference/property-types#reference)

## Output

To make sure we get the output we are looking for, generate a curl request by testing your NavigationGroup entity (remember to include handle):

(replace “[your_environment_key]” with your key)

```curl
curl -L -X GET 'https://delivery.enterspeed.com/v2?handle=mainNavigation' -H 'X-Api-Key: [your_environment_key]'
```

You should get a response that looks like this:

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
              "children": []
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

Now you can go to your web app start creating your navigation!
