export class BarElementComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    public linkEl: HTMLAnchorElement | null;

    constructor() {
        super();
        const template: HTMLTemplateElement = document.createElement('template');
        template.innerHTML =
            `
            <a href="">
                <slot name="bar-el-label"></slot>
                <span class="material-symbols-outlined">
                    <slot name="bar-el-icon"></slot>
                </span>
            </a>

            <style>
                .material-symbols-outlined {
                    font-family: 'Material Symbols Outlined';
                    font-size: 1.2rem;
                    font-variation-settings:
                        'FILL' 0,
                        'wght' 400,
                        'GRAD' 0,
                        'opsz' 24;
                }
            </style>
            `
            ;

        const content = template.content;
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
        this.shadowRoot.appendChild(content.cloneNode(true));
        this.linkEl = this.shadowRoot.querySelector('a');
    }

    public connectedCallback(): void {
        this.setup();
    }

    static observedAttributes: string[] = ['href'];

    public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        console.log(oldValue);        
        if (name === 'href') {
            if (this.linkEl) this.linkEl.setAttribute('href', newValue);
        }
    }

    private setup(): void {
        if (!this.linkEl) return;
        this.linkEl.addEventListener('click', (e: Event) => {
            e.preventDefault();
            if (!this.linkEl) return;
            const href: string | null = this.linkEl.getAttribute('href');
            if (href) window.location.hash = href;
        })
    }
}

customElements.define('app-bar-el', BarElementComponent);