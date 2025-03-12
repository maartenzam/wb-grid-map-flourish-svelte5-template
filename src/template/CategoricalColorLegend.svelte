<script>
  let { title, categoricalColorScale, includeNoData, noDataLabel } = $props()
  import { wbColors } from '../utils/colors';
</script>

<div class={'legend'}>
  <div class="legend-text-container">
    <div class="legend-title">
      <span>{title}</span>
    </div>
  </div>
  <div class="categorical-legend" aria-hidden="true">
    {#each categoricalColorScale.domain() as item}
        <div class="pill-container">
          <div
            class={`pill circle`}
            style:background-color={categoricalColorScale(item)}
          ></div>
          <div class={'label'}>{item}</div>
        </div>
    {/each}
    {#if includeNoData}
      <div class="pill-container">
        <div class={`pill circle`} style:background-color={wbColors.noData}></div>
        <div class={'label small'}>{noDataLabel}</div>
      </div>
    {/if}
  </div>
</div>

<style>
  .legend {
    font-family: var(--font-family);
  }
  .legend-text-container {
    display: flex;
  }
  .no-data-label {
    color: var(--lightText);
    line-height: var(--line-height-120);
  }
  .no-data-symbol {
    fill: var(--noData);
    stroke: var(--middle);
    stroke-width: 0.5px;
  }
  .legend-title {
    flex-grow: 1;
    text-align: center;
    font-weight: var(--font-weight-semibold);
    color: var(--darkText);
    line-height: var(--line-height-120);
    text-align: left;
  }
  .gradient-container {
    display: flex;
  }
  .gradient {
    flex-grow: 1;
  }
  .label-unit {
    font-weight: var(--font-weight-regular);
  }
  .gradient-border {
    stroke: var(--middle);
    stroke-width: 0.5px;
    fill: none;
  }
  .bin-color {
    stroke: var(--middle);
    stroke-width: 0.5px;
  }
  @media only screen and (max-width: 400px) {
    .legend {
      padding-bottom: var(--space-s-xl);
    }
    .legend-text-container,
    .gradient-container {
      gap: var(--space-s-xl);
    }
    div.label,
    .no-data-label {
      font-size: var(--font-size-s-s);
    }
    .legend-title {
      font-size: var(--font-size-s-m);
      margin-bottom: var(--space-s-xxs);
    }
  }
  @media only screen and (min-width: 400px) and (max-width: 700px) {
    .legend {
      padding-bottom: var(--space-m-xl);
    }
    .legend-text-container,
    .gradient-container {
      gap: var(--space-m-xl);
    }
    div.label,
    .no-data-label {
      font-size: var(--font-size-m-s);
    }
    .legend-title {
      font-size: var(--font-size-m-m);
      margin-bottom: var(--space-m-xxs);
    }
  }
  @media only screen and (min-width: 700px) {
    .legend {
      padding-bottom: var(--space-l-xl);
    }
    .legend-text-container,
    .gradient-container {
      gap: var(--space-l-xl);
    }
    div.label,
    .no-data-label {
      font-size: var(--font-size-l-s);
    }
    .legend-title {
      font-size: var(--font-size-l-m);
      margin-bottom: var(--space-l-xxs);
    }
  }
  .categorical-legend {
    display: flex;
    flex-flow: row wrap;
    justify-content: start;
    margin: 0;
    margin: var(--space-s) 0 0 0;
  }

  .categorical-legend.top {
    margin: 0 0 var(--space-s) 0;
  }
  .categorical-legend .pill-container {
    display: flex;
    align-items: center;
    margin: 0 15px 5px 0;
  }
  .categorical-legend .pill-container .pill {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    margin-right: 5px;
    border: 1px solid transparent;
  }
  .categorical-legend .pill-container .pill.square {
    border-radius: 0px;
  }
  .categorical-legend .pill-container .pill.line {
    height: 2.5px;
    width: 20px;
    border-radius: 2px;
  }
  .hidden {
    visibility: hidden;
  }
  :global(.banner .categorical-legend .label) {
    color: var(--color-theme-dark-text);
  }
</style>