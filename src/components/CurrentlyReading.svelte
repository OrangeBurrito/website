<script lang="ts">
  import { getLatestStorygraphBook } from "../ts/playwright";
  import Link from "./Link.svelte";

  const book = await getLatestStorygraphBook();
</script>

<div class="currently-reading">
  {#if book.title && book.coverImage && book.authors}
    <h3>Currently Reading</h3>
    <div class="book">
      <img class="cover" src={book.coverImage} alt="" />
      <div class="text">
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
      margin-bottom: var(--space-xs);
    }
  }
</style>
