---
sidebar_position: 3
title: Schemas
---

# Schemas

### Make your reprocess actions as specific as possible
Reprocess actions can cause execessive processing, especially if you reprocess more than needed. This could result in a larger queue of jobs, and it will take longer for all your views to be updated.

Because of that, it's important to make your reprocess actions as precise as possible, by using `originId` or a precise `filter` so you only target the schemas and source entities you actually need to reprocess.

Read more about [reprocessing](/key-concepts/reprocessing.md).
