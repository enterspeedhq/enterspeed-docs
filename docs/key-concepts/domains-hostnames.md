---
sidebar_position: 7
sidebar_label: Domains & hostnames
---

# Domains & hostnames

Domains and hostnames are used to route your delivery API requests to ensure the correct data is returned. This is especially important if you have a multiple-site setup.

## Environment clients

Environment clients are always linked to exactly one environment and provide an API key to be used in the delivery API request.

## Domains

Domains are site-specific and not Environment client specific. This means that an Environment client can have multiple domains as an Environment client can point to an environment with multiple sites. This could be the case if you, e.g. have a single CMS installation containing multiple sites.

![Environment clients and domains](/img/docs/key-concepts/environment-clients-and-domains.png)

:::info
Domains are site-specific and should only contain hostnames related to one specific site.
:::

## Hostnames

A domain can have multiple hostnames if the same site is available on multiple hostnames.

![Multiple hostnames pr domain](/img/docs/key-concepts/hostnames.png)

:::warning
Don't use the same domain for hostnames associated with different sites, as domains are site specific.

Using the same domain for hostnames associated with different sites can result in data from the wrong site being returned from the delivery API if two source entities have the same relative path.
:::

## Relative URL's

If you only have one site, you could skip the hostnames and use the relative URL's instead. This will, behind the scene, create a hostname with the value of `root.tld`, making it possible to use relative URL's when requesting the delivery API.

![Relative URL's](/img/docs/key-concepts/relative-urls.png)
