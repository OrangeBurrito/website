<script lang="ts">
  import type { Snippet } from "svelte";
  import Icon from "./Icon.svelte";

  type Props = {
    href: string
    children: Snippet
    external?: boolean
  }

  let { href, children, external = false }: Props = $props()
</script>

<a class="link flex gap-xsmall" href={href} target={external ? "_blank" : "_self"}>
  {@render children()}
  {#if external}
    <Icon icon="external-link" />
  {/if}
</a>

<style>
  a {
    width: fit-content;
    font-size: var(--font-size-body);
  }

  :global(a.link svg) {
    width: var(--space-200);
    height: var(--space-200);
  }
</style>