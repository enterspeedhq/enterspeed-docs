---
sidebar_position: 4
---

# Async / Await

:::info
JavaScript schemas are still currently preview. Contact us if you would like to try it out.
:::

When you create a new JavaScript schema, you may notice that some of the methods like [`properties`](/reference/js/properties) and `route` are marked as async.

This is because you have access to a `context` object with a set of methods like `getChildren`, `lookup`, `reference` and so on that returns a promise.

If you are not using any of these methods, you can remove the async keyword, or you can just leave it in.

:::tip
You can read more about async function on the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
:::
