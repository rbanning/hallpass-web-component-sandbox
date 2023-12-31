import { css } from 'lit';
import { globalTheme } from './global-theme';

export const componentResetStyles = css`
  ${globalTheme.buildTypographyTheme()}
  ${globalTheme.buildCssColorTheme()}
  div,p,main,section,article,header,footer,
  h1,h2,h3,h4,h5,h6,
  ul,ol,dl 
  {
    margin: 0; padding: 0; font-size: 1rem; font-weight: normal;
  }
`;

console.log("DEBUG: ", {componentResetStyles});