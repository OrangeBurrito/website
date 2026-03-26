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
    contain?: boolean;
  }

  let { src, alt, caption, type = 'default', width, height, contain = false }: Props = $props();
</script>

<img class={`${type}${contain ? ' contain' : ''}`} style={`${width ? `width: ${width};` : ''}${height ? `height: ${height};` : ''}`} {src} {alt} />
{#if caption}
  <p class="label">{caption}</p>
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

    &.contain {
      object-fit: contain;
    }

    &:has(+ .label) {
      height: calc(100% - var(--gap-grid) * 2);
    }

  }
  
  .label {
    height: var(--gap-grid);
    padding-top: var(--space-100);
  }

  @media screen and (max-width: 600px) {
    .label {
      text-align: center;
    }
  }
</style>
