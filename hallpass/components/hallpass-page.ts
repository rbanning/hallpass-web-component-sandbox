import { pageRepo } from './../models/pages';
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { componentResetStyles } from '../lib/component-reset-styles';
import { globalTheme } from '../lib/global-theme';

@customElement('hallpass-page')
export class hallpassPage extends LitElement {
  static defaultPage = 'default';

  static get styles() {
    return [
      componentResetStyles,
      css`
        :host {
          display: block;
          margin: 0 1rem;
        }
        ${globalTheme.buildHeading('h1')}
        p {
          color: ${globalTheme.buildCssColor('accent', 500)};
        }
      `
    ]
  };


  @property()
  page: string = hallpassPage.defaultPage;

  override render() {
    return html`
      ${pageRepo[this.page]?.heading ?? pageRepo[hallpassPage.defaultPage]?.heading}
      <p>lorem ipsum ... ${this.page}</p>
      <hallpass-counter></hallpass-counter>
    `;
  }
}