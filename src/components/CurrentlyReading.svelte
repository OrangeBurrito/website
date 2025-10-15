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