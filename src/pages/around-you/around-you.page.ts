export class AroudYouPage extends HTMLElement {
    public shadowRoot: ShadowRoot;
    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public connectedCallback(): void {
        this.render();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <h1>Punti di interesse</h1>
            <a href="./#/settings">Impostazioni</a>
            `
            ;
    }
}

customElements.define('page-around-you', AroudYouPage);