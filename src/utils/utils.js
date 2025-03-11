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