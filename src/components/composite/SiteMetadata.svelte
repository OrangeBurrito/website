<script lang="ts">
    import Date from "../base/Date.svelte";
    import type { SiteMetadata } from "../../../netlify/functions/siteMetadata";
  import { onMount } from "svelte";

    let metadata = $state<SiteMetadata | null>(null)
    let loading = $state(false)

    onMount(async () => {
        try {
            loading = true
            const response = await fetch(`/.netlify/functions/siteMetadata`);
            if (!response.ok) {
                return;
            }
            metadata = await response.json();
        } catch (err) {
            console.error("Failed to fetch site metadata", err);
        } finally {
            loading = false
        }
    })
</script>

<div class="row-1 flex end baseline"><h3 class="subtle right">Site Metadata</h3></div>
<div class="data row-fill flex vertical end">
    <div class="flex vertical end gap-xsmall">
    <p class="label">Last Updated</p>
    {#if loading}
        <p class="emphasis right">Loading...</p>
    {:else if metadata}
        <Date class="emphasis right" date={metadata.updatedAt} />
    {/if}
    </div>
    <div class="flex vertical end gap-xsmall">
    <p class="label">Created At</p>
    <Date class="emphasis right" date="2024-12-14" />
    </div>
    <div class="flex vertical end gap-xsmall">
    <p class="label">Copyright ©</p>
    <p class="emphasis right">OrangeBurrito 2026</p>
    </div>
</div>