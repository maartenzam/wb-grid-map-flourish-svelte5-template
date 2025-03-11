<script>
  import logo from './world-bank-logo.png'
  let { notesTitle, notes, includeLogo } = $props()
</script>

<div class="footer">
    <div class="notes"><span class="notes-title">{notesTitle}</span>{notes}</div>
  {#if includeLogo}
    <div class="logo"><img src={logo} alt="World Bank logo"/></div>
  {/if}
</div>

<style>
    .footer {
        font-family: var(--font-family);
        display: flex;
    }
    .notes-title {
        font-weight: var(--font-weight-bold);
        color: var(--darkText);
    }
    .notes {
        font-weight: var(--font-weight-regular);
        line-height: var(--line-height-150);
        color: var(--lightText);
        flex: 1;
    }
    @media only screen and (max-width: 400px) {
    .footer {
        padding-bottom: var(--space-s-xl);
    }
    .notes {
        font-size: var(--font-size-s-s);
    }
  }
  @media only screen and (min-width: 400px) and (max-width: 700px){
    .footer {
        padding-bottom: var(--space-m-xl);
    }
    .notes {
        font-size: var(--font-size-m-s);
    }
  }
  @media only screen and (min-width: 700px){
    .footer {
        padding-bottom: var(--space-l-xl);
    }
    .notes {
        font-size: var(--font-size-l-s);
    }
  }
  div.logo img {
    height: 2rem;
  }
</style>
