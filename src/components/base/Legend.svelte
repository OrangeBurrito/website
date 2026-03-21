<script lang="ts">
  import { Snippet } from "svelte";

    type Props = {
        color: string
        children: Snippet
    }

    let { color, children }: Props = $props()    
</script>

<div class="legend flex gap-small">
    <div class="box" style={`--color-legend: ${color};`}></div>
    <span>{@render children()}</span>
</div>

<style>
    .box {
        width: var(--space-175);
        height: var(--space-175);
        background-color: var(--color-legend);
    }
    
    span {
        font-size: var(--font-size-body-small);
    }
</style>