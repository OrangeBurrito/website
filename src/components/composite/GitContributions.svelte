<script lang="ts">
  import { onMount } from "svelte";
  import GitContribution from "../base/GitContribution.svelte"
  import type { GitContributionData, GitActivityLevel } from "../../../netlify/functions/gitContributions"

    const threshold = [0, 1, 3, 6, 10]
    const weekdays = ['S','M','T','W','T','F','S']
    
    function getActivityLevel(commits: number): GitActivityLevel {
        return commits >= threshold[4] ? 4 :
               commits >= threshold[3] ? 3 :
               commits >= threshold[2] ? 2 :
               commits >= threshold[1] ? 1 : 0
    }

    function incrementDay(date: Date, inc: number): Date {
        let tempDate = new Date(date)
        tempDate.setDate(date.getDate() + inc)
        return tempDate
    }

    let contributions: GitContributionData[] = $state([])
    let loading = $state(true)
    let error = $state(false)

    onMount(async () => {
        try {
            const response = await fetch(`/.netlify/functions/gitContributions`)
            if (!response.ok) {
                error = true
                return
            }
            contributions = await response.json()
            contributions = contributions.map(c => ({ ...c, date: new Date(c.date) }))
        } catch (err) {
            error = true
        } finally {
            loading = false
        }
  })
</script>

<div class="git-contributions">
{#if loading}
    <p>Loading...</p>
{:else if error}
    <p>Error loading GitHub contributions.</p>
{:else}
    <div class="label">GitHub Activity</div>
    <div class="flex gap-small">
        {#each contributions as contribution}
        <GitContribution day={weekdays[contribution.date.getDay()]} level={getActivityLevel(contribution.commits)} />
        {/each}
        {#if  contributions.length > 0 && contributions.length < 7}
        {#each Array(7 - contributions.length) as _, i}
        <GitContribution
                day={weekdays[incrementDay(contributions[contributions.length-1].date, i+1).getDay()]}
                level={0}
            />
        {/each}
        {/if}
    </div>
{/if}
</div>