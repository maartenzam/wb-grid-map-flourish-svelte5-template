<script>
  import Header from "./template/Header.svelte";
  import Footer from "./template/Footer.svelte";
  import WorldHexGrid from "./WorldHexGrid.svelte";
  import WorldSquareGrid from "./WorldSquareGrid.svelte";
  import ContinuousColorLegend from "./template/ContinuousColorLegend.svelte";
  import CategoricalColorLegend from "./template/CategoricalColorLegend.svelte";
  import Tooltip from "./template/Tooltip.svelte";
  import TooltipContent from "./template/TooltipContent.svelte";
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
  
  let {title, subtitle, gridType, countryCodes, strokeWidth, stroke, scaleType, colorScale, colorScaleDiverging, linearOrBinned, binningMode, numberOfBins, categoricalColorPalette, data, showLegend, legendTitle, includeNoData, noDataLabel, unitLabel, domainAutoCustom, domainMin, domainMax, notesTitle, notes, includeLogo, showSearchBox } = $props()

  let width = $state(500);
  let height = $state(500);

  let margins = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  let valueType = $derived(data.data.metadata.value.type)

  const noDataColor = wbColors.noData;

  // When value is numeric
  let domainMinimum = $derived(!domainMin ? Math.floor(min(data.data.map((d) => d.value))) : domainMin)
  let domainMaximum = $derived(!domainMax ? Math.ceil(max(data.data.map((d) => d.value))) : domainMax)
  let dataDomain = $derived([
    Math.floor(min(data.data.map((d) => d.value))),
    Math.ceil(max(data.data.map((d) => d.value))),
  ])
  let customDomain = $derived([domainMinimum, domainMaximum])
  let domain = $derived(domainAutoCustom == "auto" ? dataDomain : customDomain)

  let contColorScale =
    $derived(linearOrBinned == "linear"
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
          ).domain(data.data.map((d) => d.value)));

  // When value is string
  let colorDomain = $derived([...new Set(data.data.map((d) => d.value))].filter(d => d != ""));
  let catColorScale = $derived(catColors[categoricalColorPalette] && categoricalColorPalette != "default"
    ? scaleOrdinal(Object.keys(catColors[categoricalColorPalette]), Object.values(catColors[categoricalColorPalette])).unknown(noDataColor)
    : scaleOrdinal(colorDomain, Object.values(catColors["default"])).unknown(noDataColor))
  let usedCats = $derived(catColorScale.domain().filter(d => colorDomain.includes(d)))

  // Tooltip
  let currentCountry = $state();
  let currentCountryData = $derived(data.data.find((d) => d.iso3c == currentCountry));

  let mousePos = $state();
  function updateMouse(evt) {
    mousePos = { x: evt.clientX, y: evt.clientY };
  }
  let tooltipVisible = $state(false);

  // Layout
  let headerHeight = $state();
  let legendHeight = $state();
  let footerHeight = $state();
  let vizHeight = $derived(showLegend ? height - headerHeight - legendHeight - footerHeight : height - headerHeight - footerHeight);
  let vizWidth = $state();

  // Search
  let searched = $state(false);
  let currentTilePos = $state();

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
    {#if vizHeight}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <svg width={vizWidth} height={vizHeight} onmousemove={updateMouse}>
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
    {/if}
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
      <Footer {notesTitle} {notes} {includeLogo}></Footer>
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
