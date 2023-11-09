import { CSSResult, unsafeCSS } from "lit";
import { CssColorParams, buildCssColor } from "./colors";
import { MarginParam, buildMargin } from "./margins";
import { TypographyTheme, buildTypographyTheme } from "./typography";

const headings = ['h1','h2','h3','h4','h5','h6'] as const;
export type HeadingName = typeof headings[number];
export type HeadingTheme = {
  typography: TypographyTheme,
  margin: MarginParam,
  color: CssColorParams
};

export type HeadingThemeSet = {[key in HeadingName]: HeadingTheme};


const headingThemeSet: HeadingThemeSet = {
  'h1': {
    typography: {
      family: 'sans-serif',
      size: '4xl',
      weight: 'light'
    },
    margin: { b: 4 },
    color: {
      name: 'primary',
      intensity: 500
    }
  },
  'h2': {
    typography: {
      family: 'sans-serif',
      size: '2xl',
      weight: 'semibold'
    },
    margin: { b: 2 },
    color: {
      name: 'primary',
      intensity: 400
    }
  },
  'h3': {
    typography: {
      family: 'sans-serif',
      size: '2xl',
      weight: 'medium'
    },
    margin: {},
    color: {
      name: 'accent',
      intensity: 300
    }
  },
  'h4': {
    typography: {
      family: 'sans-serif',
      size: 'xl',
      weight: 'semibold'
    },
    margin: {},
    color: {
      name: 'neutral',
      intensity: 500
    }
  },
  'h5': {
    typography: {
      family: 'sans-serif',
      size: 'lg',
      weight: 'semibold'
    },
    margin: {},
    color: {
      name: 'neutral',
      intensity: 300
    }
  },
  'h6': {
    typography: {
      family: 'sans-serif',
      size: 'base',
      weight: 'bold'
    },
    margin: {},
    color: {
      name: 'neutral',
      intensity: 500
    }
  },
}


export const buildHeading = (heading: HeadingName): CSSResult => {
  const theme = headingThemeSet[heading];
  return unsafeCSS(`
    ${buildTypographyTheme(theme.typography)}
    ${buildMargin(theme.margin)}
    color: ${buildCssColor(theme.color.name, theme.color.intensity, theme.color.opacity)};
  `);
}