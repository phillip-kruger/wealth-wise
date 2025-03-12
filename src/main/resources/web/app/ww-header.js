import {LitElement, css, html} from 'lit';
import '@vaadin/icon';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';
import '@vaadin/icons';
import '@vaadin/tooltip';

class WwHeader extends LitElement {
  static styles = css`
        :host {
            display: flex;
            justify-content: center;
            font-size: 100px;
            line-height: 100px;
            height: 100px;
            font-weight: 100;
            padding-top: 20px;
            padding-bottom: 20px;
        }
        
        .logoHeader {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
        }
        
        .title {
            align-self: center;
            padding-left: 20px;
        }
        .logo {
            align-self: center;
            width: 128px;
            height: 128px;
        }
        .theme-switch {
            height: 25px;
            position: absolute;
            right: 30px;
            cursor: pointer;
            width: 25px;
        }
    `;

    static properties = {
        _nextTheme: {state: true},
        _currentTheme: {state: true},
    }

    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback()
        this._currentTheme = this._retrieveTheme();
        const body = document.body;
        body.setAttribute('theme', this._currentTheme);
    }

    

    render() {
      return html`<div class="logoHeader">
        <img class="logo" src="static/logo.png"/> 
        <span class="title">Wealth wise</span>
    </div>
    <vaadin-icon id="themeFlipIcon" class="theme-switch" icon="vaadin:adjust" @click="${this._switchTheme}"></vaadin-icon>
    <vaadin-tooltip for="themeFlipIcon" text="Switch to ${this._flip(this._currentTheme)} theme" position="start"></vaadin-tooltip>  
              `;
    }

    _switchTheme(){
          const body = document.body;
          if (body.getAttribute('theme') === 'light') {
              this._currentTheme = "dark";
          } else {
              this._currentTheme = "light";
          }
          body.setAttribute('theme', this._currentTheme);
          this._storeTheme(this._currentTheme);
    }

    _flip(theme){
        if (theme === 'light') {
            return "dark";
        } else {
            return "light";
        }
    }

    _storeTheme(theme){
        localStorage.setItem("theme", theme);
    }

    _retrieveTheme(){
        let theme = localStorage.getItem("theme");
        if(theme === null){
            return "light";
        }
        return theme;
    }
}
customElements.define('ww-header', WwHeader);