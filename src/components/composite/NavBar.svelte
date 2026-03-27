<script lang="ts">
	import { useTranslations, type Languages } from '../../ts/i18n.ts'
  import Image from '../base/Image.svelte';
	type Props = {
		currentPath: string;
		lang: Languages;
	}

	let { currentPath, lang }: Props = $props()

	const t = useTranslations(lang)
</script>

<nav id="navbar" class="row-2">
	<a id="index" class="button-link" href="/" class:active={currentPath === '/'}>{t('nav.home')}</a>
	<a id="posts" class="button-link" href="/posts" class:active={currentPath.startsWith('/post')}>{t('nav.posts')}</a>
	<a id="projects" class="button-link" href="/projects" class:active={currentPath.startsWith('/project')}>{t('nav.projects')}</a>
	<a id="about" class="button-link" href="/about" class:active={currentPath === '/about'}>{t('nav.about')}</a>
	<div class="motif">
		<Image src="/images/motifs/home.png" alt="Navbar decorative image" />
	</div>
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

		.motif {
			display: none;
			position: absolute;
			bottom: 10%;
			left: 10%;
			width: 50%;
			transform: scaleX(-1);
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
			z-index: -1;
			background-image: linear-gradient(#0c162b, var(--color-background));
			position: absolute;
			width: 100%;
			height: 100dvh;
			top: 0;
			left: 0;
			opacity: 0;
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			padding: var(--space-300);
			padding-top: calc(85px + var(--space-300));
			transition: var(--transition-medium);
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
						font-size: var(--font-size-heading);
						height: var(--font-size-heading);
						margin-top: -6px;
				}
				}
			}

			.motif {
				display: block;
			}
		}

		:global(#navbar.open) {
			z-index: 2;
			opacity: 1;
		}

		:global(body.retro #navbar a.active::after) {
			right: calc(-1 * var(--space-500));

		}
	}
</style>