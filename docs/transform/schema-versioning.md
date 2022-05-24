---
sidebar_position: 5
sidebar_label: "Versioning"
---

# Schema versioning

Every schema in Enterspeed can have multiple versions, that can be deployed to different environments and sources. When a new schema is created it is assigned the default version number: `1`.

While working on schema, you can save the latest version as many times as you want, it will not affect any of the existing deployments. When you are happy with your schema and ready to move on, make sure your latest changes are saved, then you can proceed by clicking the **"Deploy schemas"**-button in the top right corner.

This will open a pane where you can see current active deployments per environment and deploy changes to your desired environment.

![Deploy schema](/img/docs/transform/deploy-schema.png)

## Terminology

- **Deployment** - a combination of Version and Environment (e.g. in the screenshot above, you can see 2 deployments). Only one version can be deployed per environment.
- **Delivery data** - data exposed in Delivery API (such as views, routes)
- **Locked version** - Schema version that is not latest, editing is disabled.

## FAQ

**How do I deploy?**  
In the deploy pane, you can choose the environment and version for it, which will be used for chosen sources.

**How do I unpublish my changes?**  
To unpublish a schema version, click the **"Unpublish"**-button next to the schema in the deploy pane.
![Unpublish schema button](/img/docs/transform/unpublish-button.png)

:::info
Deployment with no sources linked to it is a valid deployment state in Enterspeed, which results in no delivery data created.
:::

**When is the new version of schema created?**  
A new latest version is created on save action after you have deployed your previous latest version.

**Can I deploy old schema?**  
Yes, you can always pick an older version and deploy it.
