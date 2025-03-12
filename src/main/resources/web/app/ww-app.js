import {LitElement, html, css} from 'lit';

import './ww-header.js';
import './ww-financial-advisor.js';
import './ww-footer.js';

class WwApp extends LitElement {

    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            width: 100vw;
            height: 100vh;
            justify-content: space-between;
            overflow: hidden;
        }
        .center {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            height: 100%;
        }
    `;    
    
    render() {
        return html`<div class="center">
                        <ww-header></ww-header>
                        <ww-financial-advisor></ww-financial-advisor>
                    </div>
                    <ww-footer></ww-footer>
          `;
    }
}
customElements.define('ww-app', WwApp);