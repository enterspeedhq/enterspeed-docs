---
sidebar_position: 1
sidebar_label: Schemas
---

# Schemas

The schemas define the API endpoint and data structure for your data. This is where decoupling is happening since you are specifying the new structure of your [source entities](/docs/key-concepts/source-entities.md) through schema mappings, and generating [views](/docs/key-concepts/views.md) based on these mappings.

### How?

A schema acts as a middleman, grabbing the data from the source entities and generating the view with a data structure that is based on the schema definitions.

[Views](/docs/key-concepts/views.md) are the result of the above, and what we receive as a response when calling the Enterspeed API.

Schema is key in setting up and defining API's, property mapping, [routes](/docs/key-concepts/routing.md), [actions](/docs/reference/fields.md#actions) and more.

## Important topics

[Schemas fields](/reference/fields#schema-fields)

[Referencing schemas](/docs/key-concepts/referencing-schemas.md)

[Actions](/docs/reference/fields.md#actions)

[Routing](/docs/key-concepts/routing.md)

[Partial schemas](/docs/key-concepts/partial-schemas.md)

[Reprocessing](/docs/key-concepts/reprocessing.md)

## Tutorials

[Schema snippets](/docs/reference/snippets.md)

[Designing a schema](/docs/transform/designing-a-schema.md)

[Multilevel navigation example](/docs/tutorials/multilevel-navigation/1-getting-started.md)

[Umbraco & Next.js example](/docs/tutorials/umbraco-nextjs/3-designing-your-apis.md)
