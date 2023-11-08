import { buildTypeface, getTypefaceSet, buildTypefaceDef, buildFontSize, buildFontSizeDef, getFontSizeProps, buildFontWeight, buildFontWeightDef, getFontWeight, buildTypographyTheme } from './typography';
import { buildCssColor, getColorHex } from './colors';

export const globalTheme = {
  //--- typography --
  buildTypeface,
  buildTypefaceDef,
  buildFontSize,
  buildFontSizeDef,
  buildFontWeight,
  buildFontWeightDef,

  buildTypographyTheme,

  //low level
  getTypefaceSet,
  getFontSizeProps,
  getFontWeight,


  //--- color --
  buildCssColor,
  
  //low level
  getColorHex,
}
