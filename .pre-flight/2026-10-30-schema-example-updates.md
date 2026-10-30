# schema-example-updates — 2026-10-30

## Changed files

enterspeed/reference/schema-example-library/breadcrumb-navigation.mdx
enterspeed/reference/schema-example-library/latest-news.mdx
enterspeed/reference/schema-example-library/overview.mdx
enterspeed/reference/schema-example-library/strongly-typed-schemas.mdx

## Observations

1. The **Latest news** card in `overview.mdx` (lines 32–34) still says "filtered by category", but the example on `latest-news.mdx` now filters by culture and also covers an index schema approach. Is the card description still accurate, or is it worth updating?

2. The **Breadcrumb navigation** card in `overview.mdx` says "using references", and the page now focuses on resolving references at delivery time without reprocessing. Does the card still describe the page well enough, or is it worth mentioning the no-reprocessing angle?

3. `latest-news.mdx` line 36 says "To add new articles to the list, you need to reprocess the `frontPage` schema whenever a news article is updated or deleted". It covers new articles, then names only updates and deletions as triggers. Is "created" implied by "updated", or worth stating explicitly?
