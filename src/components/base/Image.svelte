<script lang="ts">
  import { fade } from 'svelte/transition';

  type ImageType = 'default' | 'pixelated';

  interface Props {
    src: string;
    alt: string;
    caption?: string;
    type?: ImageType
    width?: string;
    height?: string;
    expand?: boolean;
  }

  let { src, alt, caption, type = 'default', width, height, expand = false }: Props = $props();
  let expanded = $state(false);

  function toggleExpand() {
    expanded = !expanded;
  }
</script>

{#if expand}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <img {src} {alt} class="expandable" class:expanded style={`${width ? `width: ${width};` : ''}${height ? `height: ${height};` : ''}`} onclick={toggleExpand} />
  {#if expanded}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="overlay" transition:fade={{ duration: 400 }} onclick={toggleExpand}></div>
  {/if}
{:else}
  <img class={type} style={`${width ? `width: ${width};` : ''}${height ? `height: ${height};` : ''}`} {src} {alt} />
  {#if caption}
    <p class="label">{caption}</p>
  {/if}
{/if}

<style>
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;

    &.pixelated {
      image-rendering: pixelated;
    }

    &.expandable {
        cursor: pointer;
        transition: transform var(--transition-smooth);
        position: relative;
    }
    &.expanded {
        transform: scale(1.2);
        z-index: 11;
    }

    &:has(+ .label) {
      height: calc(100% - var(--gap-grid) * 2);
    }

  }
  
  .label {
    height: var(--gap-grid);
    padding-top: var(--space-150);
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    background-color: color-mix( in srgb,var(--color-background) 80%,  transparent);
    cursor: pointer;
  }
</style>
