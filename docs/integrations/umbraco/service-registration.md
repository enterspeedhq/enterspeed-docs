---
sidebar_position: 14
title: Service registration
---

# Service registration

In a default Umbraco installation all Enterspeed services will automatically be registered because of the call to `.AddComposers()` in the `ConfigureServices` method of the `Startup` class.

```csharp
public class Startup
{
    ...

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddUmbraco(_env, _config)
            .AddBackOffice()
            .AddWebsite()
            .AddDeliveryApi()
            .AddComposers()
            .Build();
    }

    ...
}
```

## Manual registration

If you, for what ever reason, have removed the `.AddComposers()` call and manually have registered the Umbraco services, you can register Enterspeed using the `.AddEnterspeed()` method.

```csharp
public class Startup
{
    ...

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddUmbraco(_env, _config)
            .AddBackOffice()
            .AddWebsite()
            .AddDeliveryApi()
            .AddEnterspeed()
            .Build();
    }

    ...
}
```