<script lang="ts">
  import { onMount } from "svelte";
  import Image from "../base/Image.svelte";

  let track = $state(null)
  let loading = $state(true)
  let error = $state(false)

    onMount(async () => {
        try {
            const response = await fetch(`/.netlify/functions/topTrack`)
            if (!response.ok) {
                error = true
                return
            }
            track = await response.json()
        } catch (err) {
            error = true
        } finally {
            loading = false
        }
  })
</script>

<div class="top-track status-item-data flex between">
    {#if loading}
        <p>Loading...</p>
    {:else if track}
        <div class="text">
            <div class="label">Top Track</div>
            <h3 class="title">{track.title}</h3>
            <p class="subtitle">{track.artist}</p>
        </div>
        <a class="image-link" href={track.url} target="_blank">
          <div class="image">
            <Image src={track.cover} alt={track.title} />
          </div>
        </a>
    {/if}
</div>