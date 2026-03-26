import { getStore } from "@netlify/blobs"
import { currentKey, getCachedData, updateNetlifyBlob } from "../../src/ts/netlify"
import * as dotenv from 'dotenv'
dotenv.config()

export type GitActivityLevel = 0 | 1 | 2 | 3 | 4
export type GitContributionData = {
    date: Date,
    commits: number
}

async function getGitContributions() {
    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        },
        body: JSON.stringify({
            query: `query() { 
                user(login: "orangeburrito") {
                    contributionsCollection {
                    contributionCalendar {
                        weeks {
                            contributionDays {
                                contributionCount
                                date
                            }
                        }
                    }
                }
            }
            }`
        })
    })

    const resp = await response.json()
    if (resp.errors) {
        console.error('Error fetching GitHub contributions:', resp.errors)
        return null
    }

    const allContributions = resp.data.user.contributionsCollection.contributionCalendar.weeks
    const contributions = allContributions[allContributions.length - 1].contributionDays.map((c) => ({"date": c.date, "commits": c.contributionCount}))

    return contributions
}

export default async (req: Request) => {
    const store = getStore('git-contributions')
    const key = 'contribution-data'
    const cachedKey = currentKey(key)

    const cachedResponse = await getCachedData(store, cachedKey)
    if (cachedResponse) {
        return cachedResponse
    }
    
    const contributions = await getGitContributions()
    if (!contributions) {
        return new Response(JSON.stringify({ error: 'Failed to fetch contributions' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        })
    }

    await updateNetlifyBlob (store, key, cachedKey, contributions)

    return new Response(JSON.stringify(contributions), {
        headers: { 'Content-Type': 'application/json' }
    })
}