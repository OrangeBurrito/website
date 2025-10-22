import type { Config } from "@netlify/functions"
const { getStore } = await import('@netlify/blobs')
import { getLatestStorygraphBook } from "../../src/ts/playwright"

export default async (req: Request) => {
    if (req.method === 'GET') {
        const store = getStore('currently-reading')
        const cachedData = await store.get('book-data', { type: 'json' })
        
        if (cachedData) {
            return new Response(JSON.stringify(cachedData), {
                headers: { 'Content-Type': 'application/json' }
            })
        }
        
        return new Response(JSON.stringify({ error: 'No data available' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        })
    }
    
    const data = await getLatestStorygraphBook()
    const store = getStore('currently-reading')
    
    await store.setJSON('book-data', data)
    
    return new Response(JSON.stringify({ success: true, data }))
}

export const config: Config = {
    schedule: "@daily"
}