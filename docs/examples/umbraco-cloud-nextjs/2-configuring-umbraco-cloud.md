---
sidebar_position: 3
title: 2. Configuring Umbraco Cloud
---

# Configuring Umbraco Cloud
Sign into your Umbraco Cloud account and navigate to the backoffice.

## Installing the Enterspeed Umbraco package
In order to send data to Enterspeed, we need to install the Enterspeed Umbraco package. Go to the **Packages** tab in the top menu and search for **“Enterspeed Umbraco source integration”**. Select the package and hit install.

:::caution
For production setups, we recommend installing the NuGet package instead. You can find it here: [https://www.nuget.org/profiles/Enterspeed](https://www.nuget.org/profiles/Enterspeed) 
:::

Go to the **Settings** tab in the top menu and select **Enterspeed settings**.

![Umbraco Cloud Enterspeed Config](../../../static/img/docs/examples/umbraco-cloud-enterspeed-config.png)

1. Set the **Enterspeed endpoint** to [https://api.enterspeed.com/](https://api.enterspeed.com/)

2. Set your media domain (optional).

3. Insert your API key generated in the Enterspeed-app under “Sources”.

4. Test the connection and save configuration afterward.

Your data will now be synced to Enterspeed each time you publish content. 

:::tip
You can view synced data in Enterspeed by navigating to **Source Entities** and selecting your source (the name you provided when creating it) in the **Source** dropdown.
:::

## Configuring your hostname
Go to the **Content** tab and click the three dots next to **Home**. Click the **Do something else** button at the bottom and select **Culture and Hostnames**.

Insert the same domain name as the one you entered when you configured your **hostname** in Enterspeed.

![Umbraco Cloud Culture and Hostnames](../../../static/img/docs/examples/umbraco-cloud-culture-and-hostnames.png)

## Importing content from the demo project
If you wish, you can import the Umbraco content from our [demo project](https://enterspeed-demo-nextjs.netlify.app/).

Download the **[enterspeed-demo-umbraco-content.zip](https://github.com/enterspeedhq/enterspeed-demo-nextjs/blob/a3d4cf69b3384cea9669e59b388c75149542201f/example-data/umbraco-cloud/content/enterspeed-demo-umbraco-content.zip)**-file from our [Github-repo](https://github.com/enterspeedhq/enterspeed-demo-nextjs).

Click on the Packages tab and select "Install local" on the right-hand side. Then drag the zip file onto the page, or click to select it from the dialog.

Publish the site by navigating to the Content tab, and select the Home node.

Then click the arrow on the green "Save and Publish" button in the lower right corner, and select "Publish with descendants",

Check the "Include unpublished content items" option, and click the "Publish with descendants" button.

This will publish the entire site, and send the data to Enterspeed.


## Sending content to Enterspeed manually

When you click **Save and publish** in Umbraco, the content will automatically be sent to Enterspeed. There may be cases where you need to trigger it manually.

To send content manually to Enterspeed go to the **Content** tab in the top menu. Click the **Enterspeed content** tab and select **Seed**. 

To send published content to Enterspeed, click the **Seed** button. This will queue a transfer of all your Umbraco content to Enterspeed.

![Umbraco Cloud Seed Content](../../../static/img/docs/examples/umbraco-cloud-enterspeed-seed.png)