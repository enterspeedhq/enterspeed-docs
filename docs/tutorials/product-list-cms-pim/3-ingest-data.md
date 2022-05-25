---
sidebar_position: 2
title: 3. Ingest data
---

# Ingest data

Now for ingesting some data. As mentionened this is dummy data, so feel free to change it as you see fit. For an real-life solution an integration is of course required, you can see which we already have saving you the trouble.

[Integrations](https://docs.enterspeed.com/integrations)

First we want to create the _Product list_ that comes from the CMS and holds settings such as which URL it should be available at.

Use this snippet:

```json
{
  "type": "product-list",
  "url": "/product-list",
  "properties": {
    "headline": "Browse our categories",
    "lead": "We have headsets, retro cameras, cars, old school tapes and watches! If we don’t have it we will get it for you! You get a car, you get headset and you get a gameboy!"
  }
}
```
Then we need to create the PIM categories, you can create as many as you want. Here is one for your inspiration:

And here's some snippets:

```json
{
  "type": "PimCategory",
  "url": null,
  "properties": {
    "image": "headsets.jpg",
    "title": "Headsets",
    "lead": "We have headsets. Over-under-in-ear, noise canceling and whatever you like.",
    "button": "Your new headset"
  }
}
```

```json
{
  "type": "PimCategory",
  "url": null,
  "properties": {
    "image": "cameras.jpg",
    "title": "Retro cameras",
    "lead": "Digital is soo last year, keep your hands busy and your hipster level to the maximum.",
		"button": "Keep your hands busy"
  }
}
```

```json
{
  "type": "PimCategory",
  "url": null,
  "properties": {
    "image": "tape.jpg",
    "title": "Tapes",
    "lead": "We are not saying you are old, but if you remember these you probably want to buy a pencil to go with it.",
		"button": "Manually rewind"
  }
}
```

```json
{
  "type": "PimCategory",
  "url": null,
  "properties": {
    "image": "watches.jpg",
    "title": "Very clean watches",
    "lead": "The design of these are so clean, that Apple will be jealous (they actually get their inspiration from us).",
		"button": "Squeaky clean"
  }
}
```

```json
{
  "type": "PimCategory",
  "url": null,
  "properties": {
    "image": "car.jpg",
    "title": "Cars!",
    "lead": "You know cars? Like back in the day where you would get you daily workout, just by turning the steering wheel.",
		"button": "Just cars!"
  }
}
```

```json
{
  "type": "PimCategory",
  "url": null,
  "properties": {
    "image": "gameboy.jpg",
    "title": "Retro gaming consoles",
    "lead": "Everybody has these, if not they want one. With mediocre graphics and gameplay, this is a must.",
		"button": "Retro mediocre"
  }
}
```

Take a look at how to ingest data here: https://docs.enterspeed.com/api#tag/Ingest