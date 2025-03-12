import { scaleSequential, scaleQuantize, scaleQuantile, scaleOrdinal } from 'd3-scale';
import { colorRamps, catColors, allColors } from './colorramps';
import { wbColors } from './colors';

export let getNumericalColorScale = function(data, domain, linearOrBinned, scaleType, colorScale, colorScaleDiverging, binningMode, numberOfBins){

  if(linearOrBinned == 'linear'){
    return scaleSequential(
      colorRamps[
        scaleType == 'sequential' ? colorScale : colorScaleDiverging
      ]
    ).domain(domain)
  }

  let getDiscreteColors = function (colorRamp, colorNumber) {
    let arr = [...Array(colorNumber).keys()].map((i) => i / (colorNumber - 1));
    let colors = arr.map((d) => colorRamp(d));
    return colors;
  };

  if(linearOrBinned == 'binned' && binningMode == 'fixedWidth'){
    return scaleQuantize(
      getDiscreteColors(
        colorRamps[
          scaleType == 'sequential' ? colorScale : colorScaleDiverging
        ],
        numberOfBins
      )
    ).domain(domain)
  }

  if(linearOrBinned == 'binned' && binningMode == 'quantile'){
    return scaleQuantile(
      getDiscreteColors(
        colorRamps[
          scaleType == 'sequential' ? colorScale : colorScaleDiverging
        ],
        numberOfBins
      )
    ).domain(data.plotdata.map((d) => d.color))
  }
}

export let getCategoricalColorScale = function (data) {
  let colorDomain = [...new Set(data.plotdata.map((d) => d.color))].filter(
    (d) => d != ''
  );
  // Automatically map regions, income levels, ... to their colors
  let colorRange = colorDomain.map((d) => {
    if (allColors[d.toLowerCase()]) {
      return allColors[d.toLowerCase()];
    } else {
      return wbColors.noData;
    }
  });
  // If no elements in the domain are matched, get the colors from the default color scale as a fallback
  if (colorRange.every((d) => d == wbColors.noData)) {
    colorRange = Object.values(catColors.default);
  }
  return scaleOrdinal(colorDomain, colorRange).unknown(wbColors.noData)
};

export let getValue = function(countryCode, data){
    if(data.find(d => d.iso3c == countryCode)){
      return data.find(d => d.iso3c == countryCode).value
    }
    else return undefined
  }

export let getFill = function (data, iso3c, sColorScale, cColorScale, noDataColor) {
  let valueType = data.plotdata.metadata.color.type
  if (valueType == "number") {
    if (getValue(iso3c, data.data)) {
      return sColorScale(getValue(iso3c, data.data));
    } else {
      return noDataColor;
    }
  }
  if (valueType == "string") {
    if (getValue(iso3c, data.data)) {
      return cColorScale(getValue(iso3c, data.data));
    }
    else {
      return noDataColor;
    }
  }
};

export let generateHexLayout = function(grid, size, shift) {
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
  return hexGrid;
}