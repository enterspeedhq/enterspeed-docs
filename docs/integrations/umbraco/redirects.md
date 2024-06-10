---
sidebar_position: 5
title: Redirects
---

# Redirects

## Umbraco Redirects

If you use the build-in Umbraco Redirect URL Management the redirects will be ingested into Enterspeed out of the box.

![Umbraco Content Structure](/img/docs/integrations/umbraco/umbraco-redirects.png)

## Custom Redirects

If you are using a 3. party redirect plugin in your Umbraco installation you can implement your own version of the `UmbracoRedirectsService` either by implementing the `IUmbracoRedirectsService` interface or by extending the `UmbracoRedirectsService` class and overriding the `GetRedirects`` method.

### Implementing interface

```csharp
public class CustomUmbracoRedirectsService : IUmbracoRedirectsService
{
    private readonly IRedirectUrlService _redirectUrlService;
    private readonly IUmbracoUrlService _umbracoUrlService;

    public CustomUmbracoRedirectsService(IRedirectUrlService redirectUrlService, IUmbracoUrlService umbracoUrlService)
    {
        _redirectUrlService = redirectUrlService;
        _umbracoUrlService = umbracoUrlService;
    }

    public virtual string[] GetRedirects(Guid contentKey, string culture)
    {
        // My custom logic
    }
}
```

### Overriding

```csharp
public class CustomUmbracoRedirectsService : UmbracoRedirectsService
{
    public CustomUmbracoRedirectsService(IRedirectUrlService redirectUrlService, IUmbracoUrlService umbracoUrlService)
        : base(redirectUrlService, umbracoUrlService)
    {
    }

    public override string[] GetRedirects(Guid contentKey, string culture)
    {
        var umbracoRedirects = base.GetRedirects(contentKey, culture);

        // logic for getting custom redirects

        return umbracoRedirects.Concat(customRedirects).ToArray();
    }
}
```

### Registration

See examples of how to register your custom implementations [here](/integrations/umbraco/service-registration#custom-service-registrations).
