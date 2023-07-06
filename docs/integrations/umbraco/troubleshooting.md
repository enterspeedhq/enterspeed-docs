---
sidebar_position: 31
title: Troubleshooting
---

# Troubleshooting
A section of some of the common issues that might occour. 

### Ingest skipped if audit/notification pipeline is exisited by other extensions
If another pipeline is changing the audit event or breaking the notification flow, this could cause the Enterspeed Umbraco source package to skip the ingest, as we listen for specific notifications (PublishVariant, Publish, Move)

An example of this below

```csharp
    public class ContentEventsNotificationNotificationHandler : 
        INotificationAsyncHandler<ContentPublishingNotification>,
    { 
        public async Task HandleAsync(ContentPublishingNotification notification, CancellationToken cancellationToken)
        {
            // Prematurely exiting
            return;
        }
    }
```