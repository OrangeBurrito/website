---
title: 'Installation Guides (MacOS)'
publishedDate: 2022-12-30
coverImage: "/images/upscaled_normandy.jpg"
description: "An accumulation of installation guides of Mac apps from various personal app-related whims."
layout: '../../layouts/PostLayout.astro'
---

Here's a few quick guides to install random cracked/patched software on MacOS, to delegate my memory of these instructions to a markdown file instead of an unreliable hippocampus.

This will get updated whenever I need to use some new obscure program.

If you get permission errors when attempting to install, allow unidentified apps from any source, disable your Gatekeeper (run `sudo spctl --master-disable` in Terminal) and check Security & Privacy for a prompt to unblock whatever app you're trying to load.

## Topaz Gigapixel AI
The app is an image upscaler that uses AI to increase the resolution of images.  It can be performance heavy due to the mysterious computational contortions required to intelligently resize said images.

- Download .dmg from (https://www.123pan.com/s/l2tA-D0Y23)
- Mount said dmg.  Inside, mount the *other* dmg called something like Topaz Giga.dmg
- Inside the nested dmg, copy the .plist config file to the Preferences file shortcut (~/Library/Preferences)
- Returning to the original mounted drive, copy Topaz Gigapixel AI.app to Applications
- Launch the app and install the required datasets.  If there is no Free Trial popup, you're done.

![Upscaled Normandy SR-2](/images/upscaled_normandy.jpg)*The Bord, all-mighty deity, has known many forms, the ancient egyptian Horus being one of them*
