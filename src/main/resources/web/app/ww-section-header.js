import {LitElement, html, css} from 'lit';
import '@vaadin/icon';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';
import '@vaadin/icons';

class WwSectionHeader extends LitElement {
    static styles = css`
        .sectionHeader {
            font-size: 24px;
            font-weight: 300;
            width: 100%;
            gap: 20px;
        }
    `;
    
    static properties = {
        title: {type: String},
    };
  
    constructor() {
        super();
        this.title = "";
    }
  
    connectedCallback() {
        super.connectedCallback();
    }
  
    render() {
        return html`<span class="sectionHeader">${this.title}</span>`;
    }
}
customElements.define('ww-section-header', WwSectionHeader);