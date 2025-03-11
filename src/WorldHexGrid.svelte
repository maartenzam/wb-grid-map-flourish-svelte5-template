<script>
  import { hexGrid } from "./layouts/worldhexgrid";
  import { getFill } from "./utils/utils";
  import { max } from "d3-array"

  export let width;
  export let height;
  export let strokeWidth;
  export let stroke;
  export let countryCodes;
  export let noDataColor;
  export let data;
  export let contColorScale;
  export let catColorScale;
  export let currentCountry;
  export let currentTilePos;
  export let searched;
  export let tooltipVisible;

  const shift = Math.cos((Math.PI / 180) * 30);

  $: size = Math.min(width / ((33 * 3) / 2), height / (22 * 2 * shift));

  function generateHexLayout(grid, size) {
    let hexGrid = grid.map((d) => {
      let hex = {};
      let x = size + ((d.q * 3) / 2) * size;
      let y =
        d.q % 2 == 0
          ? 2 * size + d.r * size * 2 * shift
          : 2 * size + d.r * size * 2 * shift - (Math.sqrt(3) * size) / 2;
      hex.q = d.q;
      hex.r = d.r;
      hex.iso3c = d.iso3c;
      hex.x = x;
      hex.y = y;
      hex.size = size;

      let vertices = [];
      for (let i = 0; i < 6; i++) {
        var angle_deg = 60 * i;
        var angle_rad = (Math.PI / 180) * angle_deg;
        vertices.push([
          x + size * Math.cos(angle_rad),
          y + size * Math.sin(angle_rad),
        ]);
      }
      hex.vertices = vertices;
      return hex;
    });
    return hexGrid.filter((d) => d.iso3c != "");
  }
  $: hexLayout = generateHexLayout(hexGrid, size);

  $: currentTile = hexLayout.find((d) => d.iso3c == currentCountry);

  $: gridWidth = Math.round(max(hexLayout.map(d => d.x)))
  $: gridShift = (width - gridWidth)/2

  $: if(currentCountry) {
    currentTilePos = {x: currentTile.x, y: currentTile.y + 2.5*currentTile.size}
  }

</script>

<g transform={`translate(${gridShift},0)`}>
{#each hexLayout as hex}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <polygon
    class={`hex q-${hex.q} r-${hex.r}`}
    points={hex.vertices}
    fill={getFill(data, hex.iso3c, contColorScale, catColorScale, noDataColor)}
    style:stroke-width={strokeWidth}
    style:stroke
    on:mouseover={() => {currentCountry = hex.iso3c; searched = false; tooltipVisible = true}}
    on:focus={() => {currentCountry = hex.iso3c; searched = false; tooltipVisible = true}}
    on:mouseout={() => {currentCountry = null; tooltipVisible = false}}
    on:blur={() => {currentCountry = null; tooltipVisible = false}}
  ></polygon>
  {#if countryCodes}
    <text
      class="country-label"
      x={hex.x}
      y={hex.y + 4}
      text-anchor={"middle"}
      font-size={"0.6rem"}
      paint-order="stroke"
      stroke-linejoin="round"
      stroke={"#ffffff"}
      stroke-width={2}>{hex.iso3c}</text
    >
  {/if}
{/each}

{#if currentCountry}
    <polygon
      class={"highlight-outline"}
      points={currentTile.vertices}
      fill={"none"}
      stroke={"#FFFFFF"}
      stroke-width={strokeWidth + 2}
    ></polygon>
    <polygon
      class={"highlight-outline"}
      points={currentTile.vertices}
      fill={"none"}
      stroke={"#000000"}
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
