import { CSSResult, unsafeCSS } from "lit";

const intensities = [50,100,200,300,400,500,600,700,800,900,950] as const; //infer array can only have these values (e.g. Type [50,100,...,950])
export type ColorIntensity = typeof intensities[number];
export type ColorPalette = {[key in ColorIntensity]: string}
export type ColorThemeName = 'primary' | 'secondary' | 'accent' | 'warn' | 'neutral';
export type ColorTheme = {[key in ColorThemeName]: ColorPalette}

//uncomment those that you need (and add more as needed);
const sky: string[] = ['#f0f9ff','#e0f2fe','#bae6fd','#7dd3fc','#38bdf8','#0ea5e9','#0284c7','#0369a1','#075985','#0c4a6e','#082f49'];
//const cyan: string[] = ['#ecfeff','#cffafe','#a5f3fc','#67e8f9','#22d3ee','#06b6d4','#0891b2','#0e7490','#155e75','#164e63','#083344'];
const amber: string[] = ['#fffbeb','#fef3c7','#fde68a','#fcd34d','#fbbf24','#f59e0b','#d97706','#b45309','#92400e','#78350f','#451a03'];
const rose: string[] = ['#fff1f2','#ffe4e6','#fecdd3','#fda4af','#fb7185','#f43f5e','#e11d48','#be123c','#9f1239','#881337','#4c0519'];
const slate: string[] = ['#f8fafc','#f1f5f9','#e2e8f0','#cbd5e1','#94a3b8','#64748b','#475569','#334155','#1e293b','#0f172a','#020617'];

//customize for your app
const colors: ColorTheme = {
  primary: buildColorSet(sky),
  secondary: buildColorSet(amber),
  accent: buildColorSet(amber),
  warn: buildColorSet(rose),
  neutral: buildColorSet(slate)
};


export const getColorHex = (name: ColorThemeName, intensity: ColorIntensity, opacity?: number): string => {
  let ret = colors[name][intensity];
  if (typeof (opacity) === 'number') {
    if (opacity < 0 || opacity > 1) { throw new Error("Cannot get color. Opacity must be between 0 and 1"); }
    const hexOpacity = Math.floor(255 * opacity).toString(16);  //add the opacity as a fraction of 255 converted to base 16 - hex
    ret += hexOpacity.padStart(2, '0');
  }
  return ret;
}

export const buildCssColor = (name: ColorThemeName, intensity: ColorIntensity, opacity?: number): CSSResult => {
  return unsafeCSS(getColorHex(name, intensity, opacity));
}



//#region -->> HELPERS <<--

function buildColorSet(colors: string[]): ColorPalette {
  //assert
  if (!Array.isArray(colors)) { throw new Error('Cannot build color set. Invalid/missing colors array'); }
  if (colors.length < intensities.length) { throw new Error('Cannot build color set. Not enough items in the colors array'); }

  const result = colors.reduce((ret: Partial<ColorPalette>, current, index) => {
    ret[intensities[index]] = current;
    return ret;
  }, {});

  return result as ColorPalette;
}

//#endregion