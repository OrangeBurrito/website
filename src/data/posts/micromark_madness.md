---
title: 'Micromark Madness'
publishedDate: 2025-09-29
coverImage: "https://www.jsdelivr.com/open-graph/image/npm/micromark"
description: "Or, a comprehensive explanation of how to extend markdown syntax"
---

![Contents of post under construction](/images/contentsunderconstruction.gif)


This is a no-frills guide about how to extend markdown syntax for use with the [remark markdown processor](https://github.com/remarkjs/remark).

Usually when one searches the interwebs looking for ways to accomplish this, you'll inevitably encounter dissuading rhetoric about why you absolutely should never attempt to extend markdown syntax and other things related to best practices and not reinventing the wheel.

![XKCD comic called Standards](https://imgs.xkcd.com/comics/standards.png)
*Typical response: the classic [XKCD No.927](https://xkcd.com/927/) strip gets wheeled out*

Now, I can assume that since you're reading this you just need the straight-to-the-point information. See below:

## Getting Started

Extending syntax of any language necessitates understanding how a language is parsed in the first place.

> Looking for a deeper understanding of of lexing and parsing? Check out the excellent book [Crafting Interpreters](https://craftinginterpreters.com/).

Essentially it's the process of consuming the string of characters that is your code, splitting them up into 'tokens' that represent different parts of the language (operators, reserved keywords, values), constructing an abstract hierarchical tree based on those tokens