<script>
    export let tooltipHeader
    export let tooltipBody
</script>

<div class="tooltip-container">
<h3 class={"tooltip-header"}>{tooltipHeader}</h3>
<div class={"tooltip-content"}>{tooltipBody}</div>
</div>

<style>
.tooltip-container {
    font-family: var(--font-family);
}
h3.tooltip-header {
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-120);
    color: var(--darkText);
    border-bottom: 1px solid var(--lighter);
    margin-top: 0px;
  }
  div.tooltip-content {
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-120);
    color: var(--darkText);
  }

  @media only screen and (max-width: 400px) {
    .tooltip-header {
        font-size: var(--font-size-s-s);
        padding-bottom: var(--space-s-xxs);
        margin-bottom: var(--space-s-xxs);
    }
    .tooltip-content {
        font-size: var(--font-size-s-m);
    }
  }
  @media only screen and (min-width: 400px) and (max-width: 700px){
    .tooltip-header {
        font-size: var(--font-size-m-s);
        padding-bottom: var(--space-m-xxs);
        margin-bottom: var(--space-m-xxs);
    }
    .tooltip-content {
        font-size: var(--font-size-m-m);
    }
  }
  @media only screen and (min-width: 700px){
    .tooltip-header {
        font-size: var(--font-size-l-s);
        padding-bottom: var(--space-l-xxs);
        margin-bottom: var(--space-l-xxs);
    }
    .tooltip-content {
        font-size: var(--font-size-l-m);
    }
  }
</style>

