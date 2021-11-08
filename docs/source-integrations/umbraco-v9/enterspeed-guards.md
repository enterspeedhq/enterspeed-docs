---
sidebar_position: 12
title: Guards
---

# Enterspeed guards
Guards are split by type - content or dictionary item, they serve the purpose of ensuring that data that is about to be ingested into Enterspeed, is successfully validated by predefined or your extended guard rules.

## Enterspeed content handling guard
Our package already includes a single guard - `ContentCultureUrlRequiredGuard`, that ensures that if content for publishing to Enterspeed has culture, it must also have a URL for that specific culture available.

To extend guards with your own one, you need to implement the `IEnterspeedContentHandlingGuard` interface.

### IEnterspeedContentHandlingGuard
```csharp
public interface IEnterspeedContentHandlingGuard
{
    /// <summary>
    /// Validates if content can be published.
    /// </summary>
    /// <param name="content">Content for publishing.</param>
    /// <param name="culture">Culture of content.</param>
    /// <returns>True or false, if is valid for publishing or not.</returns>
    bool CanPublish(IPublishedContent content, string culture);
}
```

### Registering a content handling guard
Guards are registered in Umbraco via an [IComposer](https://our.umbraco.com/documentation/implementation/composing/).

Example:
```csharp
public class MyCustomerGuardsComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.EnterspeedContentHandlingGuards()
                .Append<MyCustomContentHandlingGuard>();
    }
}
```

## Enterspeed dictionary item handling guard
To extend dictionary item guards with your own one, you need to implement the `IEnterspeedDictionaryItemHandlingGuard` interface.

### IEnterspeedDictionaryItemHandlingGuard
```csharp
public interface IEnterspeedDictionaryItemHandlingGuard
{
    /// <summary>
    /// Validates if dictionary item can be published.
    /// </summary>
    /// <param name="dictionaryItem">Dictionary item for publishing.</param>
    /// <param name="culture">Culture of dictionary item.</param>
    /// <returns>True or false, if is valid for publishing or not.</returns>
    bool CanPublish(IDictionaryItem dictionaryItem, string culture);
}
```

### Registering a dictionary item handling guard
Guards are registered in Umbraco via an [IComposer](https://our.umbraco.com/documentation/implementation/composing/).

Example:
```csharp
public class MyCustomerGuardsComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.EnterspeedDictionaryItemHandlingGuards()
                .Append<MyCustomDictionaryItemHandlingGuard>();
    }
}
```