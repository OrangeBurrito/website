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

<a class="nav-item flex" href={href}>
    <Icon size="small" {icon} />
    <span>{@render children()}</span>
</a>

<style>
    .nav-item {
        gap: var(--space-100);

        span {
           margin-top: 2px;
        }
    }
</style>