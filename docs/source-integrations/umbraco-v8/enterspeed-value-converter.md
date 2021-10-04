---
sidebar_position: 11
title: Value Converter
---

# Enterspeed Value Converter
A property value converter is a class that will convert the input value from Umbraco into an [IEnterspeedProperty](https://github.com/enterspeedhq/enterspeed-sdk-dotnet/tree/master/documentation/entities/properties). To implement your own converter you need to implement the IEnterspeedPropertyValueConverter interface

## IEnterspeedPropertyValueConverter
This interface contains two methods that needs to be implemented

### IsConverter
```
bool IsConverter(IPublishedPropertyType propertyType);
```

This method is called when the EnterspeedPropertyService tries to find the proper converter for this property.

An implementation of this method could look like this:

```
public bool IsConverter(IPublishedPropertyType propertyType)
{
    return propertyType.EditorAlias.Equals("Umbraco.TextBox");
}
```

### Convert
```
IEnterspeedProperty Convert(IPublishedProperty property, string culture);
```

This is the method that is converting the Umbraco property to an IEnterspeedProperty.

An implementation of this method could look like this:

```
public IEnterspeedProperty Convert(IPublishedProperty property, string culture)
{
    var value = property.GetValue<string>(culture);
    return new StringEnterspeedProperty(property.Alias, value);
}
```

## Registering a converter
Converters are registered in Umbraco via an [IComposer](https://our.umbraco.com/documentation/implementation/composing/).

Example:
```
[RuntimeLevel(MinLevel = RuntimeLevel.Run)]
public class MyCustomerPropertyValueConverterComposer : IUserComposer
{
    composition.EnterspeedPropertyValueConverters()
                .Append<MyCustomPropertyValueConverter>();
}
```

Note that the EnterspeedPropertyService will find the converters in the order that they are registered, which means that if you want to replace a default converter with your own, you need to insert your converter like this:

```
[RuntimeLevel(MinLevel = RuntimeLevel.Run)]
public class MyCustomerPropertyValueConverterComposer : IUserComposer
{
    composition.EnterspeedPropertyValueConverters()
    .InsertBefore<DefaultTextboxPropertyValueConverter,MyCustomPropertyValueConverter>();
}
```

## Default converters
Enterspeed ships with [default property value converters](https://github.com/enterspeedhq/enterspeed-source-umbraco-cms/blob/master/documentation/enterspeed-value-converters/property-value-converters/defaults/README.md) for all the built-in property editors that Umbraco ships with out of the box.