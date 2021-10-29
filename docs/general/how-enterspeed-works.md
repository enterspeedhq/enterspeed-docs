---
sidebar_position: 1
title: How Enterspeed works
---

# How Enterspeed works
Enterspeed is a SaaS solution that helps you gain speed and flexibility by decoupling and accelerating your backend and marketing systems from your front-end applications.

You can connect multiple data sources, be it CMS or PIM systems, into Enterspeed and serve it fast, efficiently, and globally to the front-end user.

Our low-code API designer makes it extremely simple to select (and combine) precisely the data you wish to be available via API.

Enterspeed is built on top of Redis and distributed geographically, which provides unmatched performance - without a proxy cache.

## The Enterspeed process
The Enterspeed process works via a three-step process, we call the **ITD**-process: 

1. **I**ngest data
2. **T**ransform data
3. **D**eliver data 

![The Enterspeed process](../../static/img/docs/general/the-enterspeed-process.png)

### Step 1 - Data gets ingested
In the first step, data gets ingested into Enterspeed from your current data source(s). This can be a CMS like Umbraco and a PIM system like Struct PIM.

We currently have integrations for multiple Umbraco versions and are currently working on integrations for more systems.

If there’s an integration you would like to see, feel free to drop us a mail at [support@enterspeed.com](mailto:support@enterspeed.com). We’re always happy to get suggestions and feedback.

### Step 2 - Data gets transformed and stored
When the data gets into Enterspeed it gets transformed according to the schema definitions you have defined.

What makes this step powerful, is you can combine data from multiple sources and select precisely the data you want to be available to the front-end.

Once the data is transformed it gets stored in a high-performance Redis database across multiple geographical regions.

### Step 3 - Data is delivered to the Front-end
The data is now available to fetch via the Enterspeed Delivery API.

Like working with any other APIs, it's extremely easy to integrate into your front-end project. 

We've made an example project, where we fetch data into a Next.js application. [You can view it right here.](https://github.com/enterspeedhq/enterspeed-demo-nextjs)

## Use cases
There are several use cases for Enterspeed. We've described four of them below.

### Multiple front-ends
Say you are a brand that has several sub-brands or product lines. You want each of them to be as strong and recognizable as possible, so you decide to create a separate microsite for each of them.

You don't want every microsite to look the same - since each sub-brand is unique. Furthermore, you don't want to add more CMS' which you have to maintain.

By using Enterspeed, you can design multiple, unique websites, using just a single CMS as your data source. 

Enterspeed lets you set up multiple environments with their own API key, so all sites are independent of each other. You select exactly which data you wish to use for each website, removing a lot of bloat from your API calls.

### Combining multiple data sources
Say you run a large retail store with thousands of SKUs. The product details are stored in a PIM system, the product description in a CMS, and the related how-to in yet another CMS.

This is not an uncommon scenario in an organization with multiple departments (Sales, Marketing, Support, etc).

Using Enterspeed we can combine all of these data sources in one fast and flexible solution.

The developer can get all the data they need, with just a single API call.

### Speeding up legacy systems
Say you are working in a company, which runs an old CMS. It may have been years since it was last updated. It runs on old technology, making it slow and a nightmare to optimize in regards to Core Web Vitals.

Switching to a newer version is unfortunately not as simple as pushing an update button. Updating it may very well break the entire and a new license may cost thousands of dollars.

Fear not, Enterspeed makes this a breeze. By seeding your content to Enterspeed you now have a 100% decoupled CMS. This enables you to make a blazing fast website, using exactly the technology you wish.

### Freedom of design for legacy systems
Say you work in a company, which runs a website with a very outdated design. You know what I'm talking about - it's not quite GIF-animations and ``<marquee>``-tags, but it's certainly not far from it.

The CMS' design options are very limited making it extremely difficult to make modern. You suggest switching to the latest and greatest CMS solution, but it's a hard sell to the company.

All the employees working on it, are already very familiar with the content editor, and getting all the content to a new CMS seems like an impossible task.

Enterspeed lets you have your cake and eat it too 🍰

Seeding the data automatically to Enterspeed, lets the content contributors keep their editor experience, while you get the flexibility to design the front-end however you want.