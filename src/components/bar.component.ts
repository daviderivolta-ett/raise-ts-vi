import './bar-element.component';

export class BarComponent extends HTMLElement {
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
            <nav class="menu" aria-label="menu">
                <app-bar-el href="/categories" aria-label="categorie">
                    <span slot="bar-el-label">Seleziona categoria</span>
                    <span slot="bar-el-icon">stacks</span>
                </app-bar-el>
                <app-bar-el href="/around-you" aria-label="intorno a te">
                    <span slot="bar-el-label">Intorno a te</span>
                    <span slot="bar-el-icon">explore</span>
                </app-bar-el>
                <app-bar-el href="/suggested-paths" aria-label="percorsi suggeriti">
                    <span slot="bar-el-label">Percorsi suggeriti</span>
                    <span slot="bar-el-icon">personal_places</span>
                </app-bar-el>
                <app-bar-el href="/custom-path" aria-label="percorso personalizzato">
                    <span slot="bar-el-label">Percorso salvato</span>
                    <span slot="bar-el-icon">favorite</span>
                </app-bar-el>
                <app-bar-el href="/settings" aria-label="impostazioni">
                    <span slot="bar-el-label">Impostazioni</span>
                    <span slot="bar-el-icon">settings</span>
                </app-bar-el>
            </nav>

            <style>
                .menu {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0;
                    margin: 0;
                    list-style-type: none;
                    height: 48px;
                    background-color: var(--surface-container-high);
                }
            </style>
            `
    }

    private setup(): void { }

}

customElements.define('app-bar', BarComponent);