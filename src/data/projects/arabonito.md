---
title: 'Arabonito'
url: 'https://arabonito.arajet.com'
coverImage: "/images/arabonito.png"
coverIcon: "/images/arabonito-thumb.png"
client: 'Arajet Airlines'
clientUrl: 'https://arajet.com'
contractor: 'Huagati Systems'
contractorUrl: 'https://huagati.com/'
startDate: 2023-12-01
endDate: 2024-01-31
description: "Design and development of Arajet Airlines' Gift Card Program in Blazor Server"
shortDesc: "Gift Card Program"
tags: ["dotnet", "blazor", "javascript", "figma" ]
---

I designed and developed the frontend for Arajet's Gift Card Program [Arabonito](https://arabonito.arajet.com), while working as a subcontractor under [Huagati Systems](https://huagati.com).

Using a custom-built component library, I reapplied Arajet's existing brand identity to the frontend of their new e-commerce site, with a heavy focus on user experience.

## Design
After taking an overview of the existing bare-bones proof of concept built by Huagati, I began work on the design.

As Arajet had no existing style guide at the time, their website was my main visual reference when building out Arabonito's component library from scratch.

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://embed.figma.com/proto/QIoeOV2vw0gbdYuk7YEoZn/Arajet-Arabonito-Redesign?node-id=414-1607&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&embed-host=share" allowfullscreen></iframe>

*Final Figma prototype of the Arabonito site*

## Implementation
With the initial design approved by Arajet, implementation was under way, with continual adjustments based on feedback from the Arajet team.

A separate component library was built for use with the Arabonito project, as a *Razor Class Library*. A separate library allowed for modularity and consistency across the whole application.

It also allowed for reuse in future Arajet projects, especially in the unreleased [Arajet Referrals](/projects/referrals) site.

### Performance
As Arabonito is a front-facing e-commerce site, performance was of critical consideration during the development process, as it noticeably affects the user experience (which leads to higher bounce rates)

When performance issues arose, they were remeded with the assistance of tools like Chrome DevTools' Lighthouse, Blazor's built-in telemetry and general payload minification strategies.

## Pre-release
During the beta-testing phase of the software, quirks, bugs and vulnerabilities were squashed as the Arajet QA team detected them.

One particular vulnerability was related to the inherently sensitive nature of credit card input, and so the custom-made Input components were replaced in favor of plain HTML and JavaScript.