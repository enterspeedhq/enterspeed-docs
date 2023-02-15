---
sidebar_position: 4
title: Developer setup
---

import ReactPlayer from 'react-player/lazy'

# Developer setup

Having multiple developers working on the same project can cause some problems without the right setup. This is a general issue when having shared resources with distributed code bases.

Imagine you have a shared database on a project. First, you clone the code base and start making some changes to the code. These changes of cause only affect you as the changes are made locally. At some point, you might need to do some changes in the database schema to support the new code changes you made. And now the problems arise.

The changes you made to the shared database will affect all developers but only you have the code changes that work with the new database changes. This means that all other developers might not be able to run the project until you push the code changes.

The same is the case when working with a shared environment in Enterspeed.

## Use individual Enterspeed environments

The solution to the problem above is to have developer-specific environments.

If you create developer-specific environments, sources and environment clients for all developers on the project, you can deploy schema changes to your own specific environment and test the changes without affecting other developers.

Once your changes are ready, you can push them to the main branch (or create a pull request of cause 😀).

Now other developers can pull the changes and run a full deployment to their own environment to make sure they have deployed the latest changes and that all is working.

:::tip
See our guide on how to [Keep schemas in version control](./keep-schemas-in-version-control).
:::

## Use the Enterspeed CLI to create new environments

If you do decide to work with developer-specific environments, you will have to create a new environment every time a new developer joins the team.

This means that you will have to go to the Enterspeed app and create a new environment, a new source, a new environment client and a new domain with a hostname.  
Or you could create a simple script using the Enterspeed CLI.

The following PowerShell script will create all the required resources for you in one go.

```powershell
# User specific variables
$environmentName = 'developer specific environment name'
$hostname = 'developer specific hostname'
# Solution specific variables
$managementApiKey = 'your management api key'
$sourceGroupType = 'cms'
$sourceGroupId = 'the id of the source group'

# Create environment
$environmentResponse = & es-cli environment create -n $environmentName --apiKey $managementApiKey | ConvertFrom-Json

# Create source
$sourceResponse = & es-cli source create $sourceGroupId -n $environmentName -e $environmentResponse.IdValue -t sourceGroupType --apiKey $managementApiKey | ConvertFrom-Json

# Create domain
$domainResponse = & es-cli domain create -n $environmentName -h $hostname --apiKey $managementApiKey | ConvertFrom-Json

# Create environment client
$sourceResponse = & es-cli environment-client create -n $environmentName -e $environmentName --apiKey $managementApiKey | ConvertFrom-Json

# Update environment client with domain
$sourceResponse = & es-cli environment-client update $environmentName -d $environmentName --apiKey $managementApiKey | ConvertFrom-Json
```
