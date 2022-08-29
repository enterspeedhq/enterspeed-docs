---
sidebar_position: 8
title: Jobs
---

# Jobs

A job is an instruction that needs to be executed in order to synchronize data with Enterspeed.

A job contains information about what content from Umbraco, that needs to be handled, and how it should be handled (ie. Publish or Delete).

Jobs are stored in a custom table.

## Job lifecycle

When a content node in Umbraco is being published, unpublished, deleted or moved a new job will be added to the EnterspeedJobs table with the state of "Pending".

Immediately after the jobs have been created, they will be handled by the EnterspeedJobHandler, which is changing the state of the jobs to "Processing".

A job will then either be deleted if it could be handled without any errors, or set to "Failed" with the exception(s) that was thrown.

## Seeding jobs

In the Enterspeed Content dashboard located under Content in Umbraco, you have the possibility to Seed all your content.

When the button is clicked, all content will be queued up for publishing to Enterspeed.

This means that for each published content node (and variant) in Umbraco, there will be created a publishing job.

This will only create publishing jobs and not delete jobs.

## Old processing jobs

If a job has been in the state of "Processing" for more than 1 hour, the state of that job will automatically change to "Failed".

This is done to clean up jobs that, for some reason timed out while processing.

This is done by the InvalidateEnterspeedJobsHostedService background task.

## IEnterspeedJobHandler

The `IEnterspeedJobHandler` is responsible for deciding if it can support and process the requested job. The common process consists of fetching data from Umbraco, converting it to an `IEnterspeedEntity` and sending it to the Enterspeed Ingest API.

For each job that is being handled all previously failed jobs, for the same content node will be fetched and deleted, so we only have a maximum of 1 failed job per content node with the recent exception. If a previously failed job is handled with success, the failed job will also be deleted, since it's no longer failing.

To implement your own job handler you need to implement the `IEnterspeedJobHandler` interface.

### CanHandle

```csharp
bool CanHandle(EnterspeedJob job);
```

This method is called when the Enterspeed jobs handling service tries to find a proper handler for this job.

An implementation of this method could look like this:

```csharp
public bool CanHandle(EnterspeedJob job)
{
    return
        // Check if 'Main source/Publish' is configured
        _enterspeedConnectionProvider.GetConnection(ConnectionType.Publish) != null
        // Check if current job is for 'Content node'
        && job.EntityType == EnterspeedJobEntityType.Content
        // Check if content changes were published, rather than saved as draft
        && job.ContentState == EnterspeedContentState.Publish
        // Check if we want to Ingest, instead of deleting content
        && job.JobType == EnterspeedJobType.Publish;
}
```

### Handle

```csharp
void Handle(EnterspeedJob job);
```

This is the method that is responsible for processing job - lookup relevant Umbraco data, executing validation, mapping, and ingestion.

An implementation of this method could look like this:

```csharp
public void Handle(EnterspeedJob job)
{
    using (var context = _umbracoContextFactory.EnsureUmbracoContext())
    {
        var content = GetContent(job, context);
        if (!CanIngest(content, job))
        {
            return;
        }

        var umbracoData = CreateUmbracoContentEntity(content, job);
        Ingest(umbracoData, job);
    }
}
```

## Registering a job handler

Job handlers are registered in Umbraco via an [IComposer](https://our.umbraco.com/documentation/implementation/composing/).

Example:

```csharp
public class MyCustomJobHandlersComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.EnterspeedJobHandlers()
                .Append<MyCustomJobHandler>();
    }
}
```

Note that the Enterspeed jobs handling service will find the handlers in the order that they are registered, which means that if you want to replace some of the default handlers with your own, you need to insert your handler like this:

```csharp
public class MyCustomJobHandlersComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.EnterspeedJobHandlers()
            .InsertBefore<EnterspeedContentPublishingNotificationHandler, MyCustomJobHandler>();
    }
}
```

## Default job handlers

| Name                                             | Action          | Triggered by                      |
| ------------------------------------------------ | --------------- | --------------------------------- |
| EnterspeedContentPublishJobHandler               | Ingest - save   | Published content                 |
| EnterspeedContentDeleteJobHandler                | Ingest - delete | Trashed/unpublished content       |
| EnterspeedDictionaryItemPublishJobHandler        | Ingest - save   | Saved dictionary item             |
| EnterspeedDictionaryItemDeleteJobHandler         | Ingest - delete | Deleted dictionary item           |
| EnterspeedPreviewContentPublishJobHandler        | Ingest - save   | Saved draft content               |
| EnterspeedPreviewContentDeleteJobHandler         | Ingest - delete | Trashed/unpublished draft content |
| EnterspeedPreviewDictionaryItemPublishJobHandler | Ingest - save   | Saved dictionary item             |
| EnterspeedPreviewDictionaryItemDeleteJobHandler  | Ingest - delete | Deleted dictionary item           |

[Source code of Job handling related classes](https://github.com/enterspeedhq/enterspeed-source-umbraco-cms/tree/master/src/Enterspeed.Source.UmbracoCms.v10/Handlers)

## In case, of more customization

If, specifying new job handlers is not enough, or you want to change flow how job handlers are assigned and jobs are handled - [`IEnterspeedJobsHandler`](https://github.com/enterspeedhq/enterspeed-source-umbraco-cms/blob/master/src/Enterspeed.Source.UmbracoCms.v10/Handlers/EnterspeedJobsHandler.cs) is a good place to start.

### Inspiration:

- [Enterspeed.Contrib.Source.UmbracoCms.v10.RootDictionaryItem](https://github.com/elglogins/Enterspeed.Contrib.Source.UmbracoCms.v10.RootDictionaryItem)
- [Enterspeed.Contrib.Source.UmbracoCms.v10.GroupedDictionaries](https://github.com/elglogins/Enterspeed.Contrib.Source.UmbracoCms.v10.GroupedDictionaries)
