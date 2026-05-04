---
sidebar_position: 2
---

# Triggers

The `triggers` method is where you define the source group and the types the schema should process.

You can add multiple triggers to a schema.

```js title="Triggers example"
triggers: function(context) {
    context.triggers('cms', ['contentPage', 'articlePage']);
    context.triggers('pim', ['product']);
}
```

# TriggersContext object

The `TriggersContext` object is passed into the `triggers` method and gives you access to a set of methods which is described below.

## Methods

| Method                | Description                                                                                                             |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| [triggers](#triggers-1) | Defines the source group and the source entity types the schema should process.                                         |

### triggers

Defines the source group and the source entity types the schema should process.

`triggers(sourceGroupAlias, sourceEntityTypes)`

#### Parameters

| Parameter            | Type         | Description                                                                                               |
| -------------------- | ------------ | --------------------------------------------------------------------------------------------------------- |
| `sourceGroupAlias`   | string       | The alias of the source group you want your schema to trigger on                                          |
| `sourceEntityTypes`  | string[]     | A list of source entity types you want your schema to trigger on                                          |

## Examples

```js title="example of triggers usage"
triggers: function(context) {
    context.triggers('cms', ['contentPage', 'articlePage']);
}
```

```js title="triggers can also be expressed as an arrow function expression to make it even more compact"
triggers: (context) => context.triggers('cms', ['contentPage', 'articlePage'])
```
