import {LitElement, html, css} from 'lit';

class WwInsights extends LitElement {
    static styles = css`
        
    `;
    
    static properties = {
        
    };
    
    constructor() {
        super();
    }
    
    connectedCallback() {
        super.connectedCallback();
    }

    render(){
        return html`<span>Insights</span>`;
    }
    
}
customElements.define('ww-insights', WwInsights);
