import {LitElement, html, css} from 'lit';

import MarkdownIt from 'markdown-it';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '@vaadin/item';
import '@vaadin/list-box';
import '@vaadin/progress-bar';

class WwInvestmentRecommendations extends LitElement {
    static styles = css`
        .investment-recommendations{
            display: flex;
            flex-direction: row;
            gap: 20px;
            padding-left: 40px;
            padding-right: 40px;
            height: 100%;
        }
        .investment-recommendations-menu{
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 12%;
            border-radius: 30px 30px 30px 30px;
            -webkit-border-radius: 30px 30px 30px 30px;
            -moz-border-radius: 30px 30px 30px 30px;
            border: 1px solid #b2a06a;
            padding: 15px;
        }
        .recommendations-response{
            width: 88%;
            height: 100%;
            overflow-y: auto;
        }
    `;
    
    static properties = {
        _response: {type: String},
        _inprogress: {type: Boolean},
        _riskLevel: {type: String}
    };
    
    constructor() {
        super();
        this.md = new MarkdownIt();
        this._response = '';
        this._inprogress = false;
        this._riskLevel = null;
        this._riskLevels = ['Conservative', 'Balanced', 'Aggressive'];
    }
    
    connectedCallback() {
        super.connectedCallback();

        this.ws = new WebSocket('ws://' + location.host + '/wealth-wise');
        this.ws.onmessage = (event) => {
            this._inprogress = false;
            let response = JSON.parse(event.data).message;
            this._response = this.md.render(response);
        };
    }

    render(){

        return html`<div class="investment-recommendations">
            <div class="investment-recommendations-menu">
                <span>Select your risk level</span>
                <vaadin-list-box @selected-changed=${this._handleRiskLevelChange}>
                    ${this._riskLevels.map(riskLevel => html`<vaadin-item>${riskLevel}</vaadin-item>`)}
                </vaadin-list-box>
            </div>
            ${this._renderInvestmentRecommendations()}
        </div>`;
    }

    _renderInvestmentRecommendations(){
        if(this._response){
            return html`<div class="recommendations-response">${unsafeHTML(this._response)}</div>`;
        }else if(this._inprogress){
            return html`<vaadin-progress-bar indeterminate></vaadin-progress-bar>`;
        }
    }

    _handleRiskLevelChange(event){
        let newLevel = this._riskLevels[event.detail.value];
        if(newLevel !== this._riskLevel){
            this._response = '';
            this._inprogress = true;
            this.ws.send(JSON.stringify({type: 'INVESTMENT_MESSAGE', message: newLevel}));
        }
    }
}
customElements.define('ww-investment-recommendations', WwInvestmentRecommendations);
