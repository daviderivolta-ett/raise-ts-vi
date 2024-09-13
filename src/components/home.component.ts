export class HomeBtnComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public connectedCallback(): void {
        this.render();
        this.setup();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <button type="button" aria-label="Torna alla profilazione">
                <span class="material-symbols-outlined">home</span>
            </button>

            <style>
                button {
                    cursor: pointer;
                    min-height: 40px;
                    min-width: 40px;
                    background-color: transparent;
                    border: none;
                    color: var(--on-surface);
                    background-color: var(--surface-container);
                    border-radius: var(--border-radius-m);

                    &:hover {
                        color: var(--on-surface-variant);
                    }
                }

                .material-symbols-outlined {
                    font-family: 'Material Symbols Outlined';
                    font-size: 1.6rem;
                    font-variation-settings:
                        'FILL' 0,
                        'wght' 400,
                        'GRAD' 0,
                        'opsz' 24;
                }
            </style>
            `
            ;
    }

    private setup(): void {
        const btn: HTMLButtonElement | null = this.shadowRoot.querySelector('button');
        if (btn) btn.addEventListener('click', () => window.location.href = 'https://ettspa.github.io/raise-webcomponent-webgis/');
    }
}

customElements.define('app-home', HomeBtnComponent);