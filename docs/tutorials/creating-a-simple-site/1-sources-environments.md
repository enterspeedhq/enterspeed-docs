---
sidebar_position: 2
title: 1. Sources & Environments
---

# Sources & Environments in Enterspeed

Start by logging into Enterspeed: [https://app.enterspeed.com](https://app.enterspeed.com)

In this step, we're going to:

1. Create sources
2. Create and configure domains
3. Create environment clients

## Creating sources

Go to **Data sources** under _Settings_ and click the **Create group** button. This will open a modal that allows you to create a new source group. A source group can have multiple data sources attached, which each have its own unique API key.

:::info
We will be using [Postman](https://www.postman.com/) to ingest data into Enterspeed, which we will cover in the next step. Feel free to use an alternative like [Insomnia](https://insomnia.rest/), etc.
:::

Give your source a name (e.g. _Postman_) and select a type (e.g. _Tool_). Afterward, add a data source by giving it a name (e.g. _Postman development_) and select an environment (e.g. _Production_), then click the **Add** button. Lastly, click on the **Create** button.

![Create source Enterspeed](/img/docs/examples/create-source-group-postman.png)

An API key is now generated. Save the API key for now (e.g., in a Notepad document) – you'll need it in the next step. Don't worry, you can always access the key again under **Data sources**.

## Creating and configuring domains

Go to **Domains** under _Settings -> Environment settings_ and click the **Create** button. Give your domain a name (e.g. _DomainName.com_) and click on the **Create** button.

![Create domain](/img/docs/examples/create-domain.png)

:::info
**Domains** are used in Enterspeed as a way of filtering your data if you have multiple data sources. You can name it whatever you like, but we recommend using the same name as your domain name for ease of use.
:::

Afterward, click on the three dots next to the domain name and select **Edit hostnames**. Click **Create new** and insert the URL you're going to use for your new project.

![Create hostname](/img/docs/examples/create-hostname-8888.png)

:::tip
If you're working on your project locally, you can insert for instance _localhost:8888_.

If you're working on an environment like Netlify you can insert the site URL for instance *https://my-new-kickass-enterspeed-project.netlify.app*
:::

## Creating environment clients

Navigate to **Environment clients** under _Settings -> Environment settings_ and click the **Create** button. Give your environment client a name (e.g. _Frontend_) and select the **Environment** you just created. Afterward, click on the **Create** button.

![Create environment client Enterspeed](/img/docs/examples/create-environment-client-frontend.png)

Also save this API key for now (e.g., in a Notepad document) - we’re going to use it in our JavaScript application. Don't worry, you can always access the key again under **Environment clients**.

Now, next to your new environment client click on the three dots and select **Edit domains**. Select the domain you just created and click the “**Save changes**” button.

![Environment client Domains](/img/docs/examples/environment-client-domains-frontend.png)

Fantastic, next it's time to ingest some data into Enterspeed.
