import type { Config } from "@netlify/functions"
import { chromium } from "playwright"

async function getLatestStorygraphBook() {
    const browser = await chromium.launch({ headless: true })
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123 Safari/537.36',
        viewport: { width: 1280, height: 900 },
    })
    const page = await context.newPage()

    await page.goto('https://app.thestorygraph.com/currently-reading/orangeburrito', {
        waitUntil: 'domcontentloaded',
        timeout: 60_000,
    })

    const firstBook = page.locator('.read-books-panes [id^="book"] .book-pane-content').first()

    const title = await firstBook.locator('.book-title-author-and-series h3 a').first().textContent()
    const coverImage = await firstBook.locator('.book-cover img').getAttribute('src')

    const authorLinks = firstBook.locator('.book-title-author-and-series p a')
    const firstAuthor = await authorLinks.nth(0).textContent()
    const secondAuthor = await authorLinks.nth(1).textContent()

    const authors = [firstAuthor, secondAuthor].filter(Boolean)

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