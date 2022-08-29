---
sidebar_position: 9
title: Services
---

# Services

## EnterspeedPropertyService : IEnterspeedPropertyService

This service is used for converting a Umbraco property to an IEnterspeedProperty.

### Methods

```csharp
IDictionary<string, IEnterspeedProperty> GetProperties (IPublishedContent content, string culture = null);

IDictionary<string, IEnterspeedProperty> ConvertProperties (IEnumerable<IPublishedProperty> properties, string culture = null;
```

Both methods will find the correct registered Enterspeed Property Value Converter and convert the value to an [IEnterspeedProperty](https://github.com/enterspeedhq/enterspeed-sdk-dotnet/tree/master/documentation/entities/properties).

## EnterspeedGridEditorService : IEnterspeedGridEditorService

This service is used for converting a Umbraco grid editor value to an IEnterspeedProperty.

### Methods

```csharp
IEnterspeedProperty ConvertGridEditor(GridControl control, string culture = null)
```

This will find the correct registered Enterspeed Grid Editor Value Converter and convert the value to an [IEnterspeedProperty](https://github.com/enterspeedhq/enterspeed-sdk-dotnet/tree/master/documentation/entities/properties)
