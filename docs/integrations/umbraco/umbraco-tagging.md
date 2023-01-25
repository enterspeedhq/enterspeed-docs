---
sidebar_position: 30
title: Tagging in Umbraco
---

# Tagging in Umbraco

The following article describes an example of tagging implementation for content in Umbraco, and how to filter source entities by tag in Enterspeed.

As an example, we are going to build a basic news portal about sports, named "Sports Central".

## Content preparation in Umbraco

In order to build the site's content structure and filter it in Enterspeed, we have to do some groundwork as - creating document types, data types and adding some articles as content.

![Umbraco Content Structure](/img/docs/integrations/umbraco/umbraco-v8-site-content-structure.png)

## Document types

### Article

Used for article content nodes themselves, with the following properties:

| Property    | Data type   | Description                            |
| ----------- | ----------- | -------------------------------------- |
| title       | Textstring  | Title for the article                  |
| subheader   | Textstring  | Subheader for the article              |
| publishedAt | DatePicker  | Published display date for the article |
| tags        | Tags Picker | Related tags for the article           |

### Period Group

Is a document type without any properties, in the content tree, it will be used a grouping folder for articles per month, e.g. 09/2021.

### Articles

Is a document type for grouping all 'Period group' content nodes.

### Settings

Document type contains various settings for the site and different data types.

### Tags

Used as container node for listing all possible tags underneath it in the content tree.

### Tag

Tag, that can be news article can be associated with.

### Articles By Tag

Is an _Element Type_ document type, describing a block for displaying articles by a specific tag. Will be used on the front page of the site.

| Property | Data type         | Description                                                      |
| -------- | ----------------- | ---------------------------------------------------------------- |
| title    | Textstring        | Title used for the block, f.x. - _'Latest from football world'._ |
| tag      | Single Tag Picker | A tag that you want to include articles for.                     |
| top      | Numeric           | Define how many articles you want to see.                        |

### Site

Document type representing site instance.

| Property | Data type            | Description                                                                                        |
| -------- | -------------------- | -------------------------------------------------------------------------------------------------- |
| blocks   | Frontpage Block List | Our front page will consist of different blocks as - articles by tag, and potentially many others. |

## Data types

### Single Tag Picker

Is a data type extending Umbraco default 'Content Picker', where we specify 'Tags' content node as a start node.

### Frontpage Block List

Is a data type extending Umbraco default 'Block List', where we add a single available block - 'Articles By Tag', that we have created previously as part of Document types.

## Adding blocks to frontpage

On the site node, we are going to add some blocks for displaying articles by different tags.

![Umbraco blocks](/img/docs/integrations/umbraco/umbraco-v8-blocks.png)

Each of them configured with their own criteria for display of articles:

![Umbraco blocks Content](/img/docs/integrations/umbraco/umbraco-v8-blocks-content.png)

![Umbraco blocks Content basketball](/img/docs/integrations/umbraco/umbraco-v8-blocks-content-basketball.png)

## Defining schemas in Enterspeed

### Creating a Site schema

Site schema will work with source entities of type - 'site' since those are the ones where we have defined our blocks (in Umbraco) to describe what blocks we want to display.

This schema doesn't contain much of the logic, its responsibility is to iterate over blocks defined on the source entity and pass each of the blocks in partial view, with matching name.

```json
{
  "route": {
    "url": "{url}"
  },
  "triggers": {
    "umbraco": ["site"]
  },
  "properties": {
    "blocks": {
      "type": "array",
      "input": "{p.blocks}",
      "items": {
        "type": "partial",
        "input": "{item}",
        "alias": "Block-{item.contentType}"
      }
    }
  }
}
```

The only tricky part to remember is that now we have defined an alias match for partial schema view, where `'item.contentType'` value is an alias of our current block Element document type in Umbraco - `'articlesByTag'`.

## Creating a partial schema - Articles By Tag Block

We are halfway through. The previous schema iterated through blocks, this schema will handle a specific type of block - `Block-articlesByTag`.

As result, we want to display the following properties - `alias` and `title` of this block and collection of `articles` matching criteria defined on this block along with basic information about them - `title`, `subheader`, `publishedAt` date and a list of `tags` associated.

```json
{
  "alias": "Block-articlesByTag",
  "properties": {
    "alias": "{item.contentType}",
    "title": "{item.content.title}",
    "articles": {
      "type": "array",
      "input": {
        "$lookup": {
          "filter": "type eq 'article' and properties.tags/any(t: t.id eq '{item.content.tag}')",
          "top": "{item.content.top}",
          "orderBy": {
            "property": "p.publishedAt",
            "sort": "desc"
          }
        }
      },
      "items": {
        "type": "object",
        "properties": {
          "title": "{item.p.title ?? item.p.metaData.name}",
          "subheader": "{item.p.subheader}",
          "publishedAt": "{item.p.publishedAt}",
          "tags": {
            "type": "array",
            "input": "{item.p.tags}",
            "var": "tag",
            "items": "{tag.name}"
          }
        }
      }
    }
  }
}
```

Notice how we are using `$lookup` in combination with `filter`, `top`, and `orderBy`. In simple words, we want to lookup all source entities that match our filter, meaning where the type of source entity is an article and it has a current block selected tag associated with it.

On our front page, we want to show the latest published news first. That is what we define in our sorting criteria for all filters found in source entities. Lastly, regarding lookup, we defined a limit on how many articles will be displayed for the current block.

## Outcome

After updating and deploying previously mentioned schemas and publishing all content data to Enterspeed, the outcome from the Delivery API would look like this:

```json
{
  "meta": {
    "status": 200,
    "redirect": null
  },
  "route": {
    "blocks": [
      {
        "alias": "articlesByTag",
        "title": "Hey Vancouver",
        "articles": [
          {
            "title": "Canucks camp notebook: Sporting new look, Boeser striving for consistency",
            "subheader": "Dan Murphy and Iain MacIntyre discuss the latest news surrounding Elias Pettersson and Quinn Hughes, as well as what's happening with Travis Hamonic",
            "publishedAt": "09/28/2021 00:00:00",
            "tags": ["Vancouver Canucks", "Ice hockey"]
          },
          {
            "title": "Canucks Sign Forward Jason Dickinson",
            "subheader": "...to a three-year contract",
            "publishedAt": "09/02/2021 00:00:00",
            "tags": ["Ice hockey", "Vancouver Canucks"]
          },
          {
            "title": "NHL expects full capacity in all cities except Vancouver and Montreal",
            "subheader": "",
            "publishedAt": "08/30/2021 00:00:00",
            "tags": ["Vancouver Canucks", "Ice hockey"]
          }
        ]
      },
      {
        "alias": "articlesByTag",
        "title": "What is happening in #basketball?",
        "articles": [
          {
            "title": "Position breakdown: Maximizing Porzingis a priority among big men",
            "subheader": "When you have one of the tallest players in the NBA, one with a rare skill set of inside and outside capabilities, it makes sense to maximize his assets.",
            "publishedAt": "09/27/2021 00:00:00",
            "tags": ["Basketball"]
          },
          {
            "title": "Will Kidd get the best out of Doncic?",
            "subheader": "The savvy former guard looks to bring his Hall of Fame expertise to Dallas.",
            "publishedAt": "09/14/2021 00:00:00",
            "tags": ["Basketball"]
          }
        ]
      }
    ]
  },
  "views": {}
}
```
