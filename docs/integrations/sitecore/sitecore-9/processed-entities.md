---
sidebar_position: 2
title: Processed entities
---

### Content

Content items that are being sent to Enterspeed, will have references to the renderings inserted on them, along with information of the fields of the given datasources inserted on these renderings.

Each rendering reference sent to Enterspeed could have these properties:

* ```name``` - the name of this rendering
* ```placeholder``` - the Sitecore placeholder inserted on either the presentation details or the rendering itself
* ```parameters``` - an array of key/values inserted on the rendering options
* ```datasource``` - a reference to the inserted datasource item

### Renderings

Renderings are processed separately, as well, but only if the rendering is inserted on the presentation details of a content item which resides in an enabled site. This means that newly created renderings are not processed until they're inserted to be rendered on content for which you have enabled.

### Supported field types

* Single-Line Text
* Rich-Text
* Checkbox
* Date
* File
* Image
* Integer
* Multi-Line Text
* Number
* Checklist
* Droplist
* Grouped Droplink
* Grouped Droplist
* Multilist
* Name Value List
* Name Lookup Value List
* Treelist
* Droplink
* Droptree
* General Link

### Field names in Enterspeed

Field names on your content are sanitized when sent to Enterspeed. See below example:

* Content
  * Title
  * Text
  * CTA Link
* Footer
  * Contact Link
  * Text

The above sections and fields will be sanitized like this - see below:

* ```content_title```
* ```content_text```
* ```content_ctalink```
* ```footer_contactlink```
* ```footer_text```
