<script lang="ts">
  import { onMount, type Snippet } from "svelte"

  type Props = {
    label: string
    title: string
    subtitle: string
    side?: Snippet
    children?: Snippet
  }

  let data: any = $state(null)
  let loading = $state(true)
  let error = $state(false)

  let { label, title, subtitle, children, side }: Props = $props()

  onMount(async () => {
    data = {
        title: 'The Cuckoos Call',
        authors: 'JK Rowling'
    }
    loading = false
    // try {
    //   const response = await fetch(`/.netlify/functions/currentlyReading`)
    //   if (!response.ok) {
    //     error = true
    //     return
    //   }
    //   data = await response.json()
    // } catch (err) {
    //   error = true
    // }
  })
</script>

<div class="status-item flex between">
    <div class="data">
        <div class="label">{label}</div>
        {#if loading}
        <p>Loading</p>
        {:else}
        <div class="text">
            <h3 class="title">{data[title]}</h3>
            <p class="subtitle">{data[subtitle]}</p>
        </div>
        {/if}
    {#if children}
      {@render children()}
    {/if}
  </div>
  <div class="side">
    {#if side}
      {@render side()}
    {/if}
  </div>
</div>
