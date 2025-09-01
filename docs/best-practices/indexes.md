---
sidebar_position: 4
title: Indexes
---

# Indexes

### Only index the fields you need
Basicly, the more fields you index, the more space the index will take and the longer it takes to index all the items. It also impacts the performance when you query an index with a lot of fields.

In general, this means that you should index as few fields as possible.

As a rule of thumb you should not index more than 50 fields.

:::tip
You can use the schema [`alias` query feature](/api#tag/Query/operation/queryContentPost) to return views for presentation data as part of your query result so you only index the fields you need for filtering and sorting.
:::

### Prefer `keyword` over `text` (unless you need the power of the `text` type)
From the name of the types, it's easy to think that every time you need to index a string, you should use the `text` type.

However we also have the `keyword` type that also works on strings and it's important to know the difference.

#### text
When using the `text` type, the string value is analyzed when items are inserted into the index. This means it takes a bit longer to index and query the field, but it brings a lot of power as well.
When using `text` you can you match your filter on part of the value. It could be that you have a title on a blog post and you want the users to be able to find the blog post by typing only part of the title or maybe even if they don't type the title fully correct.

#### keyword
When using the `keyword` type, the string value is not analyzed but indexed as is. This makes it faster and suitable when you need to match your filter on the whole value, such as ids, email adresses, tags and so on.
Because `keyword` fields are faster it's also the best choice for fields you don't need to filter on, but only need to display on the frontend.