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
        this.shadowRoot.innerHTML =
            `
            <div class="custom-path-page">
                <nav>
                    <button type="button" aria-label="Riordina punti di interesse">Riordina punti di interesse</button>
                    <button type="button" aria-label="Modifica percorso">Modifica percorso</button>
                    <button type="button" aria-label="Crea nuovo percorso">Crea nuovo percorso</button>
                    <button type="button" aria-label="Salva percorso">Salva percorso</button>
                    <button type="button" aria-label="Carica percorsi salvati">Carica percorsi salvati</button>
                </nav>
                <h1>Percorso personalizzato</h1>
                <div class="custom-path-list"></div>
            </div>
            `
            ;
    }
}

customElements.define('page-custom-path', CustomPathPage);