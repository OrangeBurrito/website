<script lang="ts">
	import { useTranslations, type Languages } from '../../ts/i18n.ts'
	type Props = {
		currentPath: string;
		lang: Languages;
	}

	let { currentPath, lang }: Props = $props()

	const t = useTranslations(lang)
</script>

<nav id="navbar" class="row-2">
	<a id="index" class="button-link" href="/" class:active={currentPath === '/new'}>{t('nav.home')}</a>
	<a id="posts" class="button-link" href="/posts" class:active={currentPath === '/posts'}>{t('nav.posts')}</a>
	<a id="projects" class="button-link" href="/projects" class:active={currentPath === '/projects'}>{t('nav.projects')}</a>
	<a id="about" class="button-link" href="/about" class:active={currentPath === '/about'}>{t('nav.about')}</a>
</nav>

<style>
	#navbar {
		z-index: 3;
		a {
			display: block;
			position: relative;
			width: fit-content;
			margin-bottom: var(--space-075);
			font-family: var(--font-family-heading);
			transition: all var(--transition-fast);
			color: var(--color-primary);

			&.active, &.active:hover {
				color: var(--color-text-heading);
				border-color: var(--color-text-link-hover);

				&::before {
					content: "> ";
					font-weight: bold;
					font-size: var(--font-size-subheading);
				}
			}
		}
	}

	:global(body.retro #navbar a) {
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
		#navbar {
			height: 100dvh;
			display: none;
			flex-direction: column;
			align-items: flex-end;
			overflow: hidden;
			
			a {
				font-size: var(--font-size-subheading);
				padding: var(--space-075) var(--space-300);
				margin-right: calc(-1 * var(--padding-container));
				margin-bottom: 0;

				&.active, &.active:hover {
					display: flex;
					align-items: center;
					gap: var(--space-100);

					&::before { content: ""; }
					&::after {
						content: " <";
						font-weight: bold;
						font-size: var(--font-size-subheading);
				}
				}
			}
		}
		
		:global(#navbar.open) {
			display: flex;
		}

		:global(body.retro #navbar a.active::after) {
			right: calc(-1 * var(--space-500));

		}
	}
</style>