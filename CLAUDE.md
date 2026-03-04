# CLAUDE.md

This project is a personal site/portfolio with a locally hosted blog and projects page.
It is an Astro 5 Typescript site, using Svelte 5 for components, deployed to Netlify with SSR.

Always use `bd` for task tracking. Run `bd ready` to see tasks that have yet to be worked on.

## Conventions
- Svelte 5 runes over stores
- CSS nesting everywhere
- Dynamic routes use `[...slug].astro` pattern
- Minimal inline comments, self-documenting code

### Styling
- CSS variables defined in `src/styles/global.css`. Includes utility classes.
-  Mobile-first responsive design with breakpoints at 600px and 900px. Theme system uses body classes.

### Layouts

- `RootLayout.astro` - Base HTML wrapper, theme/language handling
- `BaseLayout.astro` - Standard page layout
- `HomeLayout.astro` - Homepage-specific layout
- `PostLayout.astro` / `ProjectLayout.astro` - Content-specific layouts

### Components
- Components are stored at `src/components`, and follow atomic organization: `base` (buttons, icon) and `composite` (composed of base components)
- All component props are typed with a local Props type: `let { ... }: Props = $props()`

### Content
Blogposts and project pages are stored locally at `src/data` in `.md` files, using Astro content collections.
Data schemas are defined in `src/content.config.ts`.
Live user status data is fetched from netlify blob storage (updated with netlify functions that run on deploy)

## Commands

```bash
pnpm dev      # Start development server
```