---
sidebar_position: 2
sidebar_label: Collection schemas
---

# Collection schemas

Collection schema is a schema that consists of items definition, that can be later retrieved in user defined slices in Delivery API.

A typical use case is when you want to retrieve slice of larger collection, instead of retrieving entire collection.

Collection schemas, only support view references, which guarantees latest available version of slice range matched items returned.

## Configure a collection schema
When using a collection schema, you are defining some of already familiar properties, such as - [triggers](/reference/js/triggers), and [routes](/reference/js/routes). Besides them, new property `items`, which requires you to define view references that you want to be included in the collection.

In the below example, we are defining a collection schema that includes all recipes, sorted by creation date, showing newest first.

## Example of a collection schema

```js title="Schema"
/** @type {Enterspeed.CollectionSchema} */
export default {
  triggers: function(context) {
    // ...
  },
  routes: function(sourceEntity, context) {
    context.handle(`recipes`)
  },
  items: function (sourceEntity, context) {
    return context.reference('recipeCard')
    .filter(`type eq 'recipe'`)
    .orderBy({propertyName: 'properties.createdAt', direction: 'desc'})
  }
}
```

## Example of usage in Delivery API
Examples of retrieving slices of collection items in [delivery API](/api#tag/Delivery)

By requesting `?handle=recipes`, you will get default slice size (of 10) of the first items in the collection.


```json
{
    "meta": {
        "status": 200,
        "redirect": null,
        "missingViewReferences": []
    },
    "views": {
        "articles": {
            "meta": {
                "total": 796
            },
            "items": [
                {
                    "name": "Mastering Homemade Pizza",
                    "thumbnail": "https://example.com/pizza-thumbnail.jpg",
                    "createdAt": "2023-11-30T09:33:51.954Z",
                    "description": "Discover the secrets to making perfect homemade pizza, from the dough to the toppings. Follow our step-by-step guide for a delightful pizza experience at home."
                },
                // ... 9 more
            ]
        }
    }
}
```

By knowing total size of collection, you can use it to implement pagination of your choice.

## Additional examples of usage in Delivery API

For these examples, lets use smaller data set, to simplify the example.

Example collection: `[A B C D E F G H I J]`

:::tip
The start index is inclusive.
:::

1. **Default Request**  
   - **Request:** `?handle=products`
   - **Description:** Fetches the first X items in ascending order from the collection. By default, X is 5.
   - **Result:** `[A, B, C, D, E]`

2. **Specified Number of Items**  
   - **Request:** `?handle=products(3)`
   - **Description:** Retrieves the first 3 items in ascending order.
   - **Result:** `[A, B, C]`

3. **Custom Start and Range**  
   - **Request:** `?handle=products(2,3)`
   - **Description:** Starts from the 2nd item and fetches the next 2 items in ascending order.
   - **Result:** `[B, C, D]`

4. **Fetching from the End**  
   - **Request:** `?handle=products(-3)`
   - **Description:** Retrieves the last 3 items in descending order.
   - **Result:** `[J, I, H]`

5. **Custom Reverse Start and Range**  
   - **Request:** `?handle=products(-2, 3)`
   - **Description:** Starts 2 items from the end and fetches the 2 preceding items in descending order.
   - **Result:** `[I, H, G]`

## Defaults
- By default, collection size is up to 100 items, can be increased per tenant basis. Please reach out to Enterspeed if needed.
- Default slice size during delivery request is 10.
- Maximum slice size during delivery request is 100.