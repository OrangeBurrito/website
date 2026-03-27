<script lang="ts">
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

<div class="image" style={`${width ? `width: ${width};` : ''}${height ? `height: ${height};` : ''}`}>
  <img class={`${type}${contain ? ' contain' : ''}`} {src} {alt} />
  {#if caption}
    <p class="label">{caption}</p>
  {/if}
</div>

<style>
  .image {
    width: 100%;
    height: 100%;
  }
  
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
      height: calc(100% - var(--space-300));
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
