<script lang="ts">
    
type DateLength = 'short' | 'default' | 'long' | 'monthonly'

type Props = {
    date: Date | string
    length?: DateLength
    class?: string
    locale?: string
}


const { date, length = 'default', class: className, locale }: Props = $props()

const options: Record<DateLength, Intl.DateTimeFormatOptions> = {
    short: { year: 'numeric', month: 'short' },
    default: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    monthonly: { month: 'long', year: 'numeric' }
}

const localDate = date instanceof Date
    ? date
    : new globalThis.Date(date)

// let autoLocale = Astro.cookies.get('language')?.value == 'th'
//     ? 'th-TH'
//     : 'en-US'
</script>

<div class={`date ${className != null ? className : ''}`}>
    <time datetime={date as string}>{localDate.toLocaleDateString(locale, options[length])}</time>
</div>

<style>
    .date {
        font-size: var(--font-size-label);
        font-weight: 500;
        text-transform: uppercase;
        color: var(--color-secondary-light);
    }
    
    :global(body.retro .date) {
        display: inline-block;
        font-size: var(--font-size-subtitle);
        font-family: var(--font-family-heading);
        text-transform: none;
        line-height: 0;
        color: var(--color-primary);
        margin-top: var(--space-300);
    }
</style>