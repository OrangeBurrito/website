<script lang="ts">
type IconSize = "small" | "medium" | "large"

interface Props {
  icon: string,
  size?: IconSize,
  color?: string
}

const { icon, size, color }: Props = $props()

const { default: svg } = await import(`../../../public/icons/default/${icon}.svg?raw`)
const { default: retroSvg } = await import(`../../../public/icons/retro/${icon}.svg?raw`)
</script>

<div class="icon {size}" style={color && color.length > 0 ? `--color-icon: ${color}` : ''}>{@html svg}
<div class="icon retro {size}">{@html retroSvg}</div>
</div>

<style>
  .icon {
    --color-icon: var(--color-text-code);
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

  :global(.icon svg) {
    display: block;
    width: var(--icon-size);
    height: var(--icon-size);
    stroke: var(--color-icon);
  }

  :global(.icon-wrapper .icon) {
    display: block;
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