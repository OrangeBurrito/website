import { chromium } from "playwright"

export async function getLatestStorygraphBook() {
    const browser = await chromium.launch()
    const page = await browser.newPage()
    await page.goto('https://app.thestorygraph.com/currently-reading/orangeburrito')

    const currentBook = await page.$('.read-books-panes div[id*="book"]:first-child .book-pane-content')
    
    const bookCover = await currentBook?.$('.book-cover img')
    const bookImageUrl = await bookCover?.getAttribute('src')

    const bookTitle = await currentBook?.$('.book-title-author-and-series h3 > span + a')
    const bookTitleText = await bookTitle?.innerText()

    await browser.close()

    return {
        title: bookTitleText,
        coverUrl: bookImageUrl
    }
}