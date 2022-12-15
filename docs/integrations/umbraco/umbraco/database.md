---
sidebar_position: 7
title: Database
---

# Database

## Tables

### EnterspeedJobs table

This table contains the jobs that need to be executed, in order to sync with Enterspeed.

| Name      | Type     | Description                             |
| --------- | -------- | --------------------------------------- |
| Id        | integer  | Unique identifier, auto increments      |
| ContentId | integer  | Id of the Umbraco node                  |
| Culture   | string   | Culture of the Umbraco node             |
| JobType   | integer  | 0 = Publish, 1 = Delete                 |
| JobState  | integer  | 0 = Pending, 1 = Processing, 2 = Failed |
| Exception | string   | Exception message if the job failed     |
| CreatedAt | datetime | Job creation date                       |
| UpdatedAt | datetime | Job updated at                          |
