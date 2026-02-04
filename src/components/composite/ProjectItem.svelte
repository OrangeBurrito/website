<script lang="ts">
    import Tag from "../base/Tag.svelte";
    import Image from "../base/Image.svelte";
    import { softwareTagColors } from '../../ts/types'
    import { getRelativeLocaleUrl } from "astro:i18n";

    let { project } = $props()
</script>

<div class="project">
<a href={getRelativeLocaleUrl("en", "projects/" + project.id)}>
    {#if project.data.coverIcon}
    <div class="cover-icon">
        <Image src={project.data.coverIcon} alt="{project.data.title} Thumbnail" type="pixelated" width="72px" />
    </div>
    {/if}
    <div class="info">
        <h4 class="title">{project.data.title}</h4>
        <p class="description">{project.data.shortDesc}</p>
        <div class="for">
            {#if project.data.client}
                <div class="client">For <strong>{project.data.client}</strong></div>
            {:else}
                <div class="side-project">Side Project</div>
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
        margin-bottom: var(--space-500);
    }

    .description {
        color: var(--color-text-heading);
        margin-bottom: var(--space-050);
    }

    .for {
        font-style: italic;
        margin-bottom: var(--space-150);
        color: var(--color-text-code);

        strong {
            color: var(--color-text-link);
        }
    }

    :global(body.retro .project .cover-icon) {
        height: auto;
        position: absolute;
        left: 0;
    }

    :global(body:not(.retro) .project .cover-icon) {
        display: none;
    }

    @media screen and (max-width: 600px) {
        .project {
            width: 100%;
        }

        :global(body.retro .project .cover-icon) {
            width: 72px;
            left: auto;
            right: 0;
        }
    }
</style>