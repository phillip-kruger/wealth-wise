import {LitElement, html, css} from 'lit';
import '@vaadin/icon';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';
import '@vaadin/icons';
import '@vaadin/progress-bar';
import '@vaadin/button';
import '@vaadin/text-field';
import '@qomponent/qui-bubble';
import './ww-section-header.js';
import MarkdownIt from 'markdown-it';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

class WwFinancialAdvisor extends LitElement {
    static styles = css`
        :host {
            display: flex;
            gap: 10px;
            flex-direction: column;
            align-items: center;
            height: 100%;
            overflow: hidden;
            padding-bottom: 20px;
        }
        .input {
            display: flex;
            gap: 10px;
            align-items: baseline;
            width: 80vw;
            justify-content: space-around;
        }
        .input vaadin-text-field {
            width: 80%;
        }
        .input vaadin-button {
            width: 20%;
        }
        
        .chat-messages {
            width: 80%;
            overflow: scroll;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .advisor-message {
            --chat-bubble-bg:#A5C882;
        }
        .chat-messages{
            --chat-bubble-bg:#5AB1BB;
        }

        .advisor-message-inner{
            width: 100%;
        }
    `;
    
    static properties = {
        _question: {type: String},
        _chatMessages: {type: Array},
    };
    
    constructor() {
        super();
        this._question = '';
        this._chatMessages = [];
        this.md = new MarkdownIt();
    }
    
    connectedCallback() {
        super.connectedCallback();

        this.ws = new WebSocket('ws://' + location.host + '/financial-advisor');
        this.ws.onmessage = (event) => {
            let response = JSON.parse(event.data).message;
            const htmlContent = this.md.render(response);

            this._replaceLastMessage({type: 'advisor', message: htmlContent});
            this.shadowRoot.querySelector('#input')?.focus();    
        };
    }

    render(){
        return html`<ww-section-header title="Financial Advisor"></ww-section-header>
        ${this._renderChatMessages()}
        ${this._renderInput()}
        `;
    }
    
    firstUpdated(){
        this.shadowRoot.querySelector('#input')?.focus();
    }

    _renderInput(){
        return html`<div class="input">
                        <vaadin-text-field id="input"
                            placeholder="Ask me anything about your finances" 
                            .value=${this._question}
                            @input=${this._handleInput}
                            @keypress=${this._handleKeyPress}>
                        </vaadin-text-field>
        <vaadin-button @click=${this._ask}>Ask</vaadin-button></div>`;
    }

    _renderChatMessages(){
        if(this._chatMessages.length > 0){
            return html`<div class="chat-messages">${this._chatMessages.map(message => {
                if(message.type === 'user'){
                    return html`<qui-bubble class="user-message" name="You" icon="/static/user.png">
                        <p>${message.message}</p>
                    </qui-bubble>`;
                }else if(message.type === 'advisor'){
                    return html`<qui-bubble class="advisor-message" name="Advisor" icon="/static/logo.png">
                        <span class="advisor-message-inner">${unsafeHTML(message.message)}</span>
                    </qui-bubble>`;
                } else if(message.type === 'loading'){
                    return html`<qui-bubble class="advisor-message" name="Advisor" icon="/static/logo.png" typing></qui-bubble>`;
                }

            })}</div>`;
        }
    }

    _ask(){
        this._addToMessages({type: 'user', message: this._question}, {type: 'loading'});
        this.ws.send(JSON.stringify({type: 'CHAT_MESSAGE', message: this._question}));
        this._question = '';
    }

    _handleInput(event){
        this._question = event.target.value;
    }

    _handleKeyPress(event){
        if(event.key === 'Enter'){
            this._ask();
        }
    }

    _addToMessages(...messages){
        this._chatMessages = [...this._chatMessages, ...messages];
        this._scrollToBottom();
    }

    _replaceLastMessage(newMessage) {
        if (this._chatMessages.length === 0) return;
        this._chatMessages.pop();
        this._addToMessages(newMessage);
        this._scrollToBottom();
    }

    _scrollToBottom() {
        const chatContainer = this.shadowRoot.querySelector('.chat-messages');
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }
}
customElements.define('ww-financial-advisor', WwFinancialAdvisor);
