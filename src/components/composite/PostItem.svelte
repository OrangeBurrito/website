<script lang="ts">
	import Image from '../base/Image.svelte'
	import Date from '../base/Date.svelte'
	import Tag from '../base/Tag.svelte'
	import { postTagColors } from '../../ts/types'

	type Props = {
		post: any
		image?: boolean
	}

	const { post, image }: Props = $props()
</script>

<div class="post">
<a class="flex fill-y gap-none hover" href={`/post/${post.id}`}>
	<div class="tags-vertical tags flex vertical gap-none">
		{#each post.data.tags as tag}
			<Tag color={postTagColors[tag]} vertical={true} />
		{/each}
	</div>
	{#if image === true}
		<div class="image">
			<Image width="80px" src={post.data.coverImage} alt={post.data.title} />
		</div>
	{/if}
	<div class="info flex vertical between gap-small">
		<div class="container-text flex-y-t">
			<h4 class="title text-hover">{post.data.title}</h4>
			<Date date={post.data.publishedDate} length='long' />
			<p class="description">{post.data.description}</p>
			<img class="img-icon" src="/images/clock_icon.png" alt="">
		</div>
		{#if image !== true}
		<div class="tags-horizontal tags flex gap-none">
		{#each post.data.tags as tag}
				<Tag color={postTagColors[tag]} />
			{/each}
		</div>
	{/if}
</a>
</div>

<style>
	.post {
		position: relative;

		.title {
			margin-bottom: var(--space-050);
		}
		
		.description {
			max-width: 40ch;
			margin-top: var(--space-075);
			margin-bottom: 0;
		}
		
		.image {
			width: 80px;
			margin-right: var(--space-200);
		}

		.tags {
			margin-right: var(--space-100);
		}

		.tags-horizontal {
			width: 25%;
			margin-right: 0;
		}

		&:not(:has(.image)) {
			.tags-vertical {
				display: none;
			}
		}
	}

	@media (max-width: 600px) {
		.tags-horizontal {
			display: none;
		}

		.post:not(:has(.image)) .tags-vertical {
			display: flex;
			margin-right: var(--space-150);
		}
	}

	:global(body.retro .post) {
		&:hover {
			.post-icon {
				bottom: var(--space-200);
			}
		}
	}

	:global(body.retro .post-icon) {
		position: absolute;
		width: 30%;
		bottom: 0;
		z-index: -1;
		transition: bottom var(--transition-fast);

		img {
			max-width: 100%;
			max-height: 100%;
			object-fit: cover;
		}
	}

	:global(body.retro .img-icon) {
		display: block;
	}

	:global(body:not(.retro) .post-icon),
	:global(body:not(.retro) .img-icon) {
		display: none;
	}
</style>