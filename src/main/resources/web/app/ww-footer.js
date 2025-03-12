import {LitElement, css, html} from 'lit';
import '@vaadin/horizontal-layout';

class WwFooter extends LitElement {
    static styles = css`
        footer, footer a {
            color: var(--lumo-contrast-70pct);
            font-size: 10px;
        }
    `;
    
    render() {
        return html`
            <footer>
                <vaadin-horizontal-layout theme="spacing-xs padding" style="justify-content: center">
                    (c) WealthWise Pty Ltd 2025
                </vaadin-horizontal-layout>

            </footer>
        `;
    }
}
customElements.define('ww-footer', WwFooter);
