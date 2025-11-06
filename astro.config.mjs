import { defineConfig } from 'astro/config'
import svelte from '@astrojs/svelte'

import netlify from '@astrojs/netlify';

export default defineConfig({
  buildOptions: {
    site: 'https://orangeburrito.com',
    sitemap: true,
  },
  devOptions: {},
  renderers: [],
  markdownOptions: {
    render: [
      '@astrojs/markdown-remark',
      {
        remarkPlugins: ['remark-breaks']
      }
    ]
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark-default'
    }
  },
  i18n: {
    locales: ["en", "th"],
    defaultLocale: "en"
  },
  integrations: [svelte()],
  output: 'server',
  adapter: netlify()
})