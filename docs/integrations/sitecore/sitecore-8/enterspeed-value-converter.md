---
sidebar_position: 11
title: Field Value Converter
---

# Enterspeed Field Value Converter
A field value converter is a class that will convert the input value from Sitecore into an [IEnterspeedProperty](https://github.com/enterspeedhq/enterspeed-sdk-dotnet/tree/master/documentation/entities/properties). To implement your own converter you need to implement the IEnterspeedPropertyValueConverter interface

## IEnterspeedFieldValueConverter
This interface contains two methods that need to be implemented

### IsConverter
```csharp
bool CanConvert(Field field);
```

This method is called when the EnterspeedPropertyService tries to find the proper converter for this property.

An implementation of this method could look like this:

```csharp
public bool CanConvert(Field field)
{
    return field != null && field.TypeKey.Equals("number", StringComparison.OrdinalIgnoreCase);
}
```

### Convert
```csharp
IEnterspeedProperty Convert(Item item, Field field, EnterspeedSiteInfo siteInfo, List<IEnterspeedFieldValueConverter> fieldValueConverters, EnterspeedSitecoreConfiguration configuration);
```

This is the method that is converting the Sitecore field to an IEnterspeedProperty.

An implementation of this method could look like this:

```csharp
public IEnterspeedProperty Convert(Item item, Field field, EnterspeedSiteInfo siteInfo, List<IEnterspeedFieldValueConverter>    fieldValueConverters, EnterspeedSitecoreConfiguration configuration)
{
    if (string.IsNullOrEmpty(field.Value))
    {
            return null;
    }

    var value = 0d;

    if (field.Value.Contains("."))
    {
        double.TryParse(field.Value, NumberStyles.Any, CultureInfo.InvariantCulture, out value);
    }
    else if (field.Value.Contains(","))
    {
        double.TryParse(field.Value, NumberStyles.Any, new CultureInfo("da-DK"), out value);
    }

    return new NumberEnterspeedProperty(_fieldService.GetFieldName(field), value);
}
```

## Registering a converter
Converters are registered in a service configurator. You can roll your own service configurator, and register your own converters in this.

Example:
```csharp
public class ServicesConfigurator : IServicesConfigurator
{
    public void Configure(IServiceCollection services)
    {
        services.AddSingleton<IEnterspeedFieldValueConverter, DefaultChecklistFieldValueConverter>();
    }
}
```

Note if you want to override a default converter, you would have to register your own configurator, after the default Enterspeed configurator. This can be done with a patch config file. 

Here is an example of the default configurator being set up in a config file.

```xml
<configuration xmlns:patch="http://www.sitecore.net/xmlconfig/" xmlns:role="http://www.sitecore.net/xmlconfig/role/">
    <sitecore>
        <services>
            <configurator type="Enterspeed.Source.SitecoreCms.V9.DependencyInjection.ServicesConfigurator, Enterspeed.Source.SitecoreCms.V9" />
        </services>
    </sitecore>
</configuration>
```

## Default converters
Enterspeed ships with [default property value converters](https://github.com/enterspeedhq/enterspeed-source-umbraco-cms/blob/master/documentation/enterspeed-value-converters/property-value-converters/defaults/README.md) for all the built-in property editors that Umbraco ships with out of the box.