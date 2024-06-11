export class BarElementComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    public linkEl: HTMLAnchorElement | null;

    constructor() {
        super();
        const template: HTMLTemplateElement = document.createElement('template');
        template.innerHTML =
            `
            <a class="bar-el-link" href="">
                <span class="material-symbols-outlined icon">
                    <slot name="bar-el-icon"></slot>
                </span>
            </a>

            <style>
                :host {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .bar-el-link {
                    cursor: pointer;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    color: var(--on-surface);
                    background-color: var(--surface-container-high);
                    font-size: .8rem;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                }

                .icon {
                    width: 66%;
                    height: 66%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 100px;
                }

                .current {
                    background-color: red;
                }

                .material-symbols-outlined {
                    font-family: 'Material Symbols Outlined';
                    font-size: 1.5rem;
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
        if (name === 'href') {
            if (this.linkEl) this.linkEl.setAttribute('href', newValue);
        }
    }

    private setup(): void {
        this.setupLinkBehaviour();
        this.checkCurrentPage();
    }

    private setupLinkBehaviour(): void {
        if (!this.linkEl) return;
        this.linkEl.addEventListener('click', (e: Event) => {
            e.preventDefault();
            if (!this.linkEl) return;
            const href: string | null = this.linkEl.getAttribute('href');
            if (href) window.location.hash = href
        });
    }

    private checkCurrentPage(): void {     
        window.addEventListener('hashchange', (e: Event) => {
            e.preventDefault();
            const hash: string = window.location.hash.slice(2);          
            if (this.linkEl) {
                const icon: HTMLSpanElement | null = this.shadowRoot.querySelector('.icon');
                if (!icon) return;
                hash === this.linkEl.getAttribute('href')?.slice(1) ? icon.classList.add('current') : icon.classList.remove('current');
            }
        });
    }
}

customElements.define('app-bar-el', BarElementComponent);