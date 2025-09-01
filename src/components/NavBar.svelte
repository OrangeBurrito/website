<script lang="ts">
	type Props = {
		currentPath: string;
	}

	let { currentPath }: Props = $props()
</script>

<nav class="navbar">
	<a id="index" href="/" class:active={currentPath === '/'}>Home</a>
	<a id="projects" href="/projects" class:active={currentPath === '/projects'}>Projects</a>
	<a id="resources" href="/resources" class:active={currentPath === '/resources'}>Resources</a>
	<a id="about" href="/about" class:active={currentPath === '/about'}>About</a>
</nav>

<style>
	.navbar {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	a {
		font-family: var(--font-header);
		font-size: var(--space-mlg);
		transition: all 0.08s ease-in-out;
		position: relative;
		width: fit-content;
	}

	a:hover, a.active {
		color: var(--header-shade);
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
		color: var(--code-shade);
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
			color: var(--code-shade);

			&.active::after {
				right: calc(-1 * var(--space-xl));
			}
		}
	}
</style>