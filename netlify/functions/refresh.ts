import { getStore } from "@netlify/blobs"
import type { Config } from "@netlify/functions"
import { fetchSiteData, updateNetlifyBlob, currentKey } from "../../src/ts/netlify"
import { getLatestGoodreadsBook } from "./currentlyReading"
import { getTopTrack } from "./topTrack"
import { getGitContributions } from "./gitContributions"

async function refresh(storeName: string, key: string, fetchUserData: () => Promise<unknown>) {
  const data = await fetchUserData()
  if (!data) return
  
  const store = getStore(storeName)
  await updateNetlifyBlob(store, key, currentKey(key), data)
}

export default async () => {
  const results = await Promise.allSettled([
    refresh('currently-reading', 'book-data', getLatestGoodreadsBook),
    refresh('top-track', 'track-data', () => fetchSiteData(getTopTrack)),
    refresh('git-contributions', 'contribution-data', getGitContributions),
  ])

  const failed = results.filter(r => r.status === 'rejected')
  if (failed.length) {
    console.error('refresh failures:', failed.map(f => (f as PromiseRejectedResult).reason))
  }
}

export const config: Config = {
  schedule: "1 0,16 * * *", // utc
}
