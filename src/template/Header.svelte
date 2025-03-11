<script>
    let { title, subtitle } = $props();
</script>

<div class="header">
  <h2 class="title">{title}</h2>
  <h3 class="subtitle">{subtitle}</h3>
</div>

<style>
    .header {
        font-family: var(--font-family);
    }
    h2 {
        font-weight: var(--font-weight-bold);
        line-height: var(--line-height-120);
        color: var(--darkText);
        margin-top: 0px;
    }
    h3 {
        font-weight: var(--font-weight-regular);
        line-height: var(--line-height-120);
        color: var(--lightText);
        margin: 0px;
    }
    @media only screen and (max-width: 400px) {
    .header {
        padding-top: var(--space-s-xl);
        padding-bottom: var(--space-s-xl);
    }
    h2 {
        font-size: var(--font-size-s-l);
        margin-bottom: var(--space-s-xxs)
    }
    h3 {
        font-size: var(--font-size-s-m)
    }
  }
  @media only screen and (min-width: 400px) and (max-width: 700px){
    .header {
        padding-top: var(--space-m-xl);
        padding-bottom: var(--space-s-xl);
    }
    h2 {
        font-size: var(--font-size-m-l);
        margin-bottom: var(--space-s-xxs);
    }
    h3 {
        font-size: var(--font-size-m-m)
    }
  }
  @media only screen and (min-width: 700px){
    .header {
        padding-top: var(--space-l-xl);
        padding-bottom: var(--space-s-xl);
    }
    h2 {
        font-size: var(--font-size-l-l);
        margin-bottom: var(--space-s-xxs);
    }
    h3 {
        font-size: var(--font-size-l-m)
    }
  }
</style>
