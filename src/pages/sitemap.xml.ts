import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

// credit to Colin McNamara for the sitemap generation code (https://colinmcnamara.com/blog/fixing-astro-sitemap-ssr-mode)
export async function GET(context: APIContext) {
  const site = 'https://orangeburrito.com';
  
  const posts = await getCollection('posts')
  const projects = await getCollection('projects')
  
  const urls: Array<{ loc: string; changefreq?: string; priority?: number }> = [];
  
  urls.push(
    { loc: `${site}/`, changefreq: 'weekly', priority: 1.0 },
    { loc: `${site}/about/`, changefreq: 'monthly', priority: 0.7 },
    { loc: `${site}/resources/`, changefreq: 'monthly', priority: 0.7 },
  )
  
  posts.forEach(post => {
      urls.push({
        loc: `${site}/posts/${post.id}/`,
        changefreq: 'monthly',
        priority: 0.8
      })
    })

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>${url.changefreq ? `
    <changefreq>${url.changefreq}</changefreq>` : ''}${url.priority !== undefined ? `
    <priority>${url.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;
  
  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}