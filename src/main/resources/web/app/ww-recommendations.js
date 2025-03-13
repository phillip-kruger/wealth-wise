import {LitElement, html, css} from 'lit';

class WwRecommendations extends LitElement {
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
        return html`<span>Recommendations</span>`;
    }
    
}
customElements.define('ww-recommendations', WwRecommendations);
