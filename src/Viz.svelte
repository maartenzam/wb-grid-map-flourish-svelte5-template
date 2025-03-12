<script>
  import Header from "./template/Header.svelte";
  import Footer from "./template/Footer.svelte";
  import WorldHexGrid from "./WorldHexGrid.svelte";
  import WorldSquareGrid from "./WorldSquareGrid.svelte";
  import NumericalColorLegend from "./template/NumericalColorLegend.svelte";
  import CategoricalColorLegend from "./template/CategoricalColorLegend.svelte";
  import Tooltip from "./template/Tooltip.svelte";
  import TooltipContent from "./template/TooltipContent.svelte";
  import SearchBox from "./SearchBox.svelte";
  import { getCategoricalColorScale, getNumericalColorScale } from './utils/colorscales';
  import { min, max, extent } from "d3-array";

  import { wbColors } from "./utils/colors";
  
  let {title, subtitle, gridType, countryCodes, strokeWidth, stroke, scaleType, colorScale, colorScaleDiverging, linearOrBinned, binningMode, numberOfBins, data, showLegend, legendTitle, includeNoData, noDataLabel, unitLabel, domainAutoCustom, domainMin, domainMax, notesTitle, notes, includeLogo, showSearchBox } = $props()

  let width = $state(500);
  let height = $state(500);

  let margins = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  let valueType = $derived(data.plotdata.metadata.color.type)

  const noDataColor = wbColors.noData;

  // Color scales
  let domainMinimum = $derived(typeof domainMin === "undefined" ? Math.floor(min(data.plotdata.map((d) => d.color))) : domainMin)
  let domainMaximum = $derived(typeof domainMax === "undefined"  ? Math.ceil(max(data.plotdata.map((d) => d.color))) : domainMax)
  let dataDomain = $derived(extent(data.plotdata, d => d.color))
  let customDomain = $derived([domainMinimum, domainMaximum])
  let domain = $derived(domainAutoCustom == "auto" ? dataDomain : customDomain)

  let numericalColorScale = $derived(getNumericalColorScale(data, domain, linearOrBinned, scaleType, colorScale, colorScaleDiverging, binningMode, numberOfBins))
  let categoricalColorScale = $derived(getCategoricalColorScale(data))

  // Tooltip
  let currentCountry = $state();
  let currentCountryData = $derived(data.plotdata.find((d) => d.iso3c == currentCountry));

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
        data={data.plotdata}
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
            {numericalColorScale}
            {categoricalColorScale}
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
            {numericalColorScale}
            {categoricalColorScale}
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
          tooltipBody={currentCountryData.color != null && currentCountryData.color != ""
            ? valueType == "number"
              ? currentCountryData.color
              : currentCountryData.color
            : "No data"}
        ></TooltipContent>
      </Tooltip>
    {/if}
  </div>
  <div class="legend-container" bind:clientHeight={legendHeight}>
  {#if showLegend}
      {#if valueType == "number"}
        <NumericalColorLegend
          title={legendTitle}
          {unitLabel}
          {numericalColorScale}
          {linearOrBinned}
          {binningMode}
          {includeNoData}
          {noDataLabel}
        ></NumericalColorLegend>
      {/if}
      {#if valueType == "string"}
        <CategoricalColorLegend
          title={legendTitle}
          {categoricalColorScale}
          {includeNoData}
          {noDataLabel}
        ></CategoricalColorLegend>
      {/if}
  {/if}
</div>
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
    position: relative;
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
