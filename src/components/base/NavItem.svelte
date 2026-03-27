<script lang="ts">
    import Icon from "./Icon.svelte";
    import type { Snippet } from "svelte";


    type Props = {
        icon: string;
        href: string;
        children: Snippet
    }
    
    let { icon, href, children }: Props = $props()
</script>

<a class="nav-item flex" href={href} target="_blank">
    <Icon size="small" color="var(--color-text-code)" {icon} />
    <span>{@render children()}</span>
</a>

<style>
    .nav-item {
        gap: var(--space-075);

        span {
            font-size: var(--font-size-body-large);
           margin-top: 2px;
        }
    }
</style>