
import {LitElement, html, css, nothing, unsafeCSS} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

import style from './hallpass-counter.css?inline';
import { globalTheme } from '../lib/global-theme';

@customElement('hallpass-counter')
export class hallpassCounter extends LitElement {

  static get styles() {
    return [unsafeCSS(style),
      css`
        :host {
          ${globalTheme.buildTypefaceDef('sans-serif')}
        }
        button {
          ${globalTheme.buildTypographyTheme({family: 'sans-serif', size: 'xl', weight: 'black'})}
          border-color: ${globalTheme.buildCssColor('neutral', 300)};
          background-color: ${globalTheme.buildCssColor('neutral', 50)};
          color: ${globalTheme.buildCssColor('primary', 600)};
          &:hover {
            background-color: ${globalTheme.buildCssColor('neutral', 200)};
            color: ${globalTheme.buildCssColor('primary', 800)};  
          }
        }
        .result {
          color: ${globalTheme.buildCssColor('primary', 600, .8)};
        }
      `
    ];
  }

  @property()
  result: 'Heads' | 'Tails' | null = null;
  @state()
  counter = 0;

  flipCoin() {
    this.counter++;
    if (Math.random() < 0.5) {
      this.result = 'Heads';
    } else {
      this.result = 'Tails';
    }
  }

  render() {
    return html`
      <button @click=${this.flipCoin}>Flip a coin!</button>
      ${this.result ? html`<span class="result">Result ${this.counter}: ${this.result}</span>` : nothing}      
    `;
  }
}