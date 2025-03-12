export let getValue = function(countryCode, data){
    if(data.find(d => d.iso3c == countryCode)){
      return data.find(d => d.iso3c == countryCode).value
    }
    else return undefined
  }

export let getFill = function (data, iso3c, sColorScale, cColorScale, noDataColor) {
  let valueType = data.data.metadata.value.type
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