import { pageRepo } from './../models/pages';
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { componentResetStyles } from '../lib/component-reset-styles';

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
        h1 {
          font-size: 2rem;
          color: rgba(0,100,0, 0.5);
          margin-bottom: 1rem;
        }
        p {
          color: #94a3b8;
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