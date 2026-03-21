import puppeteer from "puppeteer-core"
import chromium from '@sparticuz/chromium'
import { Store } from "@netlify/blobs"

export async function fetchSiteData(func: Function) {
    const browser = await puppeteer.launch({ 
        args: [...chromium.args],
        headless: true,
        executablePath: "/opt/homebrew/bin/chromium",
    })
    // await chromium.executablePath() ?? 
    const page = await browser.newPage()
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123 Safari/537.36')
    await page.setViewport({ width: 1280, height: 900 })

    let data = await func(page)
    await browser.close()
    return data
}

export async function getCachedData(store: Store, cachedKey: string) {
    const cachedData = await store.get(cachedKey, { type: 'json' })
    if (cachedData) {
        return new Response(JSON.stringify(cachedData), {
            headers: { 'Content-Type': 'application/json' }
        })
    }
    return null
}

export async function updateNetlifyBlob(store: Store, key: string, cachedKey: string, data: any) {
    await store.setJSON(cachedKey, data)

    const allBlobs = await store.list()
    const oldBlobs = allBlobs.blobs.filter(blob => 
        blob.key.startsWith(`${key}-`) && blob.key !== cachedKey
    )
    
    for (const oldBlob of oldBlobs) {
        await store.delete(oldBlob.key)
    }
}

export function currentKey(key: string) {
    return `${key}-${new Date().toISOString().split('T')[0]}`
}