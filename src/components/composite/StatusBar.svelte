<script lang="ts">
  import type { Snippet } from "svelte";
  import Icon from "../base/Icon.svelte";

    type Props = {
        title: string
        subtitle?: string
        icon?: string
        children: Snippet
    }

    let { title, subtitle, icon, children }: Props = $props()
</script>

<div class="status-bar">
    <div class="heading">
        <div class="title">
            {#if icon}<Icon icon={icon} />{/if}
            <h3 class="subheading">{title}</h3>
        </div>
        {#if subtitle}<p>{subtitle}</p>{/if}
    </div>
    <div class="content">
        {@render children()}
    </div>
</div>

<style>
    .status-bar {
        .title {
            text-transform: uppercase;
        }
    }
</style>