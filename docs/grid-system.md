# Grid System (global2.css)

8x8 CSS subgrid. Elements size themselves via cascading CSS variables.

## Variables
| Variable | Purpose |
|----------|---------|
| `--local-cols/rows` | Element's own span (set by self-sizing classes) |
| `--parent-cols/rows` | Available space for fractional sizing (set by layout) |
| `--child-cols/rows` | Uniform child sizing (set by container classes) |

## Classes

| Class Pattern | Effect |
|---------------|--------|
| `.self-colN`, `.self-rowN` | Element spans N columns/rows |
| `.rows-half`, `.cols-third` | Fractional sizing based on parent |
| `.colsN`, `.rowsN` | All children span N (container class) |
| `.col-fill`, `.row-fill` | Span full parent dimension |
| `.row-rest` | Span remaining rows (parent - 1) |
| `.colN`, `.rowN` | Explicit span N |
| `.heading` | 1 row, align bottom |
| `.grid-list` | 2-column regular grid for items |

## Example

```astro
<div class="posts subgrid rows-half">
  <h2 class="col-fill heading">Posts</h2>
  <div class="grid-list col-fill row-rest">
    {posts.map(post => <PostItem {post} />)}
  </div>
</div>
```

## Notes

- Wildcard selectors exclude elements with explicit classes (`.row-rest` won't be overridden)
- `.grid-list` uses regular grid, not subgrid (for flowing items into columns)
