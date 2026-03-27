<script lang="ts">
  import Icon from '../base/Icon.svelte'
  import Menu from '../base/Menu.svelte'
</script>

<header class="site-header col-full">
  <a href="/">
    <h1 class="title">OrangeBurrito</h1>
    <p class="slogan large">the <span id="spice">spice</span> must flow</p>
  </a>
  <div class="menu-btn">
    <Menu/>
  </div>
</header>

<style>
  .site-header {
    position: relative;
    transition: transform var(--transition-slow);
    z-index: 4;

    .title {
      /* font-family: var(--font-family-logo); */
      /* font-size: var(--font-size-headline); */
      color: var(--color-text-heading);
      text-transform: uppercase;
	    margin-bottom: 0;
      font-size: var(--font-size-heading-huge);
    }

    .slogan {
      color: var(--color-secondary);
      font-weight: 500;
      transition: var(--transition-fast);
    }

    a:hover {
      .slogan {
        color: var(--color-text-link);
      }
    }
    
    .menu-btn {
      margin-right: calc(var(--space-100) * -1);
    }
  }

  @media screen and (max-width: 600px) {
    .site-header {
      display: flex;
      justify-content: space-between;
      background: var(--color-background-alt);
      padding: var(--padding-container-small);
      margin: calc(var(--padding-container) * -1);
      margin-bottom: auto;

      .slogan {
        line-height: 1;
      }
    }

    .site-header #menu {
      display: flex;
    }
  }

  :global(body.retro .site-header) {
    font-family: var(--font-family-retro);
  } 

  /* @media screen and (max-width: 600px) {
    .site-header {
      .title {
        font-size: var(--font-size-subtitle);
      }

      .slogan {
        font-size: var(--font-size-subtitle);
      }
    }
  } */
</style>
