---
sidebar_position: 2
---

# Setting up domains

Before you can start using Enterspeed, you need to add at least one domain and at least one accompanying hostname.

The domain is merely used as a way of grouping your hostnames, meaning you can call it whatever you wish. We of course recommend calling it something similar to your hostname, so you can keep track of it.

:::info
A **domain** in Enterspeed is a collection of **hostnames**. You should always have at least one hostname per domain.
:::

If you for instance had a site called `Tacomania.com`, the domain could be `Tacomania.com` and the hostname(s) could be:

- `tacomania.com`
- `blog.tacomania.com`
- `shop.tacomania.com`

:::tip
If you're just testing something out, you can add `root.tld` as your hostname - this will work as a wildcard hostname. We don't recommend using this in production.
:::

The domain(s) will be attached to your environment client, which is the "connection" between Enterspeed and your front-end. You will learn more about [environments](./environments) and [environment clients](./environment-clients) later on.

By linking the domain(s) to your environment client(s), you are able to filter the data based on hostname and only fetch the data which matches the provided hostname(s).

## Why the need for domains?

Domains are used as a way to ensure you always fetch the correct data.

Say you have ingested data from a multisite setup into Enterspeed. Now you have a lot of source entities (_you will learn more about these in the [Data sources](./data-sources) section_), which belong to separate "sub-sites". How do you fetch the correct data?

You do this by using domains.

Domains in Enterspeed are linked to Environment Clients. Each domain can have multiple hostnames under it.

When fetching data from your Environment client, only data from this specific domain will be fetched.

## Adding domains and hostnames

:::note
If you're using one of our Umbraco [integrations](../integrations), the domain and hostname will automatically be created based on what you have entered under _Culture and Hostnames_ in Umbraco.  
:::

Click the _Settings_-tab and then click the _Environment settings_-tab in the sidemenu. Scroll down to Domains and click the _Create_-button.

:::info
The domain name is only used as visual help. Data will be filtered using hostnames.
:::

Give your domain a name and click _Create_.

Click on the three dots (settings icon) next to the domain name and select _Edit hostnames_.

Click on the _Create_-button in the top right corner. Enter your hostname, e.g. `tacomania.com`. Click _Create_ and then click _Save_.

![Domains example](../../static/img/docs/getting-started/domains.png)
