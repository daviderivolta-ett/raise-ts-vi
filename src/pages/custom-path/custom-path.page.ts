export class CustomPathPage extends HTMLElement {
    public shadowRoot: ShadowRoot;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public connectedCallback(): void {
        this.render();
    }

    private render(): void {
        this.shadowRoot.innerHTML = '<p>custom-path</p>'
    }
}

customElements.define('page-custom-path', CustomPathPage);