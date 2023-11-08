import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { componentResetStyles } from '../lib/component-reset-styles';

@customElement('hallpass-home') 
export class hallpassHome extends LitElement {
  static get styles() {
    return [
      componentResetStyles,
      css`
        :host {
          display: block;
          font-size: 2rem;
          color: rgba(0,0,0, 0.8);
          background-color: rgba(0,100,0, 0.1);
        }
        .site-name {
          padding: 0 1rem;
          margin-bottom: 1rem;
          font-size: 3rem;
          color: rgba(0,100,0, 1);
        }
        footer {
          margin-top: 8rem;
          padding: 1rem; 1rem;
          font-size: 1rem;
          background-color: rgba(0,100,0, 0.2);
          color: rgba(0,0,0, 0.6);
        }
      `
    ];
  }



  override render() {
    const path: string[] = document.location.pathname.split('/').filter(Boolean);

    return html`
      <div class="site-name">Web Component Sandbox</div>
      <main>
        <hallpass-page page="${path[0] ?? ''}"></hallpass-page>
      </main>
      <footer>&copy; 2023 - Hallpass and Friends - all rights reserved - ${path.join('-')}</footer>
    `;
  }
}
