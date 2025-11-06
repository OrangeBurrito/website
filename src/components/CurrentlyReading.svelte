<script lang="ts">
  import { onMount } from "svelte";
  import Link from "./Link.svelte";
  import { type Languages, useTranslations } from "../ts/i18n";

  let book = { title: '', coverImage: '', authors: [] }
  let loading = true
  let error = false
  
  onMount(async () => {
    loading = true
    const response = await fetch(`/.netlify/functions/currentlyReading`)
    book = await response.json()
    if (Object.keys(book).length === 0) {
      error = true
    }
    loading = false
  })
  
  let { lang }: { lang: Languages } = $props()

  const t = useTranslations(lang)
</script>

<div class="currently-reading">
  <h3>{t('text.currentlyReading')}</h3>
  {#if loading}
    <p>Loading current book...</p>
  {:else if error}
    <p>Book not found</p>
  {:else}
    <div class="book">
      <img class="cover" src={book.coverImage} alt="" />
      <div class="text">
        <h2 class="title">{book.title}</h2>
        <div class="authors">
          {#each book.authors as author}
            <div class="author">{author}</div>
          {/each}
        </div>
        <Link href="https://app.thestorygraph.com/profile/orangeburrito" external={true}>{t('text.currentlyReadingDetails')}</Link>
      </div>
    </div>
  {/if}
</div>

<style>
  h3 {
    margin-bottom: var(--space-sm);
  }

  .book {
    display: flex;
    gap: var(--space-base);

    .cover {
      height: 144px;
      padding: var(--space-xs);
      border: 4px solid var(--color-border-light);
    }

    .text {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }

    .title {
      max-width: 10ch;
      font-family: var(--font-family-body-serif);
      font-size: var(--font-size-heading);
      margin-bottom: 0;
    }

    .authors {
      flex-grow: 1;
    }

    .author {
      color: var(--color-text-code);
      font-style: italic;
      font-size: var(--font-size-body);
    }

    .author:not(:last-child)::after {
      content: ', ';
    }
  }
</style>
