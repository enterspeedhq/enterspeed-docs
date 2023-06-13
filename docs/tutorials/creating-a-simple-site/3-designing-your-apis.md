---
sidebar_position: 4
title: 3. Designing your APIs
---

# Designing your APIs in Enterspeed

Now for the fun part - designing the APIs we're going to use. This will be the glue that ties our Sources and Environments together. We do this by setting up schemas.

You find the schema editor in Enterspeed under **Schemas** and **Partial schemas**.

:::info
Partial schemas will soon be moved into the list of full schemas, bringing all the benefits you know from full schemas like the testing before deployment, environment-specific deployments and versioning.
:::

![Create new schema](/img/docs/examples/create-new-schema.png)

The powerful thing about setting up schemas yourself is you get to decide precisely which data you need and how it gets structured.

## How does a schema work?

The schema is the way you design your API. Here you define which sources you want to use, how you should be able to fetch them, and which data you want available.

The sources you define will be transformed into individual **Generated Views** which are available to fetch via our Delivery API.

:::tip
**Generated views** are the views that are available via the Delivery API. **Source entities** get transformed into **Generated Views** using **Schemas**.
:::

Each time data changes (source entities) in the sources you have defined, a new View will be generated or an existing one updated.

## Designing the `Blog Post` schema

Let's take a look at how a schema can be structured. We'll look at the **Blog Post**-schema, which will be responsible for showing the individual blog posts.

Go to **Schemas** and create a new schema called _Blog Post_. Open the editor and follow the steps below.

:::info
The schemas use the JSON syntax. Curly brackets `{}` delimit the beginning and end of a JSON object, therefore there should be one on the very first (`{`) and the last line (`}`) of the schema.
:::

### Triggers

The first thing you need to define is your **triggers**. Triggers consist of one or more source groups, which contain one or more source entity types (the data your schema should use). You can find a list of all the Source Entity Types in the **Source entities** table in your Enterspeed-project under **Type**.

In our case, we have a source group called `postman` (note that we're using the **alias** of the source group and not the name).

```json title="blogPost schema -- triggers"
"triggers": {
  "postman": ["blogPost"]
}
```

### Route

Next, we need to define the **route** (how we should be able to fetch the data). We can do this by URL, Handle, or ID. For our blog posts URL makes the most sense.

```json title="blogPost schema -- route"
"route": {
  "url": "{url}"
}
```

### Actions

Next, we need to set up an action.

We're going to create a list of all the blog posts we have (we'll do this in the next schema). The reason we do this is to get the performance benefits of having a static (already generated) list, instead of having to do expensive lookups.

For this list to update, it needs to know _when_ to update.

When we ingested our blog posts we assigned each blog post an `originParentId`, which was our blog collection source.

In the actions below, we define that we want the schema which has the `originId` that is equal to the `originParentId`, to reprocess (generate a new view) each time data is updated in this schema.

```json title="blogPost schema -- actions"
"actions": [
  {
    "type": "process",
    "originId": "{originParentId}"
  }
]
```

### Properties

Lastly, but certainly not least, we need to define which data we want in our schema. We do this under **properties**.

For each object, we need to define both the type (string, array, etc.) and the value of it (what value in our source entity are we looking for).

:::tip
Since string is the most commonly used property type you can access it without writing the type and value property. This is meant as syntactic sugar making it easier and quicker to work with.

Example: `"title": "{p.headline}"`
:::

If we don't want to map all individual properties, we can also use [**dynamic mapping**](reference/property-types#dynamic), which automatically maps all available properties. This is exactly what we are going to do here since we are going to use all the available properties, and since they're already conveniently named.

Now all of our content will be available in the `content` object.

```json title="blogPost schema -- properties"
"properties": {
  "content": {
    "*": "p"
  }
}
```

:::tip
When designing your schema, use the **Source entities** button (found in the bottom right corner of the editor) to both test and view your Source entities.
:::

This is how the finished schema will look:

```json title="Blog Post schema -- finished result"
{
  "triggers": {
    "postman": ["blogPost"]
  },
  "route": {
    "url": "{url}"
  },
  "actions": [
    {
      "type": "process",
      "originId": "{originParentId}"
    }
  ],
  "properties": {
    "content": {
      "*": "p"
    }
  }
}
```

## Designing the `Blog list` schema

Now it's time to design the schema which contains a list of all our blog posts. Just like before, we start by defining the triggers.

### Triggers

Unlike what you may think, we're not going to use the `blogPost` source entity type, as our trigger, but rather the `blog` source entity type. The `blog` source entity type works as a parent for all our blog posts.

```json title="blogList schema -- triggers"
"triggers": {
  "postman": [
    "blog"
  ]
}
```

### Route

Now it's time to define how we want to fetch it. Since our list of blog posts can be used on multiple pages (The blog page itself, the homepage, "Latest posts"-widgets", etc.) we are going to fetch via a handle, which we call `blogList`.

```json title="blogList schema -- route"
"route": {
  "handles": [
    "blogList"
  ]
}
```

This schema doesn't need any actions, so we will go straight to defining how the data will look using **Properties**.

### Properties

There's a _bit_ more going on here than in the last schema, but don't be scared. It's really not that complicated once we look into it.

```json title="blogList schema -- properties"
"properties": {
  "content": {
    "type": "array",
    "input": {
      "$lookup": {
        "operator": "equals",
        "sourceEntityProperty": "originParentId",
        "matchValue": "{originId}"
      }
    },
    "items": {
      "type": "object",
      "properties": {
        "url": "{item.url}",
        "title": "{item.properties.title}",
        "thumbnail": "{item.properties.thumbnail}",
        "excerpt": "{item.properties.excerpt}",
        "date": "{item.properties.date}",
        "author": {
          "type": "object",
          "properties": {
            "name": "{item.properties.author.name}"
          }
        }
      }
    }
  }
}
```

Since we want our blog lists to be available via an array, we create an object called `content` and set the `type` to [`array`](/reference/property-types#array).

Next, we need to define where it should retrieve the items from. We do this in `input` using the [`$lookup`](/reference/property-types#lookup-input) input.

```json title="blogList schema -- properties: input"
"input": {
  "$lookup": {
    "operator": "equals",
    "sourceEntityProperty": "originParentId",
    "matchValue": "{originId}"
  }
}
```

The `$lookup` required three properties:

- `operator`: supports `equals` and `contains`
- `sourceEntityProperty`: The property to match the value on
- `matchValue`: The value to match the sourceEntityProperty

In our case, we want the `originParentId` (sourceEntityProperty) to be equal to `originId` (matchValue).

:::info
When we ingested the source entity used for this schema we gave it `originId` **`1`**:

```shell title="Blog collection (ingest)"
curl --location --request POST 'https://api.enterspeed.com/ingest/v2/1' 👈👀 \
--header 'X-Api-Key: YOUR-DATA-SOURCE-API-KEY' \
--header 'Content-Type: application/json' \
--data-raw '{
  "type": "blog",
  "url": "/blog"
}'
```

Now we tell our schema to look through all of our source entities and find the property called `originParentId`, which then should be `equal` to our `originId`. We defined the `originParentId` in the Blog post source entities we ingested:

```shell title="Blog post #1 (ingest)"
curl --location --request POST 'https://api.enterspeed.com/ingest/v2/2' \
--header 'X-Api-Key: YOUR-DATA-SOURCE-API-KEY' \
--header 'Content-Type: application/json' \
--data-raw '{
  "type": "blogPost",
  "url": "/5-key-web-performance-metrics-to-guide-your-seo",
  "originParentId": "1", 👈👀
  "properties": {
      "title": "5 Key Web Performance Metrics to Guide Your SEO",
      "featuredImage": "https://res.cloudinary.com/enterspeed/image/upload/v1660647408/Enterspeed%20demos/article-1.png",
      "date": "16/8 2022",
      "author": {
          "name": "Enterspeed Team"
      },
      "excerpt": "Lorem. ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilisi morbi tempus.",
      "content": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae elementum ipsum. Proin vitae faucibus enim, vel condimentum tortor. Nam feugiat fermentum orci, ut blandit tellus hendrerit ut. Sed at dui vel erat faucibus facilisis tincidunt ut metus. Maecenas consectetur ipsum et tempus venenatis. Morbi massa nulla, egestas vitae lacus eget, cursus finibus nisi. Aenean ultrices sem vitae varius tristique.</p><p>Sed quis turpis vel nisl tempus cursus. Donec id arcu ac massa blandit laoreet eu sed libero. Aliquam non erat vitae urna mollis rhoncus. Vivamus et urna et lectus scelerisque tincidunt. In hac habitasse platea dictumst. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nec nisl ligula. Curabitur tincidunt sapien ac massa tincidunt, et mattis risus gravida. Curabitur mollis, quam a iaculis porta, orci risus condimentum purus, et viverra tellus turpis vel magna. Aenean et nunc ac purus luctus pellentesque ut sed ex. Quisque interdum pulvinar eros vitae ornare. Suspendisse potenti. Aenean ac turpis at quam fermentum rhoncus in vitae enim. Quisque dignissim velit posuere, sagittis neque quis, consectetur tellus.</p><p>Nullam non aliquam mi. Praesent at metus posuere, pellentesque nisl in, fermentum dui. In ipsum nulla, varius id ipsum a, porta faucibus leo. Sed molestie turpis in tellus placerat, ut malesuada felis gravida. Suspendisse tempus lectus ut nunc tempor, at pellentesque sapien suscipit. Pellentesque porttitor urna at lectus sagittis, eu tempus nisl vulputate. Cras eleifend lectus erat, ut elementum sem cursus et. Vivamus elementum tortor vitae feugiat porta. Suspendisse potenti.</p><p>Aenean quis odio eu enim bibendum pellentesque eget ut mi. Donec nec justo lectus. Phasellus ac odio nec nulla laoreet elementum sed sed felis. Suspendisse a nunc vel neque lacinia commodo. Cras in mattis dolor, eget mollis lectus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras ut urna eget urna placerat vehicula non eget purus. Nullam placerat ac sapien ac scelerisque. Praesent vehicula semper est quis fermentum. Ut facilisis risus quis porttitor aliquet. Nunc dignissim felis mauris, at scelerisque arcu scelerisque ut. Mauris scelerisque et nulla vitae luctus. Duis placerat bibendum tellus, vel tincidunt mauris laoreet id. Etiam ac lectus pharetra, sagittis lorem non, suscipit magna. Etiam molestie augue bibendum vulputate semper. Donec ut vehicula ipsum.</p><p>Proin eleifend sem in urna maximus, id condimentum risus convallis. Aliquam erat volutpat. Proin et orci vel ligula feugiat tincidunt non sed justo. Duis lobortis mauris vel diam volutpat pellentesque. Cras ut accumsan dolor, sed aliquam risus. Maecenas tempor vitae sapien quis pellentesque. Suspendisse dictum feugiat lacus. Curabitur semper vel tortor vitae luctus. Morbi consectetur dignissim fermentum. Vestibulum dignissim elementum nunc, tempor ornare ante tristique vel. Cras euismod ac lectus vitae finibus. Nulla fringilla ac tortor mollis posuere. Donec dictum in justo non fermentum. In augue risus, auctor vitae ante quis, iaculis sagittis arcu. Integer pharetra, tellus non efficitur malesuada, metus nibh finibus tortor, nec fermentum elit nunc nec eros.</p><p>Nunc vitae fermentum tellus, a tempor odio. Etiam accumsan ultrices diam, tempor vehicula arcu lacinia et. Vivamus iaculis turpis ac erat condimentum venenatis. Quisque sagittis vel quam quis consequat. Etiam sollicitudin eget purus vel viverra. Pellentesque semper finibus nunc ac ultricies. Donec condimentum molestie ipsum aliquam feugiat. Proin ut rutrum nulla. Ut semper orci nec diam condimentum, non sodales turpis imperdiet. Ut venenatis nisl tempus rutrum convallis. Donec egestas dolor vitae lectus malesuada, vel blandit mauris pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eleifend condimentum dolor ac tristique. Nunc tincidunt neque quam, quis porta nulla sodales sit amet. Praesent ullamcorper elit sit amet eros vestibulum vestibulum. Cras eget volutpat lectus, id accumsan metus.</p><p>Ut euismod justo ut massa congue elementum quis ut nunc. Integer at eros vitae ligula vehicula sodales a sed metus. Vivamus sagittis sagittis mi. Vivamus aliquam tristique euismod. Praesent mauris purus, accumsan in est sit amet, hendrerit molestie nisl. Mauris sed porta ligula. Etiam vel dolor suscipit, ornare elit nec, gravida ligula. Pellentesque sed congue nibh. Suspendisse iaculis tristique dolor eu dictum. Fusce non nisi sit amet tortor porta eleifend. Nulla tincidunt tincidunt purus viverra elementum. Phasellus ornare ipsum nunc, in tempus augue consequat eget. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla laoreet vel justo ac euismod. Proin iaculis egestas magna, et euismod purus semper sed.</p><p>Suspendisse interdum sollicitudin dignissim. Mauris feugiat augue nec neque maximus, mattis facilisis est maximus. Nullam urna ligula, mattis vel lectus at, convallis blandit nisi. Quisque laoreet, lorem eget ornare euismod, tellus tortor pharetra nulla, ut pulvinar turpis lectus id nunc. Duis eu commodo leo, efficitur pulvinar turpis. In fermentum quam ante, eu iaculis quam dictum vitae. Ut accumsan sem sit amet dignissim sagittis. Ut at lobortis metus. Praesent non nulla nec massa laoreet lacinia sit amet ultricies diam. Ut leo mauris, commodo ac sem at, consectetur cursus elit. Etiam nec sollicitudin tortor. Vestibulum nec sodales tellus. Donec at sapien et massa imperdiet malesuada.</p><p>Aenean facilisis tincidunt nunc, at aliquet lectus mattis vel. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec consequat nulla id magna sollicitudin aliquam. Nam ornare lectus ut felis aliquam, ac lobortis enim suscipit. Vivamus ex sapien, tincidunt in nulla non, laoreet tempus nibh. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras aliquam at sem et egestas. Quisque aliquet odio nec aliquet porttitor. Cras vitae lacinia elit. Vivamus dictum tempor rhoncus. Phasellus et euismod lectus. Fusce tempus nec ligula vitae eleifend. Curabitur ut mollis nisi. Aenean arcu turpis, bibendum ac accumsan sit amet, lacinia non nulla. Mauris sagittis sodales magna ac porttitor. Donec non quam metus.</p><p>Phasellus imperdiet eleifend metus, eget facilisis lacus auctor sit amet. Donec facilisis, augue ut vehicula sodales, enim velit placerat leo, ac suscipit risus justo et ligula. Proin ante dolor, posuere sit amet cursus nec, mollis id metus. Mauris tortor ante, aliquet nec eros id, luctus venenatis felis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla in vehicula orci, et interdum turpis. Aenean eget lorem purus.</p>"
  }
}'
```

:::

Now that we have told our array _where_ to find the data, it's time to structure it (map the results). We do this in the `items` field.

```json title="blogList schema -- properties: items"
"items": {
  "type": "object",
  "properties": {
    "url": "{item.url}",
    "title": "{item.properties.title}",
    "thumbnail": "{item.properties.thumbnail}",
    "excerpt": "{item.properties.excerpt}",
    "date": "{item.properties.date}",
    "author": {
      "type": "object",
      "properties": {
        "name": "{item.properties.author.name}"
      }
    }
  }
}
```

Our data will be stored in an `object` which will consist of the following properties:

- url _(string)_
- title _(string)_
- thumbnail _(string)_
- excerpt _(string)_
- date _(string)_
- author _(object)_
  - name _(string)_

To access each of these values we use `item.` in front of each value.

This is how the finished schema will look:

```json title="blogList schema -- finished result"
{
  "triggers": {
    "postman": ["blog"]
  },
  "route": {
    "handles": ["blogList"]
  },
  "properties": {
    "content": {
      "type": "array",
      "input": {
        "$lookup": {
          "operator": "equals",
          "sourceEntityProperty": "originParentId",
          "matchValue": "{originId}"
        }
      },
      "items": {
        "type": "object",
        "properties": {
          "url": "{item.url}",
          "title": "{item.properties.title}",
          "thumbnail": "{item.properties.thumbnail}",
          "excerpt": "{item.properties.excerpt}",
          "date": "{item.properties.date}",
          "author": {
            "type": "object",
            "properties": {
              "name": "{item.properties.author.name}"
            }
          }
        }
      }
    }
  }
}
```

## Deploying the schemas

Now it's time to deploy the schemas. Deploying schemas will automatically generate views which will then be available in the Delivery API.

Click the **Deploy schemas** button in the top right corner.

This will open the deploy pane. Choose the environment you wish to deploy to (e.g. Production) and click the **Deploy 2 changes**-button.

![Deploying schemas](/img/docs/examples/bulk-deploy.png)

Once the schemas have been deployed you will be able to see the results in **Generated views**.

![Generated views](/img/docs/examples/generated-views.png)
