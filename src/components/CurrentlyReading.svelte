<script lang="ts">
  import { getLatestStorygraphBook } from "../ts/playwright";

    const book = await getLatestStorygraphBook()
</script>

<div class="currently-reading">
  <h3>Currently Reading</h3>
    <img src="" alt="">
    <pre>
      {JSON.stringify(book,null,2)}
    </pre>
</div>

<style>
  .title {
    font-family: var(--font-family-body-serif);
    font-size: var(--font-size-subtitle);
    max-width: 20ch;
  }
</style>