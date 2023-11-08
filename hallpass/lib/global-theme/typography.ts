import { CSSResult, unsafeCSS } from "lit";

//#region >> FONT FAMILY <<

const typefaces = ['sans-serif', 'serif', 'monospace', 'cursive', 'fantasy', 'system-ui'] as const; //infer array can only have these values (e.g. Type ['sans-serif', 'serif',...,'system-ui'])
export type Typeface = typeof typefaces[number];
export type TypefaceSet = {[key in Typeface]: string};

const typefaceSet: TypefaceSet = {
  'sans-serif': "Verdana, Arial, Helvetica, sans-serif",
  'serif': "'Times New Roman', Times, Georgia, serif",
  'monospace': "'Lucida Console', 'Courier New', Courier, monospace",
  'cursive': "cursive",
  'fantasy': "fantasy",
  'system-ui': "system-ui"
}

export const getTypefaceSet = (name: Typeface): string => {
  return typefaceSet[name];
}

export const buildTypeface = (name: Typeface): CSSResult => {
  return unsafeCSS(getTypefaceSet(name));
}
export const buildTypefaceDef = (name: Typeface): CSSResult => {
  return unsafeCSS(`font-family: ${getTypefaceSet(name)};`);
}


//#endregion ... font family


//#region >> FONT SIZE <<

const fontSizes = ['xs','sm','base','lg','xl','2xl','3xl','4xl','5xl','6xl','7xl','8xl','9xl'] as const;
export type FontSize = typeof fontSizes[number];
export type FontSizeProps = { size: string, height: string }
export type FontSizeSet = {[key in FontSize]: FontSizeProps};

const fontSizeSet: FontSizeSet = {
  'xs': buildFontSizeProps(0.75, 1),
  'sm': buildFontSizeProps(0.875, 1.25),
  'base': buildFontSizeProps(1, 1.5),
  'lg': buildFontSizeProps(1.125, 1.75),
  'xl': buildFontSizeProps(1.25, 1.75),
  '2xl': buildFontSizeProps(1.5, 2),
  '3xl': buildFontSizeProps(1.875, 2.25),
  '4xl': buildFontSizeProps(2.25, 2.5),
  '5xl': buildFontSizeProps(3.0),
  '6xl': buildFontSizeProps(3.75),  
  '7xl': buildFontSizeProps(4.5),  
  '8xl': buildFontSizeProps(6.0),  
  '9xl': buildFontSizeProps(8.0),  
}

export const getFontSizeProps = (size: FontSize): FontSizeProps => {
  return fontSizeSet[size];
}

export const buildFontSize = (size: FontSize): {size: CSSResult, height: CSSResult} => {
  const props = getFontSizeProps(size);
  return {
    size: unsafeCSS(props.size),
    height: unsafeCSS(props.height)
  };
}

export const buildFontSizeDef = (size: FontSize): CSSResult => {
  const props = getFontSizeProps(size);
  return unsafeCSS(`font-size: ${props.size}; line-height: ${props.height};`);
}

//#endregion ... font size


//#region >> FONT WEIGHT <<

const fontWeights = ['thin','light','normal','medium','semibold','bold','black'] as const;
export type FontWeight = typeof fontWeights[number];
export type FontWeightSet = {[key in FontWeight]: string};

const fontWeightSet: FontWeightSet = buildFontWeightSet([100,300,400,500,600,700,800]);

export const getFontWeight = (weight: FontWeight): string => {
  return fontWeightSet[weight];
}

export const buildFontWeight = (weight: FontWeight): CSSResult => {
  return unsafeCSS(getFontWeight(weight));
}

export const buildFontWeightDef = (weight: FontWeight): CSSResult => {
  return unsafeCSS(`font-weight: ${getFontWeight(weight)};`);
}

//#endregion ... font weight


//#region >> Typography Theme <<

export type TypographyTheme = {
  family: Typeface,
  size: FontSize,
  weight: FontWeight
}
const defaultTypographyTheme: TypographyTheme = {
  family: 'sans-serif',
  size: 'base',
  weight: 'normal'
};

export const buildTypographyTheme = (config: Partial<TypographyTheme> = {}): CSSResult => {
  const theme = {...defaultTypographyTheme, ...config};
  return unsafeCSS([
    buildTypefaceDef(theme.family),
    buildFontSizeDef(theme.size),
    buildFontWeightDef(theme.weight)
  ].join(' '));
}




//#endregion ... typography theme




//#region -->> HELPERS <<--

function buildFontSizeProps(size: number, height?: number): FontSizeProps {
  return {
    size: `${size}rem`,
    height: typeof(height) === 'number' ? `${height}rem` : '1'
  };
}


function buildFontWeightSet(weights: number[]): FontWeightSet {
  if (weights.length !== fontWeights.length) {
    throw new Error("unable to build font weight set from array of weights (numbers) - array length does not match the number of font-weight keys");
  }

  //else
  return fontWeights.reduce((ret: Partial<FontWeightSet>, key, index) => {
    ret[key] = `${weights[index]}`;
    return ret;
  }, {}) as FontWeightSet;

}

//#endregion