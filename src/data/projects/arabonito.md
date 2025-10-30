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

Using a custom-built component library, I reapplied Arajet's existing brand identity to the frontend of their new e-commerce site, while adhering to UI/UX best practices for performance and user retention.

## Design
After taking an an overview of the existing (unstyled) application built by Huagati, I began work on the design, drafting out initial designs with pen and paper before building out the official Figma mock-up.

As Arajet had no existing style guide at the time, their website was my main visual reference when building out Arabonito's component library from scratch, as well as establishing the site flow.

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://embed.figma.com/proto/QIoeOV2vw0gbdYuk7YEoZn/Arajet-Arabonito-Redesign?node-id=414-1607&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&embed-host=share" allowfullscreen></iframe>

*Final Figma prototype of the Arabonito site*

## Implementation
With the initial design approved by Arajet, impelementation was under way, with continual adjustments based on feedback from the Arajet team.

A separate component library was built for use with the Arabonito project, in the form of a Razor Class Library. The benefits of such an approach were in its modularity and consistency, as visuals and functionality retained identical behavior across the application. 

It also allowed for the reuse of said library in future Arajet projects, namely the as of yet-unreleased [Arajet Referrals](/projects/referrals) site.

### Quirks of Blazor
One of Blazor's strengths is in its inherent integration with .NET, which allows for much simpler connection with existing backend services.

As a developer working on the frontend side of Arabonito, when performance issues later became apparent, I addressed them as far as could be accomplished without modification to the preexisting backend system.

This was especially important as Arabonito is a front facing e-commerce site, and thus performance was a critical consideration during the development process (notably regarding loading times and bounce rates).

To remedy said performance issues, tools such as Chrome DevTools' Lighthouse, Blazor's built-in telemetry and general payload minification strategies were applied, to improved results.

> **Performance Limitations:** A server running a *Blazor Server* instance must maintain individual SignalR connections for each visiting user, thus requiring the hardware to scale horizontally to keep up with a growing user base.

## Pre-release
During the beta-testing phase of the software, quirks, bugs and vulnerabilities were squashed as the Arajet QA team detected them.

One particular vulnerability was related to the inherently sensitive nature of credit card input, and so the custom-made Input components were replace in favor of plain HTML and Javascript.

## Postmortem