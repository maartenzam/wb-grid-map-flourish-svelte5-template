<script>
  import { squareGrid } from "./layouts/worldtilegrid";
  import { getFill } from "./utils/utils";

  export let width;
  export let height;
  export let strokeWidth;
  export let stroke;
  export let countryCodes;
  export let margins;
  export let noDataColor;
  export let data;
  export let contColorScale;
  export let catColorScale;
  export let currentCountry;
  export let currentTilePos;
  export let searched;
  export let tooltipVisible;

  $: tileSize = Math.min(
    (width - margins.left - margins.right) / 29,
    (height - margins.top - margins.bottom) / 22
  );

  $: currentTile = squareGrid.find((d) => d.iso3c == currentCountry);

  $: gridWidth = tileSize * 29;
  $: shift = (width - gridWidth) / 2;

  $: if (currentCountry) {
    currentTilePos = {
      x: currentTile.x * tileSize - tileSize,
      y: currentTile.y * tileSize + tileSize,
    };
  }
</script>

{#if data}
  {#each squareGrid as cell}
    <g
      transform={`translate(${cell.x * tileSize - tileSize + shift},${cell.y * tileSize - tileSize})`}
    >
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <rect
        x={0}
        y={0}
        width={tileSize}
        height={tileSize}
        fill={getFill(data, cell.iso3c, contColorScale, catColorScale, noDataColor)}
        {stroke}
        stroke-width={strokeWidth}
        on:mouseover={() => {
          currentCountry = cell.iso3c;
          searched = false;
          tooltipVisible = true;
        }}
        on:focus={() => {
          currentCountry = cell.iso3c;
          searched = false;
          tooltipVisible = true;
        }}
        on:mouseout={() => {
          currentCountry = null;
          tooltipVisible = false;
        }}
        on:blur={() => {
          currentCountry = null;
          tooltipVisible = false;
        }}
      ></rect>
      {#if countryCodes}
        <text
          class="country-label"
          x={tileSize / 2}
          y={tileSize / 2 + 4}
          text-anchor={"middle"}
          font-size={"0.6rem"}
          paint-order="stroke"
          stroke-linejoin="round"
          stroke={"#ffffff"}
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
    fill={"none"}
    stroke={"#FFFFFF"}
    stroke-width={strokeWidth + 2}
  ></rect>
  <rect
    class="highlight-outline"
    x={currentTile.x * tileSize - tileSize + shift}
    y={currentTile.y * tileSize - tileSize}
    width={tileSize}
    height={tileSize}
    fill={"none"}
    stroke={"#000000"}
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
