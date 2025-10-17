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
		gap: var(--space-size-xs);
	}
	a {
		font-family: var(--font-family-header);
		font-size: var(--space-size-mlg);
		transition: all 0.08s ease-in-out;
		position: relative;
		width: fit-content;
	}

	a:hover, a.active {
		color: var(--color-text-heading);
	}

	a.active::after {
		content: "";
		position: absolute;
		right: calc(-1 * var(--space-size-lg));
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
			margin-top: var(--space-size-base);
			margin-bottom: calc(-1 *var(--space-size-lg));
		}

		.navbar a {
			color: var(--color-text-code);

			&.active::after {
				right: calc(-1 * var(--space-size-xl));
			}
		}
	}
</style>