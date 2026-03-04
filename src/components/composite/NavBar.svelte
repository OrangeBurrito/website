<script lang="ts">
	import { useTranslations, type Languages } from '../../ts/i18n.ts'
	type Props = {
		currentPath: string;
		lang: Languages;
	}

	let { currentPath, lang }: Props = $props()

	const t = useTranslations(lang)
</script>

<nav class="navbar row-2">
	<a id="index" href="/" class:active={currentPath === '/'}>{t('nav.home')}</a>
	<a id="posts" href="/posts" class:active={currentPath === '/posts'}>{t('nav.posts')}</a>
	<a id="projects" href="/projects" class:active={currentPath === '/projects'}>{t('nav.projects')}</a>
	<a id="about" href="/about" class:active={currentPath === '/about'}>{t('nav.about')}</a>
</nav>

<style>
	.navbar {

		a {
			position: relative;
			width: fit-content;
			font-family: var(--font-family-heading);
			font-size: var(--font-size-body-large);
			transition: all var(--transition-fast);
			color: var(--color-primary);

			&.active, &.active:hover {
				color: var(--color-text-heading);
				border-color: var(--color-text-link-hover);
			}
		}
	}

	:global(body.retro .navbar a) {
		font-size: var(--font-size-subtitle);
		font-weight: 400;

		&:hover, &.active:hover {
			color: var(--color-secondary);
			border-left: 3px solid var(--color-text-link);
			border-bottom: 3px solid var(--color-text-link);
			padding: 0 0 3px 6px;
		}

		&.active::after {
			content: "";
			position: absolute;
			right: calc(-1 * var(--space-400));
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
	}

	@media screen and (max-width: 600px) {
		.navbar {
			display: grid;
			grid-template-columns: 1fr 1fr;
			margin-bottom: calc(-1 * var(--space-400));
		}

		:global(body.retro .navbar a.active::after) {
			right: calc(-1 * var(--space-500));

		}
	}
</style>