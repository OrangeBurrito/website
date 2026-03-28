import { getStore } from "@netlify/blobs";
import { getCachedData, fetchSiteData, updateNetlifyBlob, currentKey } from "../../src/ts/netlify";
import type { Page } from "puppeteer-core"

export  type BookData = {
    title: string;
    coverImage: string;
    author: string;
    percentage: string;
  };

export async function getLatestStorygraphBook(page: Page) {
    await page.goto('https://app.thestorygraph.com/currently-reading/orangeburrito', {
        waitUntil: 'domcontentloaded',
        timeout: 60_000,
    })
    await page.waitForSelector('.read-books-panes [id^="book"] .book-pane-content')

    const title = await page.$('.read-books-panes [id^="book"]:first-child .book-pane-content .book-title-author-and-series h3 a');
    const titleText = await page.evaluate(el => el!.textContent, title)
    const author = await page.evaluate(el => el!.nextElementSibling?.querySelector('a')?.innerText, title)
    const coverImage = await page.$eval(
        '.read-books-panes [id^="book"]:first-child .book-pane-content .book-cover img',
        el => el.getAttribute('src')
    )
    
    return {
        title: titleText,
        coverImage,
        author
    }
}

export default async (req: Request) => {
    const store = getStore('currently-reading')
    const key = 'book-data'
    const cachedKey = currentKey(key)

    const cachedResponse = await getCachedData(store, cachedKey)
    if (cachedResponse) {
        return cachedResponse
    }

    const data = await fetchSiteData(getLatestStorygraphBook)
    await updateNetlifyBlob(store, key, cachedKey, data)

    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
    })
}