<script lang="ts">
    type Props = {
        color: string
        vertical?: boolean
    }

    let { color = 'gray', vertical = false }: Props = $props()
</script>

<div class="tag{vertical ? ' vertical' : ''}" style="--color-tag: {color}"></div>

<style>
    .tag {
        --color-tag: gray;
        --size-tag: var(--space-075);
        background-color: var(--color-tag);
        height: var(--size-tag);
        width: 100%;

        &.vertical {
            width: var(--size-tag);
            flex-grow: 1;
        }
    }
</style>