---
sidebar_position: 11
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
    /// Validates if content can be ingested.
    /// </summary>
    /// <param name="content">Content for ingest.</param>
    /// <param name="culture">Culture of content.</param>
    /// <returns>True or false, if is valid for ingest or not.</returns>
    bool CanIngest(IPublishedContent content, string culture);
}
```

### Registering a content handling guard

Guards are registered in Umbraco via the [Composing](https://our.umbraco.com/documentation/implementation/composing/) functionality.

**Umbraco 9+**

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

**Umbraco 8**

```csharp
[RuntimeLevel(MinLevel = RuntimeLevel.Run)]
public class MyCustomerGuardsComposer : IUserComposer
{
    public void Compose(Composition composition)
    {
        composition.EnterspeedContentHandlingGuards()
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
    /// Validates if dictionary item can be ingested.
    /// </summary>
    /// <param name="dictionaryItem">Dictionary item for ingest.</param>
    /// <param name="culture">Culture of dictionary item.</param>
    /// <returns>True or false, if is valid for ingest or not.</returns>
    bool CanIngest(IDictionaryItem dictionaryItem, string culture);
}
```

### Registering a dictionary item handling guard

Guards are registered in Umbraco via the [Composing](https://our.umbraco.com/documentation/implementation/composing/) functionality.

**Umbraco 9+**

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

**Umbraco 8**

```csharp
[RuntimeLevel(MinLevel = RuntimeLevel.Run)]
public class MyCustomerGuardsComposer : IUserComposer
{
    public void Compose(Composition composition)
    {
        composition.EnterspeedDictionaryItemHandlingGuards()
            .Append<MyCustomDictionaryItemHandlingGuard>();
    }
}
```
