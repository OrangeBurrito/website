<script lang="ts">
  import Tag from "./Tag.svelte";
    import { softwareTagColors } from '../ts/types'

    let { project } = $props()
</script>

<div class="project hover-slide">
<a href="/projects/{project.id}">
    <div class="info">
        <h2 class="title">{project.data.title}</h2>
        <p class="description">{project.data.shortDesc}</p>
        <div class="for">
            {#if project.data.client}
                <div class="client">For <strong>{project.data.client}</strong></div>
            {/if}
        </div>
        <div class="tags">
            {#each project.data.tags as tag}
            <Tag color={softwareTagColors[tag]}>{tag}</Tag>
            {/each}
        </div>
    </div>
    </a>
</div>

<style>
    .project {
        width: fit-content;
        margin-bottom: var(--space-size-xl);
    }

    .description {
        color: var(--color-text-heading);
        margin-bottom: var(--space-size-xxs);
    }
    
    .for {
        font-style: italic;
        margin-bottom: var(--space-size-sm);
        color: var(--color-text-code);
        
        strong {
            color: var(--color-text-link);
        }
    }

    .tags {
        margin-bottom: 0;
    }
</style>