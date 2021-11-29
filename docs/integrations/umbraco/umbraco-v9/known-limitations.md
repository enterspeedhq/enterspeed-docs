---
sidebar_position: 4
title: Known limitations
---

# Known limitations
This is a list of known limitations in the Enterspeed Umbraco integration.

## Multiple domains per culture for the same site
For the moment Enterspeed can only handle one domain per culture in Culture and hostnames for each site node. If you have a multi-site Umbraco installation, with multiple sites nodes, you can have as many domains with the same culture as you want. This limitation is for scenarios where the one site node has multiple domains with the same culture.

### Non-working Culture and Hostnames setup for the same site
This setup would not work as expected:

| Domain                  | Culture |
|-------------------------|---------|
| https://enterspeed.com/ | en-US   |
| https://enterspeed.dk   | en-US   |

It is expected that both URLs would serve the same content from Umbraco. In reality only one of them would work in Enterspeed.

This is because Umbraco defaults to one of the domains when no current uri is available, and as Enterspeed must have a single URL. As the integration just uses Umbracos built in IPublishedContent.Url() method. This method chooses the best suitable URL by culture.

### Working Culture and Hostnames setup
This setup would work as expected:

| Domain                  | Culture |
|-------------------------|---------|
| https://enterspeed.com/ | en-US   |
| https://enterspeed.dk   | da-DK   |

This setup would give english content the https://enterspeed.com **domain** and the danish content the https://enterspeed.dk.

If you do require to have the same content and same language on multiple domains, you have to implement some logic on your frontend that handles that.

### Domains in Enterspeed
It is possible to add more domains in Enterspeed, if you wish your content to be available on multiple domains.

## Changing Culture and hostnames
When you change a hostname in Culture and hostnames, you will manually have to re-seed the content into Enterspeed.

This is currently a manual step, so please bare with us while we figure out the best way to automate this.