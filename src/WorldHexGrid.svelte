<script>
  import { hexGrid } from './layouts/worldhexgrid';
  import { generateHexLayout } from './utils/colorscales';
  import { max } from 'd3-array';

  let {
    width,
    height,
    strokeWidth,
    stroke,
    countryCodes,
    noDataColor,
    data,
    numericalColorScale,
    categoricalColorScale,
    currentCountry = $bindable(),
    currentTilePos = $bindable(),
    searched = $bindable(),
    tooltipVisible = $bindable(),
  } = $props();

  let valueType = $derived(data.plotdata.metadata.color.type);

  const shift = Math.cos((Math.PI / 180) * 30);

  let size = $derived(
    Math.min(width / ((33 * 3) / 2), height / (22 * 2 * shift))
  );

  let hexLayout = $derived(generateHexLayout(hexGrid, size, shift));
  let currentTile = $derived(hexLayout.find((d) => d.iso3c == currentCountry));
  let gridWidth = $derived(Math.round(max(hexLayout.map((d) => d.x))));
  let gridShift = $derived((width - gridWidth) / 2);

  $effect(() => {
    if (currentCountry) {
      currentTilePos = {
        x: currentTile.x,
        y: currentTile.y + 2.5 * currentTile.size,
      };
    }
  });
</script>

<g transform={`translate(${gridShift},0)`}>
  {#each hexLayout as hex}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <polygon
      class={`hex q-${hex.q} r-${hex.r}`}
      points={hex.vertices}
      fill={data.plotdata.find((d) => (d.iso3c == hex.iso3c)) && data.plotdata.find((d) => (d.iso3c == hex.iso3c)).color != null
        ? valueType == 'string'
          ? categoricalColorScale(data.plotdata.find((d) => d.iso3c == hex.iso3c).color)
          : numericalColorScale(
              data.plotdata.find((d) => d.iso3c == hex.iso3c).color
            )
        : noDataColor}
      style:stroke-width={strokeWidth}
      style:stroke
      onmouseover={() => {
        currentCountry = hex.iso3c;
        searched = false;
        tooltipVisible = true;
      }}
      onfocus={() => {
        currentCountry = hex.iso3c;
        searched = false;
        tooltipVisible = true;
      }}
      onmouseout={() => {
        currentCountry = null;
        tooltipVisible = false;
      }}
      onblur={() => {
        currentCountry = null;
        tooltipVisible = false;
      }}
    ></polygon>
    {#if countryCodes}
      <text
        class="country-label"
        x={hex.x}
        y={hex.y + 4}
        text-anchor={'middle'}
        font-size={'0.6rem'}
        paint-order="stroke"
        stroke-linejoin="round"
        stroke={'#ffffff'}
        stroke-width={2}>{hex.iso3c}</text
      >
    {/if}
  {/each}

  {#if currentCountry}
    <polygon
      class={'highlight-outline'}
      points={currentTile.vertices}
      fill={'none'}
      stroke={'#FFFFFF'}
      stroke-width={strokeWidth + 2}
    ></polygon>
    <polygon
      class={'highlight-outline'}
      points={currentTile.vertices}
      fill={'none'}
      stroke={'#000000'}
      stroke-width={strokeWidth}
    ></polygon>
  {/if}
</g>

<style>
  text.country-label {
    pointer-events: none;
    fill: var(--darkest);
    font-family: var(--font-family);
  }
  polygon.highlight-outline {
    pointer-events: none;
  }
</style>
