<script lang="ts">
  import type { Snippet } from "svelte";
  import type { MouseEventHandler } from "svelte/elements";

    type ButtonType = 'primary' | 'secondary' | 'ghost' 
    type ButtonSize = 'large' | 'default' | 'small'

    type Props = {
        type: ButtonType
        size?: ButtonSize
        link?: string
        children: Snippet
        onclick?: MouseEventHandler<HTMLButtonElement>
    }

    let { type = 'primary', size = 'default', link, children, onclick }: Props = $props()
</script>

<button class="{type} size-{size}" {onclick}>
    {#if link}
        <a href={link}>{@render children()}</a>
    {:else}
        {@render children()}
    {/if}
</button>

<style>
    button {
        border: none;
        outline: none;
        font-size: var(--font-size-heading);
        font-family: var(--font-family-header);
        --background-button: var(--color-primary);
        --background-hover-button: var(--color-primary-light);
        --color-button: var(--color-background-alt);
        background-color: var(--background-button);
        color: var(--color-button);
        padding: var(--space-size-xs) var(--space-size-base);
        transition: all 0.08s ease-in-out;

        a {
            color: inherit;
            background: none;
        }

        &:hover {
            background-color: var(--background-hover-button);
            cursor: pointer;
        }

        &.primary {
            font-weight: 600;
        }

        &.secondary {
            --background-button: var(--color-surface-3);
            --background-hover-button: var(--color-surface-4);
            --color-button: var(--color-text-body);
        }

        &.ghost {
            --background-button: transparent;
            --background-hover-button: transparent;
            --color-button: var(--color-text-heading);
            border: 2px solid var(--color-text-heading);

            &:hover {
                border-width: 4px;
            }
        }

        &.size-small {
            font-size: var(--font-size-subheading);
            padding: var(--space-size-xxs) var(--space-size-xs);
        }
    }
</style>