---
sidebar_position: 4
title: Culture and hostnames
---

# Culture and hostnames

## Domains for nodes that don't vary by culture

Nodes based on content types that don't allow _vary by culture_ will by default use the default language in Umbraco when trying to resolve the domain ([you can customize the logic needed](#customize-the-culture-logic)).

**Example**  
Your Umbraco installation has _en-US_ as the default language.

The node you are ingesting or one of its ancestors has the following setup for Culture and hostname.

| Domain                  | Culture |
| ----------------------- | ------- |
| https://enterspeed.com/ | en-US   |
| https://enterspeed.dk   | da-DK   |

If the node you are ingesting is based on a content type that does not allow _vary by culture_ it will use the default language and because of that use https://enterspeed.com/ as the domain when ingested into Enterspeed.

## Multiple domains per culture for the same site

For the moment Enterspeed can only handle one domain per culture in Culture and hostnames for each site node. If you have a multi-site Umbraco installation, with multiple sites nodes, you can have as many domains with the same culture as you want. This limitation is for scenarios where one site node has multiple domains with the same culture.

### Non-working Culture and Hostnames setup for the same site

This setup would not work as expected:

| Domain                  | Culture |
| ----------------------- | ------- |
| https://enterspeed.com/ | en-US   |
| https://enterspeed.dk   | en-US   |

It is expected that both URLs would serve the same content from Umbraco. In reality, only one of them would work in Enterspeed.

This is because Umbraco defaults to one of the domains when no current URI is available, and Enterspeed must have a single URL. As the integration just uses Umbracos built-in IPublishedContent.Url() method. This method chooses the best suitable URL by culture.

### Working Culture and Hostnames setup

This setup would work as expected:

| Domain                  | Culture |
| ----------------------- | ------- |
| https://enterspeed.com/ | en-US   |
| https://enterspeed.dk   | da-DK   |

This setup would give English content the https://enterspeed.com **domain** and the danish content the https://enterspeed.dk.

If you do require to have the same content and same language on multiple domains, you have to implement some logic on your frontend that handles that.

### Domains in Enterspeed

It is possible to add more domains in Enterspeed if you wish your content to be available on multiple domains.

## Changing Culture and hostnames

When you change a hostname in Culture and hostnames, you will manually have to re-seed the content into Enterspeed.

This is currently a manual step, so please bare with us while we figure out the best way to automate this.

## Customize the culture logic

If you want to customize the culture logic, eg. if you use another culture then the default culture for a specific site or node that does not vary by culture you can implement your own version of `UmbracoCultureProvider` either by implementing the `IUmbracoCultureProvider` interface or by extending the `UmbracoCultureProvider` class and override the methods you want to customize.

```csharp
public class CustomUmbracoCultureProvider : IUmbracoCultureProvider
{
    public IEnumerable<string> GetCulturesForCultureVariant(IContent content)
    {
        // My custom logic
    }

    public IEnumerable<string> GetCulturesForCultureVariant(IPublishedContent content)
    {
        // My custom logic
    }

    public string GetCultureForNonCultureVariant(IContent content)
    {
        // My custom logic
    }

    public string GetCultureForNonCultureVariant(IPublishedContent content)
    {
        // My custom logic
    }
}
```

### Registration

See examples of how to register your custom implementations [here](//docs/integrations/umbraco/enterspeed-value-converter.md#registering-a-converter).
