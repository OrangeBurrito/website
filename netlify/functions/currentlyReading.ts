import type { Config } from "@netlify/functions"
import puppeteer from "puppeteer-core"
import chromium from '@sparticuz/chromium'

export async function getLatestStorygraphBook() {
    const browser = await puppeteer.launch({ 
        args: [...chromium.args],
        headless: true,
        executablePath: await chromium.executablePath(),
    })

    const page = await browser.newPage()
    
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123 Safari/537.36')
    await page.setViewport({ width: 1280, height: 900 })

    await page.goto('https://app.thestorygraph.com/currently-reading/orangeburrito', {
        waitUntil: 'domcontentloaded',
        timeout: 60_000,
    })
    await page.waitForSelector('.read-books-panes [id^="book"] .book-pane-content')

    const title = await page.$eval(
        '.read-books-panes [id^="book"] .book-pane-content .book-title-author-and-series h3 a',
        el => el.textContent
    )

    const coverImage = await page.$eval(
        '.read-books-panes [id^="book"] .book-pane-content .book-cover img',
        el => el.getAttribute('src')
    )

    const authorElements = await page.$$('.read-books-panes [id^="book"] .book-pane-content .book-title-author-and-series p a')
    const authors: string[] = []
    
    if (authorElements.length > 0) {
        const firstAuthor = await authorElements[0].evaluate(el => el.textContent)
        if (firstAuthor) authors.push(firstAuthor)
    }
    
    if (authorElements.length > 1) {
        const secondAuthor = await authorElements[1].evaluate(el => el.textContent)
        if (secondAuthor) authors.push(secondAuthor)
    }
    await browser.close()

    return {
        title,
        coverImage,
        authors
    }
}

export default async (req: Request) => {
    const { getStore } = await import('@netlify/blobs')
    const store = getStore('currently-reading')

    if (req.method === 'GET') {
        const cachedData = await store.get('book-data', { type: 'json' })
        if (cachedData) {
            return new Response(JSON.stringify(cachedData), {
                headers: { 'Content-Type': 'application/json' }
            })
        }
    }

    const data = await getLatestStorygraphBook()
    await store.setJSON('book-data', data)

    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
    })
}

export const config: Config = {
    // schedule: "@daily" // Temporarily commented out for testing
}