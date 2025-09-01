import { defineCollection, z } from 'astro:content'
import { glob, file } from 'astro/loaders'

const posts = defineCollection({
    loader: glob({ base: './src/pages/posts', pattern: '**/*.md' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        coverImage: z.string(),
        publishedDate: z.date(),
        updatedDate: z.date().optional()
    })
})

export const collections = { posts };