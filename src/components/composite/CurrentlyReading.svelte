<script lang="ts">
  import { onMount } from "svelte";
  import Link from "../base/Link.svelte";

  type Book = {
    title: string;
    coverImage: string;
    author: string;
  };

  let book = $state<Book | null>(null);
  let loading = $state(true);
  let error = $state(false);
  // book = {"title":"The Black Dahlia","coverImage":"https://cdn.thestorygraph.com/lezw5wpt2p8zct9keglrheumcbx3","author":"James Ellroy"}

  onMount(async () => {
    try {
      const response = await fetch(`/.netlify/functions/currentlyReading`);
      console.log(response);
      if (!response.ok) {
        error = true;
        return;
      }
      book = await response.json();
      console.log(book);
    } catch (err) {
      error = true;
    } finally {
      loading = false;
    }
  });

  type Props = {
    large?: boolean;
  };

  let { large = false } = $props();
</script>

<div class="currently-reading status-item-data col-fill row-full">
  {#if loading}
    <p>Loading current book...</p>
  {:else if error}
    <p>Book not found</p>
  {:else if book}
    <div class="book flex gap-200 {large ? 'large' : ''}">
      <img class="cover" src={book.coverImage} alt="" />
      <div class="text flex-col gap-100">
        <div class="label">Currently Reading</div>
        <h3 class="title">{book.title}</h3>
        <div class="author">{book.author}</div>
        {#if large}
        <Link
          href="https://app.thestorygraph.com/profile/orangeburrito"
          external={true}>Details</Link
        >
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .book {
    &:not(.large) {
      flex-direction: row-reverse;
      justify-content: space-between;

      .cover {
        height: 64px;
        width: 64px;
        object-fit: cover;
        object-position: top center;
      }

      .author {
        color: var(--color-secondary-light);
      }
    }

    .title {
      color: var(--color-text-heading);
    }

    &.large {
      .label {
        display: none;
      }

      .title {
        font-size: var(--font-size-subheading);
        max-width: 10ch;
      }

      .cover {
        height: 144px;
        padding: var(--space-100);
        border: 4px solid var(--color-border);
      }
    }
  }
</style>
