<script lang="ts">
  import { onMount } from "svelte";
  import Link from "../base/Link.svelte";
  import Image from "../base/Image.svelte";

  type Book = {
    title: string;
    coverImage: string;
    author: string;
    percentage: string;
  };

  let book = $state<Book | null>(null);
  let loading = $state(true);
  let error = $state(false);

  onMount(async () => {
    try {
      const response = await fetch(`/.netlify/functions/currentlyReading`);
      if (!response.ok) {
        error = true;
        return;
      }
      book = await response.json();
      book!.percentage ="22%";
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
    <div class="book flex {large ? 'large' : ''}">
    <a class="image-link" href="https://app.thestorygraph.com/profile/orangeburrito" target="_blank">
    <div class="image">
      <Image src={book.coverImage} alt={book.title} />
    </div>
  </a>
      <div class="text flex vertical gap-xsmall">
        <div class="label">Currently Reading</div>
        <h3 class="title">{book.title}</h3>
        <div class="author">{book.author}</div>
        {#if large}
        <div class="percentage">
          <div class="bar" style="width: {book.percentage};">{book.percentage}</div>
        </div>
        <div class="link grow flex vertical end-y gap-xsmall">
          <Link
            href="https://app.thestorygraph.com/profile/orangeburrito"
            external={true}>Details</Link
          >
        </div>
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

      .author {
        color: var(--color-secondary-light);
      }
    }

    .title {
      color: var(--color-text-heading);
    }

    .author {
      margin-bottom: var(--space-050);
    }

    &.large {
      .label {
        display: none;
      }

      .title {
        font-size: var(--font-size-subheading);
        max-width: 10ch;
        margin-bottom: 0;
      }

      .image-link {
        padding: 0;
        &::after {
          display: none;
        }
      }

      .image {
        height: 144px;
        width: auto;
        padding: var(--space-100);
        border: 4px solid var(--color-border);
      }

      .percentage {
        width: 100%;
        background-color: var(--color-surface);

        .bar {
          min-width: fit-content;
          font-family: var(--font-family-heading);
          font-size: var(--font-size-body);
          font-weight: 700;
          padding: var(--space-050);
          background-color: var(--color-secondary);
          color: var(--color-background);
        }
      }
    }
  }
</style>
