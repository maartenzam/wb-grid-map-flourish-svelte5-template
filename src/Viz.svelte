<script>
  import Header from "./template/Header.svelte";
  import Footer from "./template/Footer.svelte";
  import WorldHexGrid from "./WorldHexGrid.svelte";
  import WorldSquareGrid from "./WorldSquareGrid.svelte";
  import ContinuousColorLegend from "./ContinuousColorLegend.svelte";
  import CategoricalColorLegend from "./CategoricalColorLegend.svelte";
  import Tooltip from "./Tooltip.svelte";
  import TooltipContent from "./TooltipContent.svelte";
  import SearchBox from "./SearchBox.svelte";
  import {
    scaleSequential,
    scaleQuantize,
    scaleQuantile,
    scaleOrdinal,
  } from "d3-scale";
  import { min, max } from "d3-array";
  import { colorRamps, getDiscreteColors, catColors } from "./utils/colorramps";
  import { wbColors } from "./utils/colors";

  export let title;
  export let subtitle;
  export let gridType;
  export let countryCodes;
  export let strokeWidth;
  export let stroke;
  export let scaleType;
  export let colorScale;
  export let colorScaleDiverging;
  export let linearOrBinned;
  export let binningMode;
  export let numberOfBins;
  export let categoricalColorPalette;
  export let data;
  export let showLegend;
  export let legendTitle;
  export let includeNoData;
  export let noDataLabel;
  export let unitLabel;
  export let domainAutoCustom;
  export let domainMin;
  export let domainMax;
  export let notesTitle;
  export let notes;
  export let showSearchBox;

  let width = 500;
  let height = 500;

  let margins = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  $: valueType = data.data.metadata.value.type

  const noDataColor = wbColors.noData;

  // When value is numeric
  $: if (!domainMin) {
    domainMin = Math.floor(min(data.data.map((d) => d.value)));
  }
  $: if (!domainMax) {
    domainMax = Math.ceil(max(data.data.map((d) => d.value)));
  }
  $: dataDomain = [
    Math.floor(min(data.data.map((d) => d.value))),
    Math.ceil(max(data.data.map((d) => d.value))),
  ];
  $: customDomain = [domainMin, domainMax];
  $: domain = domainAutoCustom == "auto" ? dataDomain : customDomain;
  $: contColorScale =
    linearOrBinned == "linear"
      ? scaleSequential(
          colorRamps[
            scaleType == "sequential" ? colorScale : colorScaleDiverging
          ]
        ).domain(domain)
      : binningMode == "fixedWidth"
        ? scaleQuantize(
            getDiscreteColors(
              colorRamps[
                scaleType == "sequential" ? colorScale : colorScaleDiverging
              ],
              numberOfBins
            )
          ).domain(domain)
        : scaleQuantile(
            getDiscreteColors(
              colorRamps[
                scaleType == "sequential" ? colorScale : colorScaleDiverging
              ],
              numberOfBins
            )
          ).domain(data.data.map((d) => d.value));

  // When value is string
  $: colorDomain = [...new Set(data.data.map((d) => d.value))].filter(d => d != "");
  $: catColorScale = catColors[categoricalColorPalette] && categoricalColorPalette != "default"
    ? scaleOrdinal(Object.keys(catColors[categoricalColorPalette]), Object.values(catColors[categoricalColorPalette])).unknown(noDataColor)
    : scaleOrdinal(colorDomain, Object.values(catColors["default"])).unknown(noDataColor)
  $: usedCats = catColorScale.domain().filter(d => colorDomain.includes(d))

  // Tooltip
  let currentCountry;
  $: currentCountryData = data.data.find((d) => d.iso3c == currentCountry);

  let mousePos;
  function updateMouse(evt) {
    mousePos = { x: evt.clientX, y: evt.clientY };
  }
  let tooltipVisible = false;

  // Layout
  let headerHeight;
  let legendHeight;
  let footerHeight;
  $: vizHeight = showLegend ? height - headerHeight - legendHeight - footerHeight : height - headerHeight - footerHeight;
  let vizWidth;

  // Search
  let searched = false;
  let currentTilePos;

</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<div class="chart-container">
  <div class="header-container" bind:clientHeight={headerHeight}>
    {#if title || subtitle}
      <Header {title} {subtitle}></Header>
    {/if}
  </div>

  <div class="viz-container" bind:clientWidth={vizWidth}>
    {#if showSearchBox}
      <SearchBox
        data={data.data}
        bind:currentCountry
        bind:searched
        bind:tooltipVisible
      ></SearchBox>
    {/if}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <svg width={vizWidth} height={vizHeight} on:mousemove={updateMouse}>
      <g transform={`translate(${margins.left},${margins.top})`}>
        {#if gridType == "squares"}
          <WorldSquareGrid
            width={vizWidth}
            height={vizHeight}
            {strokeWidth}
            {stroke}
            {countryCodes}
            {margins}
            {noDataColor}
            {data}
            {contColorScale}
            {catColorScale}
            bind:currentCountry
            bind:searched
            bind:currentTilePos
            bind:tooltipVisible
          ></WorldSquareGrid>
        {/if}

        {#if gridType == "hexagons"}
          <WorldHexGrid
            width={vizWidth}
            height={vizHeight}
            {strokeWidth}
            {stroke}
            {countryCodes}
            {noDataColor}
            {data}
            {contColorScale}
            {catColorScale}
            bind:currentCountry
            bind:searched
            bind:currentTilePos
            bind:tooltipVisible
          ></WorldHexGrid>
        {/if}
      </g>
    </svg>
    {#if currentCountryData && mousePos}
      <Tooltip
        visible={tooltipVisible}
        targetPos={searched && currentTilePos ? currentTilePos : mousePos}
      >
        <TooltipContent
          tooltipHeader={currentCountryData.label}
          tooltipBody={currentCountryData.value != null && currentCountryData.value != ""
            ? valueType == "number"
              ? Math.round(currentCountryData.value * 10) / 10 + "%"
              : currentCountryData.value
            : "No data"}
        ></TooltipContent>
      </Tooltip>
    {/if}
  </div>
  {#if showLegend}
  <div class="legend-container" bind:clientHeight={legendHeight}>
      {#if valueType == "number"}
        <ContinuousColorLegend
          width={vizWidth}
          title={legendTitle}
          {unitLabel}
          {contColorScale}
          {linearOrBinned}
          {binningMode}
          units={"%"}
          {includeNoData}
          {noDataLabel}
        ></ContinuousColorLegend>
      {/if}
      {#if valueType == "string"}
        <CategoricalColorLegend
          title={legendTitle}
          {catColorScale}
          {usedCats}
          {includeNoData}
          {noDataLabel}
        ></CategoricalColorLegend>
      {/if}
  </div>
  {/if}
  <div class="footer-container" bind:clientHeight={footerHeight}>
    {#if notesTitle || notes}
      <Footer {notesTitle} {notes}></Footer>
    {/if}
  </div>
</div>

<style>
  .chart-container {
    display: flex;
    flex-direction: column;
    max-height: 100%;
  }
  .viz-container {
    width: 100%;
    flex-grow: 1;
  }
  .legend-container {
    width: 100%;
  }

  @media only screen and (max-width: 400px) {
    .chart-container {
      margin-left: var(--font-size-s-m);
      margin-left: var(--font-size-s-m);
    }
  }
  @media only screen and (min-width: 400px) and (max-width: 700px) {
    .chart-container {
      margin-left: var(--font-size-m-m);
      margin-right: var(--font-size-m-m);
    }
  }
  @media only screen and (min-width: 700px) {
    .chart-container {
      margin-left: var(--font-size-l-m);
      margin-right: var(--font-size-l-m);
    }
  }
</style>
