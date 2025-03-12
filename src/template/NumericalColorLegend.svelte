<script>
  import { interpolate, quantize, interpolateRound } from 'd3-interpolate';

  let {
    units = '',
    title,
    unitLabel,
    numericalColorScale,
    tickLabels = [],
    linearOrBinned,
    binningMode,
    includeNoData,
    noDataLabel,
  } = $props();

  let tickSize = 12;
  let height = 12 + tickSize;
  const margin = {
    top: 0,
    right: 14,
    bottom: 4 + tickSize,
    left: 0,
  };

  let domain = $derived.by(() => {
    const d = numericalColorScale.domain();
    if (d.length == 2) {
      return [d[0], d[0] + (d[1] - d[0]) / 2, d[1]];
    } else {
      return d;
    }
  });

  function ramp(color, n = 256) {
    const canvas = document.createElement('canvas');
    canvas.width = n;
    canvas.height = 1;
    const context = canvas.getContext('2d');
    for (let i = 0; i < n; ++i) {
      context.fillStyle = color(i / (n - 1));
      context.fillRect(i, 0, 1, 1);
    }
    return canvas;
  }

  let n = $derived.by(() => {
    if (numericalColorScale.interpolate) {
      return Math.min(
        numericalColorScale.domain().length,
        numericalColorScale.range().length
      );
    }
    if (numericalColorScale.interpolator) {
      return;
    }
  });
  let x = $derived.by(() => {
    if (numericalColorScale.interpolate) {
      return numericalColorScale
        .copy()
        .rangeRound(
          quantize(interpolate(margin.left, gradientWidth - margin.right), n)
        );
    }
    if (numericalColorScale.interpolator) {
      return Object.assign(
        numericalColorScale
          .copy()
          .interpolator(interpolateRound(margin.left, gradientWidth - margin.right)),
        {
          range() {
            return [margin.left, gradientWidth - margin.right];
          },
        }
      );
    }
  });
  let href = $derived.by(() => {
    if (numericalColorScale.interpolate) {
      return ramp(
        numericalColorScale.copy().domain(quantize(interpolate(0, 1), n))
      ).toDataURL();
    }
    if (numericalColorScale.interpolator) {
      return ramp(numericalColorScale.interpolator()).toDataURL();
    }
  });

  let noDataWidth = $derived(includeNoData ? 70 : 0);
  let gradientWidth = $state(0);

  let discreteTicks = $derived(
    linearOrBinned == 'linear'
      ? []
      : binningMode == 'fixedWidth'
        ? numericalColorScale.thresholds()
        : numericalColorScale.quantiles()
  );
</script>

<div class={'legend'}>
  <div class="legend-text-container">
    {#if includeNoData}
      <div class="no-data-label" style:width={noDataWidth + 'px'}>
        {noDataLabel}
      </div>
    {/if}
    <div class="legend-title">
      <span>{title}</span>&nbsp;<span class="label-unit"
        >{unitLabel ? '(' + unitLabel + ')' : ''}</span
      >
    </div>
  </div>
  <div class="gradient-container">
    {#if includeNoData}
      <div class="no-data" style:width={noDataWidth + 'px'}>
        <div class="no-data-symbol" style:width={noDataWidth + 'px'}>
          <svg width={noDataWidth} {height} class="no-data-symbol">
            <rect
              class="no-data-rect"
              x={0}
              y={0}
              width={noDataWidth}
              height={10}
            ></rect>
          </svg>
        </div>
      </div>
    {/if}
    <div class="gradient" bind:clientWidth={gradientWidth}>
      <svg width={'100%'} {height}>
        {#if linearOrBinned == 'linear' && gradientWidth}
          <image
            class="gradient"
            x={margin.left}
            y={margin.top}
            width={gradientWidth - margin.left - margin.right}
            height={10}
            preserveAspectRatio="none"
            xlink:href={href}
          />
          <rect
            class="gradient-border"
            x={margin.left}
            y={margin.top}
            width={gradientWidth - margin.left - margin.right}
            height={10}
          ></rect>
          <g class="ticks">
            {#each tickLabels as tick}
              <text class="tick-label" x={x(tick.value)} y={margin.top + 24}
                >{tick.label + units}</text
              >
            {/each}
            {#if tickLabels.length === 0}
              {#each domain as tick}
                <text class="tick-label" x={x(tick)} y={margin.top + 24}
                  >{tick + units}</text
                >
              {/each}
            {/if}
          </g>
        {/if}
        {#if linearOrBinned == 'binned'}
          {#each numericalColorScale.range() as bin, i}
            <rect
              class={'bin-color'}
              x={margin.left +
                (i * gradientWidth) / numericalColorScale.range().length}
              y={margin.top}
              width={gradientWidth / numericalColorScale.range().length}
              height={10}
              fill={bin}
            ></rect>
          {/each}
          {#each discreteTicks as tick, i}
            <text
              class="tick-label"
              x={margin.left +
                ((i + 1) * gradientWidth) / numericalColorScale.range().length}
              y={margin.top + 24}>{Math.round(tick * 10) / 10 + units}</text
            >
          {/each}
        {/if}
      </svg>
    </div>
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
  svg {
    overflow: visible;
    display: block;
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
  text.tick-label {
    font-size: var(--font-size-m-s);
    fill: var(--lightText);
    text-anchor: middle;
  }
  @media only screen and (max-width: 400px) {
    .legend {
      padding-bottom: var(--space-s-xl);
    }
    .legend-text-container,
    .gradient-container {
      gap: var(--space-s-xl);
    }
    text.tick-label,
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
    text.tick-label,
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
    text.tick-label,
    .no-data-label {
      font-size: var(--font-size-l-s);
    }
    .legend-title {
      font-size: var(--font-size-l-m);
      margin-bottom: var(--space-l-xxs);
    }
  }
</style>
