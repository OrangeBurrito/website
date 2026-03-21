<script lang="ts">
type IconSize = "small" | "medium" | "large"

interface Props {
  icon: string,
  size?: IconSize
}

const { icon, size }: Props = $props()

const { default: svg } = await import(`../../../public/icons/default/${icon}.svg?raw`)
const { default: retroSvg } = await import(`../../../public/icons/retro/${icon}.svg?raw`)
</script>

<div class="icon {size}">{@html svg}
<div class="icon retro {size}">{@html retroSvg}</div>
</div>

<style>
  .icon {
    display: inline-block;
    height: var(--icon-size);
    width: var(--icon-size);

    &.small {
      --icon-size: var(--space-250);
    }
    &.large {
      --icon-size: var(--space-400);
    }
  }

  .icon.retro {
    display: none;
  }

  :global(body.retro) {
    .icon {
      display: none;
    }
    .icon.retro {
      display: inline-block;
    }
  }
</style>