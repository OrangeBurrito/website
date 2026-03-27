<script lang="ts">
    import Image from "../base/Image.svelte";
    import Date from "../base/Date.svelte";
    import { softwareTagColors } from '../../ts/types'
    import type { Project } from '../../content.config';
    import Tag from "../base/Tag.svelte";

    interface Props {
        project: Project
        large?: boolean
    }

    const { project, large }: Props = $props()
</script>

<div class={`${`project${large ? ' large' : ''}`}`}>
<a class="flex gap-large hover" href={`/project/${project.id}`}>
    {#if project.data.coverIcon}
    <div class="icon">
        <Image src={project.data.coverIcon} alt={`${project.data.title} Thumbnail`} width="64px" contain />
    </div>
    {/if}
    <div class="info flex vertical gap-none">
    {#if large}
        <h2 class="title small text-hover">{project.data.title}</h2>
    {:else}
        <h4 class="title text-hover">{project.data.title}</h4>
    {/if}
    <div class="metadata flex vertical gap-none">
        <div class="dates flex gap-xsmall">
            <Date date={project.data.startDate} length='short' />
            <p class="label">—</p>
            {#if project.data.endDate}
            <Date date={project.data.endDate} length='short' />
            {:else}
            <p class="label">Present</p>
            {/if}
        </div>
        <p class="description">{project.data.shortDesc}</p>
    </div>
    {#if large}
            <div class="cover-image">
                <Image src={project.data.coverImage} alt={`${project.data.title} Thumbnail`} />
            </div>
        {/if}
        <div class="tags flex gap-none">
        {#each project.data.tags as tag}
            <Tag color={softwareTagColors[tag]}/>
        {/each}
        </div>
    </a>
</div>

<style>
    .project {
        position: relative;

        > a {
            height: 100%;
        }

        .info {
            width: 100%;
        }

        .icon {
            position: absolute;
            top: 0;
            left: calc((64px + var(--space-200)) * -1);
        }

        .cover-image {
            width: 100%;
            height: 100%;
            margin-bottom: var(--space-100);
            overflow: hidden;
        }

        &:not(.large) {
            width: 80%;
        }

        &.large {
            height: 0;
            min-height: 100%;

            .metadata {
                flex-direction: column-reverse;

                .description {
                    margin-bottom: var(--space-050);
                }
                .dates {
                    margin-bottom: var(--space-150);
                }
            }
        }
    }

    
    :global(body.retro .project .icon) {
        height: auto;
        position: absolute;
        left: 0;
    }

    @media screen and (max-width: 600px) {
        .project {
            width: 100%;

            .icon {
                position: relative;
                left: 0;
            }

            .cover-image {
                max-height: 200px;
            }

            &:not(.large) {
                width: 100%;
            }

            :global(.project:not(.large) .icon img) {
                width: 48px;
            }

            &.large {
                height: auto;
                min-height: auto;
                margin-right: 0;
                .icon {
                    position: absolute;
                    right: 0;
                    left: auto;
                }
            }
        }

        :global(body.retro .project .icon) {
            width: 64px;
            left: auto;
            right: 0;
        }
    }
</style>

