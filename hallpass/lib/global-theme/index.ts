import { buildHeading } from './headings';
import { buildMargin } from './margins';
import { buildTypeface, buildTypefaceDef, buildFontSize, buildFontSizeDef, buildFontWeight, buildFontWeightDef, buildTypographyTheme } from './typography';
import { buildCssColor, buildCssColorTheme } from './colors';
import { buildPadding } from './paddings';

export const globalTheme = {
  //--- typography --
  buildTypeface,
  buildTypefaceDef,
  buildFontSize,
  buildFontSizeDef,
  buildFontWeight,
  buildFontWeightDef,

  buildTypographyTheme,

  //--- color --
  buildCssColor,
  buildCssColorTheme,

  //--- margin / padding ---
  buildMargin,
  buildPadding,

  //--- heading ---
  buildHeading,
}
