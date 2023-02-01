---
slug: /
title: Enterspeed Documentation
sidebar_label: Welcome
hide_table_of_contents: true
---

import {Card, CardContainer} from '../src/components/card';
import GettingStartedIcon from '../static/img/icons/circle-play-regular.png';
import IngestingDataIcon from '../static/img/icons/cloud-arrow-up-regular.png';
import TransformingIcon from '../static/img/icons/gears-regular.png';
import DeliveringDataIcon from '../static/img/icons/cloud-arrow-down-regular.png';
import KeyConceptsIcon from '../static/img/icons/lightbulb-on-regular.png';
import SchemaReferenceIcon from '../static/img/icons/book-open-cover-regular.png';
import ApiIcon from '../static/img/icons/code-regular.png';
import CliIcon from '../static/img/icons/terminal-regular.png';
import IntegrationsIcon from '../static/img/icons/plug-regular.png';
import TutorialsIcon from '../static/img/icons/chalkboard-user-regular.png';

# Documentation

**👋 Welcome to the Enterspeed documentation**

Enterspeed lets you sync all of your content from your CMS (_e.g. Umbraco Cloud_), PIM, etc to Enterspeed. This enables you to design a whole new front-end application, while still using data from your existing content system.

_Not familiar with Entespeed yet? Check out [Enterspeed.com](https://www.enterspeed.com/) for use cases and more._

## Browse categories

**🗺 Browse the documentation by categories**

<CardContainer>
    <Card title="Getting started" link="/getting-started" image={GettingStartedIcon} imageBg="gray-bg" imagePadding="32px" />
    <Card title="Ingesting data" link="/ingest" image={IngestingDataIcon} imageBg="gray-bg" imagePadding="32px" />
    <Card title="Transforming data" link="/transform" image={TransformingIcon} imageBg="gray-bg" imagePadding="32px"/>
    <Card title="Delivering data" link="/deliver" image={DeliveringDataIcon} imageBg="gray-bg" imagePadding="32px"/>
    <Card title="Key concepts" link="/key-concepts/overview" image={KeyConceptsIcon} imageBg="gray-bg" imagePadding="32px"/>
    <Card title="Schema reference" link="/reference/fields" image={SchemaReferenceIcon} imageBg="gray-bg"imagePadding="32px" />
    <Card title="API" link="/api" image={ApiIcon} imageBg="gray-bg" imagePadding="32px"/>
    <Card title="CLI" link="/tooling/cli/overview" image={CliIcon} imageBg="gray-bg" imagePadding="32px"/>
    <Card title="Integrations" link="/integrations" image={IntegrationsIcon} imageBg="gray-bg" imagePadding="32px"/>
    <Card title="Tutorials" link="/tutorials" image={TutorialsIcon} imageBg="gray-bg" imagePadding="32px"/>
</CardContainer>

## FAQ

**💭 Got a question? We might already have the answer!**

<details>
<summary>How do I do personalisation with Enterspeed?</summary>

Since everything in Enterspeed is generated on publish time, so that we can be high performing, any personalisation or dynamically generated content must be done in a custom backend-for-frontend layer. Imagine that you have a Umbraco node that has the following properties:

- `headerForAnonymousUser`
- `headerForLoggedInUserBoth`

Both properties will be available in the Delivery API response from Enterspeed. In the BFF layer, you need to handle first the authentication of the user and then choose which of the properties you want to output.

</details>

<details>
<summary>How does Enterspeed handle updating content from shared content nodes/items?</summary>

A common scenario on a website is to have a frontpage that lists the 3 latest or highlighted news items. The news items are typically from other nodes. The most typical way of handling this in Enterspeed is by using Schema References.

Depending on your use case you either use a lookup to get the latest news items or read the originId from a content picker property to pass the id to the referenced schema. The referenced schema is then used for mapping out the source entity to the desired Enterspeed view.

When a news item is updated the Enterspeed system updates the view of the individual source entity and the Delivery API output then reads the updated view and produced one complete and updated response, e.g. the frontpage.

</details>

<details>
<summary>How easy is it to enable the bulk deploy features on production "legacy" tenants?</summary>

It is not possible to enable, but we can assist with a migration. The behind-the-scenes changes are quite big and require changes for all schemas. While these changes are being done no processing can happen, so even though the changes are small and simple, the migration process for a production tenant is not straightforward, unfortunately!

The recommended migration path is to create a new tenant, copy over the schemas and then configure and update schemas in the new tenant. We can do the schema coping being the scenes, so there is no manual dummy work involved.

</details>

<details>
<summary>What does "No environment client configured to support domain name for source entity url /relative-url/" mean?</summary>

If you are using relative URLs (_e.g. /about-us/_) and are trying to test the schema by making a CURL request, you might have seen this error message.

The reason for this is that the URL doesn't have a domain that matches an environment client. Environment clients need to be able to match the URL in the source entity with the hostname provided for the environment client.

The best way to solve this is to use absolute URLs in your schema (_e.g. https://my-domain.com/about-us/_).

If you however want to use relative URLs, it can be done by adding a domain to your environment client with the hostname `root.tld`.

</details>

<details>
<summary>Does updating on a root node in Umbraco trigger a re-ingest of the entire sub-tree?</summary>

No. Changing a domain on a root node will not trigger a re-seed of the node and its descendants.

If you want to trigger a re-seed in Umbraco after changing the domain, the best option is to use the "Publish with descendants"-feature in Umbraco.

After updating the domain, click the node you changed the domain on and select "Publish with descendants". This will send the updates node and its descendants to Enterspeed.

</details>

## Support

**🙋 Didn't find what you were looking for? Don't worry, we're here to help**

If you have any questions, don't hesitate to contact us. You have several options, you can:

- Send us an email: [support@enterspeed.com](mailto:support@enterspeed.com)
- Submit a ticket: [Create a new ticket](https://support.enterspeed.com/support/tickets/new)
- Use our contact form: [Go to Enterspeed.com](https://www.enterspeed.com/contact)
- Chat with us: Click the icon in the bottom right corner.
