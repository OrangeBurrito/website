<script lang="ts">
export interface Props {
  icon: string
}

const { icon }: Props = $props()
const { default: innerHTML } = await import(`../../public/icons/${icon}.svg?raw`)
</script>

<div class="icon">{@html innerHTML}</div>

<style>
  .icon {
    display: inline-block;
    width: var(--size-icon);
    height: var(--size-icon);
  }
</style>