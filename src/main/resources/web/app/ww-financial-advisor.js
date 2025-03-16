import {LitElement, html, css} from 'lit';
import '@vaadin/icon';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';
import '@vaadin/icons';
import '@vaadin/button';
import '@vaadin/text-field';
import '@qomponent/qui-bubble';
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
            padding-bottom: 20px;
        }
        .input {
            display: flex;
            gap: 10px;
            align-items: baseline;
            align-self: center;
            width: 100%;
            justify-content: space-around;
        }
        .input vaadin-text-field {
            width: 80%;
        }
        .input vaadin-button {
            width: 20%;
        }
        
        .chat-messages {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .advisor-message {
            --chat-bubble-bg:#A5C882;
        }
        .user-message{
            --chat-bubble-bg:#5AB1BB;
        }

        .advisor-message-inner{
            width: 100%;
        }
        .chat-container{
            display: flex;
            flex-direction: column; 
            height: 100%;
            width: 80%;
            gap: 10px;
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

        this.ws = new WebSocket('ws://' + location.host + '/wealth-wise');
        this.ws.onmessage = (event) => {
            let response = JSON.parse(event.data).message;
            const htmlContent = this.md.render(response);

            this._replaceLastMessage({owner: 'advisor', message: htmlContent});
            this.shadowRoot.querySelector('#input')?.focus();    
        };
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.ws) {
            this.ws.close();
        }
    }

    render(){
        return html`
            <div class="chat-container">
                ${this._renderChatMessages()}
                ${this._renderInput()}
            </div>
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
                if(message.owner === 'user'){
                    return html`<qui-bubble class="user-message" name="You" icon="/static/user.png">
                        <p>${message.message}</p>
                    </qui-bubble>`;
                }else if(message.owner === 'advisor'){
                    return html`<qui-bubble class="advisor-message" name="Advisor" icon="/static/logo.png">
                        <span class="advisor-message-inner">${unsafeHTML(message.message)}</span>
                    </qui-bubble>`;
                } else if(message.owner === 'loading'){
                    return html`<qui-bubble class="advisor-message" name="Advisor" icon="/static/logo.png" typing></qui-bubble>`;
                }

            })}</div>`;
        }
    }

    _ask(){
        this._addToMessages({owner: 'user', message: this._question}, {owner: 'loading'});
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
