<script>
  import { squareGrid } from './layouts/worldtilegrid';

  let {
    width,
    height,
    strokeWidth,
    stroke,
    countryCodes,
    margins,
    noDataColor,
    data,
    numericalColorScale,
    categoricalColorScale,
    currentCountry = $bindable(),
    currentTilePos = $bindable(),
    searched = $bindable(),
    tooltipVisible = $bindable()
  } = $props();

  let valueType = $derived(data.plotdata.metadata.color.type)

  let tileSize = $derived(
    Math.min(
      (width - margins.left - margins.right) / 29,
      (height - margins.top - margins.bottom) / 22
    )
  );

  let currentTile = $derived(squareGrid.find((d) => d.iso3c == currentCountry));

  let gridWidth = $derived(tileSize * 29);
  let shift = $derived((width - gridWidth) / 2);

  $effect(() => {
    if (currentCountry) {
      currentTilePos = {
        x: currentTile.x * tileSize - tileSize,
        y: currentTile.y * tileSize + tileSize,
      };
    }
  });
</script>

{#if tileSize}
  {#each squareGrid as cell}
    {console.log(cell)}
    <g
      transform={`translate(${(cell.x - 1) * tileSize + shift},${(cell.y - 1) * tileSize})`}
    >
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <rect
        x={0}
        y={0}
        width={tileSize}
        height={tileSize}
        fill={data.plotdata.find(d => d.iso3c == cell.iso3c)
            ? valueType == 'string' 
              ? categoricalColorScale(data.plotdata.find(d => d.iso3c == cell.iso3c).color)
              : numericalColorScale(data.plotdata.find(d => d.iso3c == cell.iso3c).color)
            : noDataColor 
        }
        {stroke}
        stroke-width={strokeWidth}
        onmouseover={() => {
          currentCountry = cell.iso3c;
          searched = false;
          tooltipVisible = true;
        }}
        onfocus={() => {
          currentCountry = cell.iso3c;
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
      ></rect>
      {#if countryCodes && tileSize}
        <text
          class="country-label"
          x={tileSize / 2}
          y={tileSize / 2 + 4}
          text-anchor={'middle'}
          font-size={'0.6rem'}
          paint-order="stroke"
          stroke-linejoin="round"
          stroke={'#ffffff'}
          stroke-width={2}>{cell.iso3c}</text
        >
      {/if}
    </g>
  {/each}
{/if}

{#if currentCountry}
  <rect
    class="highlight-outline"
    x={currentTile.x * tileSize - tileSize + shift}
    y={currentTile.y * tileSize - tileSize}
    width={tileSize}
    height={tileSize}
    fill={'none'}
    stroke={'#FFFFFF'}
    stroke-width={strokeWidth + 2}
  ></rect>
  <rect
    class="highlight-outline"
    x={currentTile.x * tileSize - tileSize + shift}
    y={currentTile.y * tileSize - tileSize}
    width={tileSize}
    height={tileSize}
    fill={'none'}
    stroke={'#000000'}
    stroke-width={strokeWidth}
  ></rect>
{/if}

<style>
  text.country-label {
    pointer-events: none;
    fill: var(--darkest);
    font-family: var(--font-family);
  }
  rect.highlight-outline {
    pointer-events: none;
  }
</style>
