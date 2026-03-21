<script lang="ts">
  import Icon from '../base/Icon.svelte'
  import Menu from '../base/Menu.svelte'
</script>

<header class="logo-header col-full">
  <a href="/">
    <h1 class="title">OrangeBurrito</h1>
    <p class="slogan large">the <span id="spice">spice</span> must flow</p>
  </a>
  <div class="menu-btn">
    <Menu/>
  </div>
</header>

<style>
  .logo-header {
    position: relative;
    transition: transform var(--transition-slow);

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
      transition: color var(--transition-slow);
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
    .logo-header {
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

    .logo-header #menu {
      display: flex;
    }
  }

  :global(body.retro .logo-header) {
    font-family: var(--font-family-retro);
  } 

  /* @media screen and (max-width: 600px) {
    .logo-header {
      .title {
        font-size: var(--font-size-subtitle);
      }

      .slogan {
        font-size: var(--font-size-subtitle);
      }
    }
  } */
</style>
