export class SnackbarComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public connectedCallback(): void {
        this.render();
    }

    private render(): void {
        
    }
}

customElements.define('app-snackbar', SnackbarComponent);