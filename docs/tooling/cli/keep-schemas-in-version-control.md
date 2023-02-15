---
sidebar_position: 3
title: Keep schemas in version control
---

import ReactPlayer from 'react-player/lazy'

# Keep schemas in version control

<!-- TODO the video will be changed to a new video about keeping schemas in version control -->
<!-- <ReactPlayer controls="true" url='https://www.youtube-nocookie.com/watch?v=KVPvNjcZLvc' /> -->

## Why would you have your schemas in version control

One of the prime benefits of having your schemas locally is that you will have the changes to your Enterspeed schemas as part of the version control history.

Let's imagine you are creating a new feature for your site.

By having your schemas in version control you will now get the full story of changes made to support this new feature, not only the code changes you did to your site but also the schema changes you did to support the new feature.

## Prepare your local environment

### 1. Install Enterspeed CLI

First, you must install the Enterspeed CLI. If you haven't worked with the CLI, take a look at the [Getting started guide](./getting-started.md).

The guide includes everything, incl. installation, authenticating and selecting the right tenant.

### 2. Clone schemas and deployment plan

If you already have a tenant with multiple schemas deployed to multiple environments you can clone these schemas and extract a deployment plan to your local machine.

If you are starting a new tenant, you can just skip this step.

#### Clone schemas

```
es-cli schema clone
```

This will clone all your schemas from Enterspeed to your local machine in a folder called `Schemas`.

#### Extract deployment plan

```
es-cli deployment extract -e [your environment name]
```

This will extract a deployment plan for the given environment. The deployment plan is a `json` file containing the schema alias and version number for all schemas deployed to the environment.

#### Push changes to your repository

You can now commit and push all your schemas and deployment plan to your repository and we are ready to start working with the schemas.

## Working with schema locally

### 3. Create a new schema or update an existing one

Let's say you start working on a new feature for your site.

Depending on your version control branch strategy, you might create a feature branch to keep changes isolated until ready for a PR or to be merged into the main branch.

Now you can make the code and schemas changes you need.

After creating or updating a schema use the following command to import the schema into Enterspeed.

```
es-cli schema import -a [schema alias]
```

:::tip
The import command will import the schema even if it's a new schema or an updated schema. This way you don't have to call either a create or save command.
:::

### 4. Testing schemas

Once you have imported a schema you want to test if the schema is working as expected.

You do that as normal by going to the schema in the Enterspeed app where you can test the schema against real source entities.

### 5. Deploying schemas

Now that you have tested your schema changes, it's time to deploy the schema.

You do that by running the `schema deploy` command

```
es-cli schema deploy [schema alias] -e [your environment name]
```

This will deploy the schema to the given environment which will start the processing and generate the views.

The deploy command will also update your local deployment plan to match the new version of the deployed schema.

This means that the deployment plan is always up to date and ready when you merge your change into the main branch where other developers can run a full deployment to update their own environment.

```
es-cli deployment deployment deploy -e [your environment name]
```

:::tip
The deployment plan can also be used to deploy the schemas in the correct version in a CD pipeline. [Use Enterspeed CLI in your release pipeline](https://www.youtube.com/watch?v=My_lXnAcbHg)
:::
