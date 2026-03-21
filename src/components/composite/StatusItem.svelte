<script lang="ts" context="module">
  export type StatusItemData = {
  title: string
  subtitle: string
  image: string | null
} 
</script>

<script lang="ts">
 import { type Snippet } from "svelte"
  import Image from "../base/Image.svelte";

  type Props = {
    children: Snippet
    background?: string
  }

  let { background, children }: Props = $props()
</script>

<div class="status-item" style={background ? `background-color: ${background};` : ''}>
    {@render children()}
</div>

<style>
  .status-item {
    background-color: var(--color-surface);
    padding: var(--space-200);
  }
</style>
