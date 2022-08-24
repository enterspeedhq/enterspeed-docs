---
slug: /faq
title: FAQ
---

# Frequently asked questions

### How do I do personalisation with Enterspeed?

Since everything in Enterspeed is generated on publish time, so that we can be high performing, any personalisation or dynamically generated content must be done in a custom backend-for-frontend layer. Imagine that you have a Umbraco node that has the following properties:

- `headerForAnonymousUser`
- `headerForLoggedInUserBoth`

Both properties will be available in the Delivery API response from Enterspeed. In the BFF layer, you need to handle first the authentication of the user and then choose which of the properties you want to output.

### How does Enterspeed handle updating content from shared content nodes/items?

A common scenario on a website is to have a frontpage that lists the 3 latest or highlighted news items. The news items are typically from other nodes. The most typical way of handling this in Enterspeed is by using Schema References.

Depending on your use case you either use a lookup to get the latest news items or read the originId from a content picker property to pass the id to the referenced schema. The referenced schema is then used for mapping out the source entity to the desired Enterspeed view.

When a news item is updated the Enterspeed system updates the view of the individual source entity and the Delivery API output then reads the updated view and produced one complete and updated response, e.g. the frontpage.

### How easy is it to enable the bulk deploy features on production "legacy" tenants?

It is not possible to enable, but we can assist with a migration. The behind-the-scenes changes are quite big and require changes for all schemas. While these changes are being done no processing can happen, so even though the changes are small and simple, the migration process for a production tenant is not straightforward, unfortunately!

The recommended migration path is to create a new tenant, copy over the schemas and then configure and update schemas in the new tenant. We can do the schema coping being the scenes, so there is no manual dummy work involved.
