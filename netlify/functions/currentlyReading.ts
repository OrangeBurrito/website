import { getStore } from "@netlify/blobs";
import { getCachedData, fetchSiteData, updateNetlifyBlob, currentKey } from "../../src/ts/netlify";
import type { Page } from "puppeteer-core"

export  type BookData = {
    title: string;
    author: string;
    coverImage: string;
};

export async function getLatestStorygraphBook(page: Page): Promise<BookData> {
    const navigationPromise = page.waitForNavigation({waitUntil: "domcontentloaded"})

    await page.goto('https://app.thestorygraph.com/currently-reading/orangeburrito', {
        waitUntil: 'domcontentloaded',
        timeout: 60_000,
    })
    await navigationPromise

    await page.waitForSelector('.read-books-panes [id^="book"] .book-pane-content')

    const title = await page.$('.read-books-panes [id^="book"]:first-child .book-pane-content .book-title-author-and-series h3 a');
    const titleText = await page.evaluate(el => el!.textContent, title)
    const author = await page.evaluate(el => el!.nextElementSibling?.querySelector('a')?.innerText, title)
    const coverImage = await page.$eval(
        '.read-books-panes [id^="book"]:first-child .book-pane-content .book-cover img',
        el => el.getAttribute('src') 
    )
    
    return {
        title: titleText.split(":")[0],
        author: author ?? '',
        coverImage: coverImage ?? ''
    }
}

export async function getLatestGoodreadsBook(): Promise<BookData> {
    const response = await fetch('https://api.piratereads.com/54291128-orangeburrito/currently-reading')
   //  if (!response.ok) { // todo proper error handling}
    const data = await response.json()
    const book = data.books[0]

    return {
        title: book.book_title.split(/[(:]/)[0].trim(),
        author: book.book_author,
        coverImage: book.book_cover_large,
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

    const data = await fetchSiteData(getLatestGoodreadsBook)
    await updateNetlifyBlob(store, key, cachedKey, data)

    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
    })
}