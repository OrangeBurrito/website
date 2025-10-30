---
title: "Reseating UI"
coverImage: '/images/reseatingui.png'
client: 'Hong Kong Express'
clientUrl: 'https://hkexpress.com'
contractor: 'Huagati Systems'
contractorUrl: 'https://huagati.com/'
startDate: 2025-06-01
description: ""
shortDesc: "Internal UI for Flight Reseating"
tags: ["dotnet", "blazor", "javascript", "figma" ]
color: "#011b47"
---

## Overview

I designed and built the frontend for Hong Kong Express's internal flight reseating management system (unreleased as of now) for my third collaboration with the airline software solutions company [Huagati Systems](https://huagati.com).

## Design

As the app is an internal seat management application, its naturally data-heavy, interactive nature required highly nested, interactive components to be displayed with relative usability for the Figma prototype.

In this case, many moving parts were built for the DataTable component, for displaying and editing said stateful data. Many visual cues for good UX were taken into consideration, such as consolidating multiple states into recognizable, color-coded icons.

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://embed.figma.com/proto/VQNP0tkMjF4uSW31sBsQtI/Reseating-UI?page-id=2%3A124&node-id=47-809&viewport=273%2C377%2C0.16&scaling=scale-down&content-scaling=fixed&starting-point-node-id=21%3A830&embed-host=share" allowfullscreen></iframe>

*Final Figma prototype of the Reseating Management site*

## Development

Implementation of the site also proved a unique experience, with components of a more interactive, ambitious nature.

One example was the DataTable component, a relatively complex component that was still performant with large amounts of data (thanks to Blazor-specific optimizations).

It had automatic integration with the backend data model's existing structure, with support for deep nesting, visual state managament, as well as filtering and search functionality. 