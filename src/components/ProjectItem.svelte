<script lang="ts">
  import Button from "./Button.svelte";

    let { project } = $props()
</script>

<div class="project hover-slide">
    <div class="info">
        <h2 class="title">{project.data.title}</h2>
        <div class="description">{project.data.description}</div>
        <div class="for">
            {#if project.data.client}
                <div class="client">For <a href={project.data.clientUrl} target="_blank">{project.data.client}</a></div>
                {#if project.data.contractor}
                    <div class="contractor">Subcontracted Under <a href={project.data.contractorUrl} target="_blank">{project.data.contractor}</a></div>
                {/if}
            {/if}
        </div>
    </div>
    <Button type="secondary" size="small" link="/projects/{project.id}">Details ></Button>
</div>

<style>
    .project {
        width: fit-content;
        margin-bottom: var(--space-lg);
    }

    .info {
        margin-bottom: var(--space-base);
    }

    .description {
        margin-bottom: var(--space-sm);
    }
    
    .for {
        color: var(--code-shade);
        font-style: italic;
    }
</style>