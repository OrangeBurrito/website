<script lang="ts">
  import { onMount } from "svelte";
  import Link from "../base/Link.svelte";
  import Image from "../base/Image.svelte";
  import type { BookData } from "../../../netlify/functions/currentlyReading";

  let book = $state<BookData | null>(null);
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

<div class="currently-reading status-item {large ? 'large' : ''} col-fill row-full {loading ? 'loading' : ''}">
  {#if loading}
    <div class="loading">Loading current book...</div>
  {:else if error}
    <p>Book not found</p>
  {:else if book}
    <div class="book flex">
    <a class="image-link" href="https://app.thestorygraph.com/profile/orangeburrito" target="_blank">
      <Image src={book.coverImage} alt={book.title} />
    </a>
      <div class="text flex vertical gap-xsmall">
        <div class="label">Currently Reading</div>
        <h3 class="title">{book.title}</h3>
        <div class="author">{book.author}</div>
        {#if large}
        <!-- <div class="percentage">
          <div class="bar" style="width: {book.percentage};">{book.percentage}</div>
        </div> -->
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
  .currently-reading {
    --color-surface-status: var(--color-surface);

    &.large {
      --color-surface-status: transparent;
      padding: 0;

      .label {
        display: none;
      }

      .title {
        font-size: var(--font-size-subheading);
        max-width: 10ch;
        margin-bottom: 0;
      }

      .author {
        font-size: var(--font-size-body-large);
      }

      .image-link {
        padding: 0;
        &::after {
          display: none;
        }
      }

      /* .percentage {
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
      } */
    }

    &:not(.large) {
      .book {
        flex-direction: row-reverse;
        justify-content: space-between;
  
        .author {
          color: var(--color-secondary-light);
        }
      }
    }
  }

  .book {

    .title {
      color: var(--color-text-heading);
    }

    .author {
      margin-bottom: var(--space-050);
    }

  }

  @media screen and (max-width: 600px) {
    .currently-reading.large .title {
      max-width: 100%;
      font-size: var(--space-350);
      margin-bottom: var(--space-050);
    }
  }

  :global(.currently-reading.large .image-link img) {
    height: 144px;
    width: auto;
    padding: var(--space-100);
    border: 4px solid var(--color-border);
  }
  :global(.currently-reading:not(.large) .image-link .image) {
    width: 64px;
    height: 64px;
  }
</style>
