import * as dotenv from 'dotenv'
import { currentKey, getCachedData, updateNetlifyBlob } from '../../src/ts/netlify'
import { getStore } from '@netlify/blobs'
dotenv.config()

export type SiteMetadata = {
    updatedAt: Date
}

async function getSiteMetadata() {
    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        },
        body: JSON.stringify({
        query: `query() { 
                user(login: "orangeburrito") {
                repository(name: "website") {
                    updatedAt
                }
            }
        }`
        })
    })

    const resp = await response.json()
    if (resp.errors) {
        console.error('Error fetching updatedAt date:', resp.errors)
        return null
    }

    const siteMetadata: SiteMetadata = {
        updatedAt: new Date(resp.data.user.repository.updatedAt)
    }

    return siteMetadata
}

export default async (req: Request) => {
    const store = getStore('site-metadata')
    const key = 'site-metadata-data'
    const cachedKey = currentKey(key)

    const cachedResponse = await getCachedData(store, cachedKey)
    if (cachedResponse) {
        return cachedResponse
    }
    
    const contributions = await getSiteMetadata()
    if (!contributions) {
        return new Response(JSON.stringify({ error: 'Failed to fetch site metadata' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        })
    }

    await updateNetlifyBlob (store, key, cachedKey, contributions)

    return new Response(JSON.stringify(contributions), {
        headers: { 'Content-Type': 'application/json' }
    })
}