<script lang="ts">
  import Icon from "./Icon.svelte";

  let open = $state(false)

  function toggleMenu() {
    const navbar = document.getElementById('navbar')
    if (!navbar) return

    open = !open
    navbar.classList.toggle('open', open)
    document.body.classList.toggle('locked', open)
  }
</script>

<button id="menu" class="hidden-desktop flex center-y" onclick={toggleMenu}
  aria-label="Toggle navigation menu"
  aria-expanded={open}
  aria-controls="navbar"
>
  <span class:hidden={open} aria-hidden={open}>
    <Icon size="large" icon="menu" />
  </span>
  <span class:hidden={!open} aria-hidden={!open}>
    <Icon size="large" icon="cross" />
  </span>
</button>

<style>
  #menu {
    background: none;
    border: none;
    padding: var(--padding-container-small);
    position: relative;
    width: calc(var(--space-400) + (2 * var(--padding-container-small)));
    height: calc(var(--space-400) + (2 * var(--padding-container-small)));
  }

  #menu > span {
    position: absolute;
    inset: var(--padding-container-small);
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
</style>
