<script lang="ts">
    import Tag from "./Tag.svelte";
    import Image from "./Image.svelte";
    import { softwareTagColors } from '../ts/types'


    let { project } = $props()
</script>

<div class="project hover-slide">
<a href="/projects/{project.id}">
    {#if project.data.coverIcon}
    <div class="cover-icon">
        <Image src={project.data.coverIcon} alt="{project.data.title} Thumbnail" type="pixelated" width={80} />
    </div>
    {/if}
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
        position: relative;
        margin-bottom: var(--space-xl);
    }

    .description {
        color: var(--color-text-heading);
        margin-bottom: var(--space-xxs);
    }
    
    .for {
        font-style: italic;
        margin-bottom: var(--space-sm);
        color: var(--color-text-code);
        
        strong {
            color: var(--color-text-link);
        }
    }

    .tags {
        margin-bottom: 0;
    }

    :global(.project .cover-icon) {
        height: auto;
        position: absolute;
        left: 0;
    }

    @media screen and (max-width: 600px) {
        .project {
            width: 100%;
        }

        .project .cover-icon {
            width: 72px;
            left: auto;
            right: 0;
        }
    }
</style>