---
sidebar_position: 1
---

# Intro

A partial schema is a reusable component that can be used across multiple schemas, e.g. if you have repetitive logic or if you just want to seperate out some of the schema logic into smaller components. A partial schema does not generete views on it's own, instead the output is embedded in the schema wehere the partial schema i referenced.

```js title="JavaScript partial schema example"
/** @type {Enterspeed.PartialSchema} */
export default {
  properties: function (input, context) {
    return {
      seoTitle: input.seoTitle,
      seoDescription: input.seoDescription
    }
  }
}
```
