---
sidebar_position: 1
title: 1. Getting started
---

# Create a product list with data from your CMS and PIM

:::info
This is a how-to for working with multiple data sources in Enterspeed. In this example we have created a fictional case with data from your CMS and PIM.

We are assuming you are familiar with Enterspeed and will focus on transforming your data it using schemas so it fits a web app.
:::

**Prerequisites:**
- You have an Enterspeed user and is logged in
- You have created a tenant
- You have Postman, Insomnia og similar app installed
- You are comfortable getting and posting data

Let's dig into it!

## Case example

Let’s imagine we have a commerce website with a product listing page showing a combination of content from the PIM and CMS.

It could look like this:

![Product list mockup](/img/docs/examples/product-list-cms-pim/product-list-cms-pim-mockup.png)

Following this tutorial, you will end up having a complete setup with Enterspeed and an endpoint you can use in your app or Postman/Insomnia. For the sake of keeping things as simple as possible, we did not however include CMS and PIM setup, but rely on dummy data for this part.

Another way to see is with Storybook, you can take our demo repository for a spin here: https://enterspeed-next-storybook.netlify.app/

Next up, let's setup the basics in Enterspeed!