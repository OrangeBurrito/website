import { defineCollection, z, type CollectionEntry } from 'astro:content'
import { glob, file } from 'astro/loaders'


const posts = defineCollection({
    loader: glob({ base: './src/data/posts', pattern: '**/*.md', retainBody: false }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        coverImage: z.string(),
        publishedDate: z.date(),
        updatedDate: z.date().optional(),
        tags: z.array(z.string())
    })
})

const projects = defineCollection({
    loader: glob({ base: './src/data/projects', pattern: '**/*.md', retainBody: false }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        shortDesc: z.string().optional(),
        url: z.string().optional(),
        coverImage: z.string(),
        coverIcon: z.string().optional(),
        client: z.string().optional(),
        clientUrl: z.string().optional(),
        contractor: z.string().optional(),
        contractorUrl: z.string().optional(),
        startDate: z.date(),
        endDate: z.date().optional(),
        tags: z.array(z.string()).optional(),
        color: z.string().optional()
    })
})

export type Post = CollectionEntry<'posts'>
export type Project = CollectionEntry<'projects'>

export const collections = { posts, projects };