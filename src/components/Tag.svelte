<script lang="ts">
  import type { Snippet } from "svelte";

    type Props = {
        children: Snippet
        color: string
    }

    let { children, color = 'gray' }: Props = $props()
</script>

<div class="tag" style="--color-background-tag: {color}">{@render children()}</div>

<style>
    .tag {
        --color-background-tag: gray;
        --color-text-tag: var(--color-text-heading);
        padding: var(--space-size-xxs) var(--space-size-xs);
        background-color: var(--color-background-tag);
        color: var(--color-text-tag);
        font-weight: bold;
    }
</style>