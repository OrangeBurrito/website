<script lang="ts">
  import { Snippet } from "svelte";
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
        font-family: var(--font-header);
        --background-button: var(--accent);
        --background-hover-button: var(--accent-light);
        --color-button: var(--darker);
        background-color: var(--background-button);
        color: var(--color-button);
        padding: var(--space-xs) var(--space-base);
        transition: all 0.08s ease-in-out;

        a {
            color: inherit;
        }

        &:hover {
            background-color: var(--background-hover-button);
            cursor: pointer;
        }

        &.primary {
            font-weight: 600;
        }

        &.secondary {
            --background-button: var(--dark);
            --background-hover-button: var(--dark-lightest);
            --color-button: var(--text-shade);
        }

        &.ghost {
            --background-button: transparent;
            --background-hover-button: transparent;
            --color-button: var(--header-shade);
            border: 2px solid var(--header-shade);

            &:hover {
                border-width: 4px;
            }
        }

        &.size-small {
            font-size: var(--font-size-subheading);
            padding: var(--space-xxs) var(--space-xs);
        }
    }
</style>