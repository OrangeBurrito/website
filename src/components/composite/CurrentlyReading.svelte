<script lang="ts">
  import { onMount } from "svelte";
  import Link from "../base/Link.svelte";

  let book = { title: '', coverImage: '', authors: [] }
  let loading = true
  let error = false
  
  onMount(async () => {
    try {
      const response = await fetch(`/.netlify/functions/currentlyReading`)
      if (!response.ok) {
        error = true
        return
      }
      book = await response.json()
    } catch (err) {
      error = true
    } finally {
      loading = false
    }
  })
</script>

<div class="currently-reading col-fill row-full">
  <h3>Currently Reading</h3>
  {#if loading}
    <p>Loading current book...</p>
  {:else if error}
    <p>Book not found</p>
  {:else}
    <div class="book flex gap-200">
      <img class="cover" src={book.coverImage} alt="" />
      <div class="text flex-col gap-100">
        <h2 class="title">{book.title}</h2>
        <div class="authors">
          {#each book.authors as author}
            <div class="author">{author}</div>
          {/each}
        </div>
        <Link href="https://app.thestorygraph.com/profile/orangeburrito" external={true}>Details</Link>
      </div>
    </div>
  {/if}
</div>

<style>
  h3 {
    margin-bottom: var(--space-150);
  }

  .book {

    .cover {
      height: 144px;
      padding: var(--space-100);
      border: 4px solid var(--color-border-light);
    }

    .text {
    }

    .title {
      max-width: 10ch;
      font-family: var(--font-family-body-serif);
      font-size: var(--font-size-subtitle);
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
