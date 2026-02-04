<script lang="ts">
    import Button from '../base/Button.svelte'
    import Icon from '../base/Icon.svelte'
    import Image from '../base/Image.svelte'

    type Props = {
        dark: boolean
        lang: string
    }

    let { dark, lang }: Props = $props()

    let currentLang = $state(lang)
    let highContrast = $state(dark)

    function toggleTheme() {
        if (highContrast) {
            highContrast = false
            document.cookie = 'theme=contrast; path=/; max-age=31536000'
        } else {
            highContrast = true
            document.cookie = 'theme=dark; path=/; max-age=31536000'
        }
        window.location.reload()
    }

    function toggleLanguage() {
        if (currentLang === 'en') {
            document.cookie = 'language=th; path=/; max-age=31536000'
            currentLang = 'th'
        } 
        else {
            document.cookie = 'language=en; path=/; max-age=31536000'
            currentLang = 'en'
        }
        window.location.reload()
    }
</script>

<div class="site-settings">
    <div class="title">Settings</div>
    <div class="settings">
        <Button type="passthrough" onclick={toggleTheme} attr={highContrast ? 'Toggle High-Contrast Mode' : 'Toggle Dark Mode'}>
                <Icon icon={highContrast ? "moon" : "moon-star"}/>
        </Button>
        <Button type="passthrough" onclick={toggleLanguage} attr={currentLang === 'th' ? 'Change Language' : 'เปลี่ยนภาษา'}>
            <Image type="pixelated" src={currentLang === 'th' ? '/icons/lang-th.png' : '/icons/lang-en.png'} alt="Language Flag" width="32px" />
        </Button>
    </div>
</div>

<style>
    .site-settings { 
        padding-bottom: var(--space-100);
        margin-top: var(--space-250);
        transition: margin-top var(--transition-slow);
        
        .title {
            font-family: var(--font-family-heading);
            font-size: var(--font-size-body-large);
            text-transform: uppercase;
            color: var(--color-text-code);
        }
        
        .settings {      
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: var(--space-200);
            
        }
    }

    :global(.site-settings button) {
        --size-icon: var(--space-300);
    }
    
    :global(.site-settings button svg) {
        fill: var(--color-text-heading);
    }

    :global(.site-settings button:first-of-type) {
        margin-bottom: -2px;
    }

    @media (max-width: 600px) {
        .site-settings {
            width: calc(100% - var(--space-400));
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: var(--space-400);
            width: fit-content;
            position: absolute;
            top: var(--space-200);
            right: var(--space-400);

            .title {
                display: none;
            }
        }
    }
</style>