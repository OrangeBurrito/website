<script lang="ts">
    import Button from './Button.svelte'
    import Icon from './Icon.svelte'
    import Image from './Image.svelte'

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
        padding-bottom: var(--space-xs);
        margin-top: var(--space-md);
        transition: margin-top var(--transition-slow);
        
        .title {
            font-family: var(--font-family-header);
            font-size: var(--font-size-subheading);
            text-transform: uppercase;
            color: var(--color-text-code);
        }
        
        .settings {      
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: var(--space-base);
            
        }
    }

    :global(.site-settings button) {
        --size-icon: var(--space-mlg);
    }
    
    :global(.site-settings button svg) {
        fill: var(--color-text-heading);
    }

    :global(.site-settings button:first-of-type) {
        margin-bottom: -2px;
    }

    @media (max-width: 600px) {
        .site-settings {
            width: calc(100% - var(--space-lg));
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: var(--space-lg);
            width: fit-content;
            position: absolute;
            top: var(--space-base);
            right: var(--space-lg);

            .title {
                display: none;
            }
        }
    }
</style>