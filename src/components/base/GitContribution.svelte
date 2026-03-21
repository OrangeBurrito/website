<script lang="ts">
    type Props = {
        day: string
        level: number
    }
    let { day, level }: Props = $props()
</script>

<div class="contribution level-{level} flex vertical center gap-none">
    <p class="subtitle">{day}</p>
    <div class="box"></div>
</div>


<style>
    .contribution {
        .box {       
            width: var(--space-200);
            height: var(--space-200);
            background-color: var(--color-contribution);
        }

        &.level-0 { --color-contribution: var(--color-surface); }
        &.level-1 { --color-contribution: var(--color-tertiary-darker); }
        &.level-2 { --color-contribution: var(--color-tertiary-dark); }
        &.level-3 { --color-contribution: var(--color-tertiary-subtle); }
        &.level-4 { --color-contribution: var(--color-tertiary); }
    }
</style>