---
sidebar_position: 12
title: Enterspeed Property Service
---

# Enterspeed property service

The Enterspeed property service has the role of mapping node data into usable objects for the data sources.

Our package already includes a default Enterspeed property service, that maps all properties including some meta-data that is present on all data sources. You can extend the meta-data, to include relevant data for your solution, on all data sources.
Examples could be site settings or domain name data.

## Custom Property Service

To extend the perperties or meta-data on sources, you would need to create your custom property service. This is easily done by inheriting the default property service. In this example, all default behavior of the `EnterspeedPropertyService` is preserved but grants us the option to extend meta-data.

As you can see, the `MapAdditionalProperties` and `MapAdditionalMetaData` can be overridden. Here you only need to add your logic and include your own property + data.
You can also override `MapAdditionalMediaProperties` and `MapAdditionalMediaMetaData` to extend media source entities. 

Note that we in this example are using `StringEnterspeedProperty`. You can choose between multiple property types.
(Array, boolean, number, object and so on.)

### Example

```csharp
public class CustomPropertyService : EnterspeedPropertyService
{
    public CustomPropertyService(EnterspeedPropertyValueConverterCollection converterCollection, IServiceProvider   serviceProvider) : base(converterCollection, serviceProvider)
    {
    }

    protected override void MapAdditionalProperties(Dictionary<string, IEnterspeedProperty> metaData, IPublishedContent content, string culture)
    {
        metaData.Add("mySpecialKey", new StringEnterspeedProperty("my value fetched from my business logic"));
    }

    protected override void MapAdditionalMediaProperties(Dictionary<string, IEnterspeedProperty> metaData, IPublishedContent content, string culture)
    {
        metaData.Add("mySpecialKey", new StringEnterspeedProperty("my value fetched from my business logic"));
    }

    protected override void MapAdditionalMetaData(Dictionary<string, IEnterspeedProperty> metaData, IPublishedContent content, string culture)
    {
        metaData.Add("mySpecialKey", new StringEnterspeedProperty("my value fetched from my business logic"));
    }

	// You can also set additional properties for media sources. 
	protected override void MapAdditionalMediaMetaData(Dictionary<string, IEnterspeedProperty> metaData, IPublishedContent content, string culture)
    {
        metaData.Add("mySpecialKey", new StringEnterspeedProperty("my value fetched from my business logic"));
    }
}
```

### Registering your new property service

The property service is registered in Umbraco via an [IComposer](https://our.umbraco.com/documentation/implementation/composing/). The `AddUnique` extension method replaces the normal property service and implements your own.

Example:

```csharp
public class MyCustomComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.AddUnique<IEnterspeedPropertyService, CustomPropertyService>(ServiceLifetime.Transient);
    }
}
```

You should now be able to see the data you have mapped, in the meta-data object of your data sources in Enterspeed.

```json
"metaData": {
	"name": "Tattoo",
	"culture": "en-us",
	"sortOrder": 0,
	"level": 3,
	"createDate": "2022-09-05T15.48.36",
	"updateDate": "2022-09-05T15.48.37",
	"nodePath": [
		"1097-en-us",
		"1098-en-us",
		"1099-en-us"
	],
	"mySpecialKey": "my value fetched from my business logic"  <------------------
}
```
