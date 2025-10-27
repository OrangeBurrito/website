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

    function toggleTheme() {
        if (dark) {
            document.cookie = 'theme=light'
            dark = false
        } else {
            document.cookie = 'theme=dark'
            dark = true
        }
    }

    function toggleLanguage() {
        console.log("Toggling language from", currentLang)
        if (currentLang === 'en') {
            document.cookie = 'language=th'
            currentLang = 'th'
        } 
        else {
            document.cookie = 'language=en'
            currentLang = 'en'
        }
        window.location.reload()
    }
</script>

<div class="site-settings">
    <Button type="passthrough" onclick={toggleTheme} attr={dark ? 'Toggle Light Mode' : 'Toggle Dark Mode'}>
        {#if dark}
            <Icon icon="moon" />
        {:else}
            <Icon icon="sun" />
        {/if}
    </Button>
    <Button type="passthrough" onclick={toggleLanguage} attr={currentLang === 'th' ? 'Change Language' : 'เปลี่ยนภาษา'}>
        <Image type="pixelated" src={currentLang === 'th' ? '/icons/lang-th.png' : '/icons/lang-en.png'} alt="Language Flag" width="32px" />
    </Button>
</div>

<style>
    .site-settings {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: var(--space-dlg);
    }

    :global(.site-settings button svg) {
        --size-icon: var(--space-mlg);
    }
</style>