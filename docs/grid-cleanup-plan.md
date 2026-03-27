# Grid System Cleanup Plan

## Overview

The BaseLayout.astro introduces an 8x8 CSS Grid system for desktop layouts. However, existing component and page styles conflict with this system, causing layout issues.

## Current Grid System (BaseLayout.astro)

```
Desktop Layout (>600px):
┌─────────────────────────────────────────┐
│  header (3 cols × 3 rows)  │            │
│  - LogoHeader              │            │
│  - NavBar                  │   main     │
│  - SiteSettings            │ (5 cols ×  │
├────────────────────────────│  8 rows)   │
│  aside (3 cols × 5 rows)   │            │
│  - slot "corner"           │            │
└─────────────────────────────────────────┘
```

Grid children must use `container-y` class with `header` or `fill` modifiers to slot in correctly.

## Visual Issues Found

### Homepage (/)
- **Issue**: Header/nav appears at bottom-left, "See All Posts" button oddly positioned on right
- **Cause**: Content doesn't use `container-y` classes; `.page-header` has `align-self: flex-end`

### Posts Page (/posts)
- **Status**: Works correctly - uses proper `container-y header` and `container-y fill` classes

### Projects Page (/projects)
- **Issue**: "Projects" heading at bottom, nav at bottom-left
- **Cause**: Uses `.page-header` and `.item-list` classes but not `container-y` wrappers

### About Page (/about)
- **Status**: Mostly works, but `.about-strip` uses `float: right` instead of grid placement

### Single Post/Project Pages
- **Note**: Use RootLayout instead of BaseLayout - intentionally different vertical layout

## CSS Conflicts Identified

### 1. global.css

| Line | Style | Issue |
|------|-------|-------|
| 338-347 | `.page-header { align-self: flex-end; }` | Pushes headers to bottom of grid cell |
| 378-381 | `article { width: 60%; margin: 0 auto; }` | Conflicts with grid layout |
| 247-254 | `#site-header { position: sticky; }` | Sticky positioning can conflict with grid flow |
| 454-458 | `body.homepage #site-header { position: absolute; }` | Absolute positioning removes from flow |

### 2. post.css

| Line | Style | Issue |
|------|-------|-------|
| 1-3 | `.site-header { margin-bottom: 0 !important; }` | !important override |
| 5-7 | `.site-settings { position: absolute; }` | Absolute positioning |

### 3. BaseLayout.astro

| Line | Issue |
|------|-------|
| 28 | `body class="homepage"` applied to ALL pages using BaseLayout |

### 4. Components without container-y

- `index.astro`: Content (`posts`, `projects`, Button) not wrapped in `container-y`
- `projects/index.astro`: `.page-header` and `.projects` not using `container-y`
- `about.astro`: Uses `float: right` instead of grid placement

## Cleanup Plan

### Phase 1: Fix BaseLayout body class

**File**: `src/layouts/BaseLayout.astro`

Remove the hardcoded `homepage` class from the body. It should only be applied on the actual homepage:

```diff
- <body class=`${theme} lang-${lang} homepage`>
+ <body class=`${theme} lang-${lang}`>
```

Then pass a prop to conditionally add it:
```astro
const { title, homepage } = Astro.props
...
<body class=`${theme} lang-${lang} ${homepage ? 'homepage' : ''}`>
```

### Phase 2: Update page content to use container-y

**File**: `src/pages/index.astro`

Wrap content in proper grid slots:
```astro
<BaseLayout title="OrangeBurrito" homepage>
  <div class="container-y header">
    <!-- header content if any -->
  </div>
  <div class="container-y fill">
    <div class="posts">...</div>
    <div class="projects">...</div>
    <Button .../>
  </div>
</BaseLayout>
```

**File**: `src/pages/projects/index.astro`

```astro
<BaseLayout title="Projects">
  <h1 class="page-header container-y header">{t('title.projects')}</h1>
  <div class="projects item-list flex-col flex-y-t container-y fill">
    ...
  </div>
</BaseLayout>
```

### Phase 3: Remove conflicting global styles

**File**: `src/styles/global.css`

1. Remove or scope `align-self: flex-end` from `.page-header`:
```diff
.page-header {
- align-self: flex-end;
  display: inline-block;
  ...
}
```

2. Scope `article` width styles to only apply in RootLayout contexts:
```diff
- article {
-   width: 60%;
-   margin: 0 auto;
- }
+ body:not(.homepage) > article,
+ #site-header ~ article {
+   width: 60%;
+   margin: 0 auto;
+ }
```

Or better, move these styles to `post.css` / `project.css` where they're actually needed.

### Phase 4: Clean up post.css absolute positioning

**File**: `src/styles/post.css`

Remove or scope these rules that only apply to single post/project pages:
```diff
- .site-header {
-   margin-bottom: 0 !important;
- }
-
- .site-settings {
-   position: absolute;
- }
```

These should be handled by RootLayout-specific styles instead.

### Phase 5: Update About page to use grid

**File**: `src/pages/about.astro`

Replace `float: right` with grid placement:
```diff
- <div class="about-strip">
+ <div class="about-strip container-y fill">
```

And update styles:
```diff
.about-strip {
-  float: right;
   ...
}
```

## Testing Checklist

After each change, verify:

- [ ] Homepage: Header at top-left, nav below, main content fills right side
- [ ] Posts page: Header at top, posts list scrollable
- [ ] Projects page: Header at top, projects list below
- [ ] About page: Content positioned correctly in grid
- [ ] Single post: Vertical layout unchanged (uses RootLayout)
- [ ] Single project: Vertical layout unchanged (uses RootLayout)
- [ ] Mobile (<600px): Flex layout works correctly
- [ ] Scroll behavior: Header shrink effect works

## Priority Order

1. **High**: Phase 1 (BaseLayout body class) - Affects all pages
2. **High**: Phase 3 (`.page-header` align-self) - Causes most visible issues
3. **Medium**: Phase 2 (container-y classes) - Proper grid participation
4. **Medium**: Phase 4 (post.css cleanup) - Removes conflicts
5. **Low**: Phase 5 (About page) - Works but uses float hack

## Notes

- The grid system uses CSS subgrid which requires modern browsers
- Mobile layout (<600px) uses flexbox instead of grid
- RootLayout is intentionally different for single post/project detail pages
- The `container-y` class system allows content to span grid cells correctly
