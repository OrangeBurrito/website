<script lang="ts">
	type Props = {
		currentPath: string;
	}

	let { currentPath }: Props = $props()
</script>

<nav class="navbar">
	<a id="index" href="/" class:active={currentPath === '/'}>Home</a>
	<a id="posts" href="/posts" class:active={currentPath === '/posts'}>Blogposts</a>
	<a id="projects" href="/projects" class:active={currentPath === '/projects'}>Projects</a>
	<a id="about" href="/about" class:active={currentPath === '/about'}>About</a>
</nav>

<style>
	.navbar {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	a {
		font-family: var(--font-family-header);
		font-size: var(--space-mlg);
		transition: all 0.08s ease-in-out;
		position: relative;
		width: fit-content;
	}

	a:hover, a.active:hover {
		color: var(--color-secondary);
		border-left: 3px solid var(--color-text-link);
		border-bottom: 3px solid var(--color-text-link);
		padding: 0 0 3px 6px;
	}

	a.active, a.active:hover {
		color: var(--color-text-heading);
		border-color: var(--color-text-link-hover);
	}

	a.active::after {
		content: "";
		position: absolute;
		right: calc(-1 * var(--space-lg));
		top: 50%;
		transform: translateY(-50%);
		width: 24px;
		height: 24px;
		background-image: url('/images/hand_icon.png');
		image-rendering: pixelated;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
	}

	a.deactivated {
		color: var(--color-text-code);
		text-decoration: line-through;
		pointer-events: none;
	}

	@media screen and (max-width: 600px) {
		.navbar {
			display: grid;
			grid-template-columns: 1fr 1fr;
			margin-top: var(--space-base);
			margin-bottom: calc(-1 *var(--space-lg));
		}

		.navbar a {
			&.active::after {
				right: calc(-1 * var(--space-xl));
			}
		}
	}
</style>