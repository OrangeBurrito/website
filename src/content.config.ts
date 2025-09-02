import { defineCollection, z } from 'astro:content'
import { glob, file } from 'astro/loaders'

const posts = defineCollection({
    loader: glob({ base: './src/data/posts', pattern: '**/*.md' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        coverImage: z.string(),
        publishedDate: z.date(),
        updatedDate: z.date().optional()
    })
})

const projects = defineCollection({
    loader: glob({ base: './src/data/projects', pattern: '**/*.md' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        url: z.string(),
        client: z.string().optional(),
        clientUrl: z.string().optional(),
        contractor: z.string().optional(),
        contractorUrl: z.string().optional(),
        startDate: z.date(),
        endDate: z.date().optional()
    })
})

export const collections = { posts, projects };