import { wbColors } from "./colors";
import { piecewise, interpolateLab } from "d3-interpolate";

export let catColors = {
  default: {
    cat1: wbColors.cat1,
    cat2: wbColors.cat2,
    cat3: wbColors.cat3,
    cat4: wbColors.cat4,
    cat5: wbColors.cat5,
    cat6: wbColors.cat6,
    cat7: wbColors.cat7,
    cat8: wbColors.cat8,
    cat9: wbColors.cat9,
  },
  defaultText: {
    cat1Text: wbColors.cat1Text,
    cat2Text: wbColors.cat2Text,
    cat3Text: wbColors.cat3Text,
    cat4Text: wbColors.cat4Text,
    cat5Text: wbColors.cat5Text,
    cat6Text: wbColors.cat6Text,
    cat7Text: wbColors.cat7Text,
    cat8Text: wbColors.cat8Text,
    cat9Text: wbColors.cat9Text,
  },
  region: {
    wld: wbColors.wld,
    nac: wbColors.nac,
    lcn: wbColors.lcn,
    sas: wbColors.sas,
    mea: wbColors.mea,
    ecs: wbColors.ecs,
    eas: wbColors.eas,
    ssf: wbColors.ssf,
    afe: wbColors.afe,
    afw: wbColors.afw,
  },
  regionText: {
    wldText: wbColors.wldText,
    nacText: wbColors.nacText,
    lcnText: wbColors.lcnText,
    sasText: wbColors.sasText,
    meaText: wbColors.meaText,
    ecsText: wbColors.ecsText,
    easText: wbColors.easText,
    ssfText: wbColors.ssfText,
    afeText: wbColors.afeText,
    afwText: wbColors.afwText,
  },
  income: {
    hic: wbColors.hic,
    umc: wbColors.umc,
    lmc: wbColors.lmc,
    lic: wbColors.lic,
  },
  gender: {
    male: wbColors.male,
    female: wbColors.female,
    diverse: wbColors.diverse,
  },
  urbanization: {
    rural: wbColors.rural,
    urban: wbColors.urban,
  },
  age: {
    youngestAge: wbColors.youngestAge,
    youngerAge: wbColors.youngerAge,
    middleAge: wbColors.middleAge,
    olderAge: wbColors.olderAge,
    oldestAge: wbColors.oldestAge,
  },
  binary: {
    yes: wbColors.yes,
    no: wbColors.no,
  },
};

export let seqColors = {
  seq: [
    wbColors.seq1,
    wbColors.seq2,
    wbColors.seq3,
    wbColors.seq4,
    wbColors.seq5,
  ],
  seqRev: [
    wbColors.seqRev1,
    wbColors.seqRev2,
    wbColors.seqRev3,
    wbColors.seqRev4,
    wbColors.seqRev5,
  ],
  seqB: [
    wbColors.seqB1,
    wbColors.seqB2,
    wbColors.seqB3,
    wbColors.seqB4,
    wbColors.seqB5,
  ],
  seqY: [
    wbColors.seqY1,
    wbColors.seqY2,
    wbColors.seqY3,
    wbColors.seqY4,
    wbColors.seqY5,
  ],
  seqP: [
    wbColors.seqP1,
    wbColors.seqP2,
    wbColors.seqP3,
    wbColors.seqP4,
    wbColors.seqP5,
  ],
  div: [
    wbColors.divNeg3,
    wbColors.divNeg2,
    wbColors.divNeg1,
    wbColors.divMid,
    wbColors.divPos1,
    wbColors.divPos2,
    wbColors.divPos3,
  ],
  div2: [
    wbColors.div2L3,
    wbColors.div2L2,
    wbColors.div2L1,
    wbColors.div2Mid,
    wbColors.div2R1,
    wbColors.div2R2,
    wbColors.div2R3,
  ],
};

export let colorRamps = {
  seq: piecewise(interpolateLab, seqColors.seq),
  seqRev: piecewise(interpolateLab, seqColors.seqRev),
  seqB: piecewise(interpolateLab, seqColors.seqB),
  seqY: piecewise(interpolateLab, seqColors.seqY),
  seqP: piecewise(interpolateLab, seqColors.seqP),
  div: piecewise(interpolateLab, seqColors.div),
  div2: piecewise(interpolateLab, seqColors.div2),
};

export let getDiscreteColors = function (colorRamp, colorNumber) {
  let arr = [...Array(colorNumber).keys()].map((i) => i / (colorNumber - 1));
  let colors = arr.map((d) => colorRamp(d));
  return colors;
};
