import { getStore } from "@netlify/blobs"
import { currentKey, getCachedData, fetchSiteData, updateNetlifyBlob } from "../../src/ts/netlify"
import type { Page } from "puppeteer-core"

type TrackTitle = { 
    title: string,
    id: number
}
export type TrackData = {
    title: string,
    cover: string,
    artist: string,
    url: string
}

export async function getTopTrack(page: Page): Promise<TrackData> {
    await page.goto('https://stats.fm/orangetunes', {
        waitUntil: 'domcontentloaded',
        timeout: 60_000,
    })

    await page.waitForSelector('main > .mx-auto.max-w-md section:nth-child(5) > main > ul > :nth-child(2) > li')

    const trackTitles = await page.$$('main > .mx-auto.max-w-md section:nth-child(5) > main > ul > :first-child > li > ul > li > a > .flex > .flex h4')

    let titles: TrackTitle[] = []
    for (const [i, element] of trackTitles.entries()) {
        const name = await element.evaluate(el => el.textContent)
        titles.push({title: name ?? '', id: i+1})
    }

    let titleCounts: { [key: string]: number } = {}
    for (const title of titles) {
        if (title.title === '') continue

        if (titleCounts[title.title]) {
            titleCounts[title.title]++
        } else {
            titleCounts[title.title] = 1
        }
    }

    const topTitle = Object.keys(titleCounts).reduce((a, b) => titleCounts[a] > titleCounts[b] ? a : b)
    const topTitleCount = titleCounts[topTitle] > 1
    ? titles.findLastIndex(title => title.title === topTitle) + 1
    : 1

    const topTrack = await page.$(`main > .mx-auto.max-w-md section:nth-child(5) > main > ul > :first-child > li > ul > li:nth-of-type(${topTitleCount}) > a > .flex > .flex`)
    const parentATag = await topTrack?.evaluateHandle(el => el.closest('a'))
    const href = await page.evaluate(el => el!.getAttribute('href'), parentATag)

    await page.goto('https://stats.fm' + href, {
        waitUntil: 'networkidle2',
        timeout: 60_000,
    })
    await page.waitForSelector('main > .bg-foreground > .mx-auto.max-w-md section')

    const trackDetails = await page.$('main > .bg-foreground > .mx-auto.max-w-md section')
    const topTrackTitle = await trackDetails?.evaluateHandle(el => el.querySelector('.flex > h1')?.textContent)
    const cover = await trackDetails?.evaluateHandle(el => el.querySelector('.shrink-0 .overflow-hidden > img')?.getAttribute('src'))
    const artist = await trackDetails?.evaluateHandle(el => el.querySelector('.flex > span > span > a')?.textContent)
    const songUrl = await trackDetails?.evaluateHandle(el => el.querySelector('.flex > .mt-2 > a:first-child')?.getAttribute('href'))

    return {
        title: await topTrackTitle?.jsonValue() ?? 'Untitled Track',
        cover: 'https://stats.fm' + (await cover?.jsonValue() ?? '66911211'),
        artist: await artist?.jsonValue() ?? 'Who Knows',
        url: await songUrl?.jsonValue() ?? ''
    }
}


export default async (req: Request) => {
    const store = getStore('top-track')
    const key = 'track-data'
    const cachedKey = currentKey(key)

    const cachedResponse = await getCachedData(store, cachedKey)
    if (cachedResponse) {
        return cachedResponse
    }

    const data = await fetchSiteData(getTopTrack)
    await updateNetlifyBlob(store, key, cachedKey, data)

    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
    })
}