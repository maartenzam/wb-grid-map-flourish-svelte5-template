<script>
  import { format } from 'd3-format';
  let {
    gridType,
    scale,
    innerHeight,
    innerWidth,
    ticks = [],
    axisUnits,
    axisTitle,
    divisor,
    hideLines = false,
    hideTickLabels = false,
    animated = true,
  } = $props();

  const divideTick = function (tick, divisor) {
    return tick / divisor;
  };

  let formattedTicks = $derived(
    ticks.map((d, i) => {
      let formattedTick = { value: d, label: format(',')(d) };
      if (isNaN(d)) {
        formattedTick = d;
      }

      if (divisor) {
        formattedTick.label = format(',')(divideTick(formattedTick.value, divisor));
      }

      return formattedTick;
    })
  );
</script>

<g class:animated>
  {#if gridType == 'xGrid'}
    {#each formattedTicks as tick}
      <line
        transform="translate({isNaN(scale(tick.value))
          ? 0
          : scale(tick.value)}, 0)"
        x1={0}
        x2={0}
        y1={hideLines ? innerHeight + 5 : 0}
        y2={innerHeight}
        class="gridline {tick.value === 0 ? 'zeroline' : ''}"
      />
      {#if !hideTickLabels}
        <text
          transform="translate({isNaN(scale(tick.value))
            ? 0
            : scale(tick.value)}, {innerHeight + 18})"
          x={0}
          y={0}
          class="tickLabel x middle">{tick.label}</text
        >
      {/if}
    {/each}
    {#if axisTitle && innerWidth}
      <text x={innerWidth / 2} y={innerHeight + 40} class="axisLabel middle"
        >{axisTitle} {axisUnits ? ' (' + axisUnits + ')' : ''}</text
      >
    {/if}
  {/if}

  {#if gridType == 'yGrid'}
    {#each formattedTicks as tick, i}
      <line
        transform="translate(0,{isNaN(scale(tick.value))
          ? 0
          : scale(tick.value)})"
        x1={hideLines ? -5 : 0}
        x2={hideLines ? 0 : innerWidth}
        y1={0}
        y2={0}
        class="gridline {tick.value === 0 ? 'zeroline' : ''}"
      />
      {#if !hideTickLabels}
        <text
          transform="translate({-8},{(isNaN(scale(tick.value))
            ? 0
            : scale(tick.value)) + 4})"
          class="tickLabel y end">{tick.label}</text
        >
      {/if}
      {#if i === ticks.length - 1 && axisTitle}
        <text transform="translate({5},{-8})" class="axisLabel"
          >{axisTitle} {axisUnits ? ' (' + axisUnits + ')' : ''}</text
        >
      {/if}
    {/each}
  {/if}
</g>

<style>
  text {
    font-family: 'Open Sans';
  }

  text.axisLabel {
    font-weight: var(--font-weight-semibold);
    stroke: none;
    text-anchor: middle;
  }

  .tickLabel {
    fill: var(--textSubtle);
    text-anchor: middle;
  }

  line.gridline {
    stroke-width: 1px;
    stroke: var(--grey200);
    stroke-dasharray: 4 2;
  }

  line.gridline.zeroline {
    stroke-dasharray: none;
    stroke: var(--grey300);
  }
</style>
