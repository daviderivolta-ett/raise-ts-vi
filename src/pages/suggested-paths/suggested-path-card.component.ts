import { Path } from '../../models/path.model';

export class SuggestedPathCardComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _path: Path = Path.createEmpty();
    private _position: number = 0;
    
    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public get path(): Path {
        return this._path;
    }

    public set path(path: Path) {
        this._path = path;
    }

    public get position(): number {
        return this._position;
    }

    public set position(position: number) {
        this._position = position;
    }

    public connectedCallback(): void {
        this.render();
        this.setup();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <article class="suggested-path-card" aria-labelledby="suggested-path-card-title" aria-posinset="${this.position}" tabindex="${this.position}" aria-setsize="-1">
                <div class="poi-card-info">
                    <h3 class="suggested-path-card-title">${this.path.name}</h3>
                    <p class="suggested-path-card-length" aria-label="Tappe in questo percorso: ${this.path.pois.length}">${this.path.pois.length} tappe</p>
                </div>
                <button type="button" class="path-info-btn" aria-label="Apri percorso suggerito: ${this.path.name}">
                    <span class="material-symbols-outlined">chevron_right</span>
                </button>
            </article>

            <style>
                h3,
                p {
                    font-weight: 400;
                    margin: 0;
                }

                .suggested-path-card-title {
                    font-size: 1rem;
                    margin: 0 0 8px 0;
                }

                .suggested-path-card-lenght {
                    font-size: .9rem;
                    color: var(--on-surface-variant);
                }

                .path-info-btn {
                    font-family: 'Inter', Arial, Helvetica, sans-serif;
                    font-size: 1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 32px;
                    min-width: 32px;
                    color: var(--on-primary-container);
                    background-color: var(--primary-container);
                    border: 1px solid transparent;
                    border-radius: var( --border-radius-m);
                    box-sizing: border-box;
                }

                .path-info-btn:hover {
                    opacity: 0.75;
                }

                .suggested-path-card {
                    background-color: var(--surface-container);
                    color: var(--on-surface);
                    border: 1px solid var(--outline);
                    border-radius: var(--border-radius-m);
                    padding: 24px;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .suggested-path-card-length {
                    color: var(--on-surface-variant);
                }

                button {
                    cursor: pointer;
                }

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
    }

    private setup(): void {
        this.setupPoiInfoBtn();
    }

    private setupPoiInfoBtn(): void {
        const button: HTMLButtonElement | null = this.shadowRoot.querySelector('.path-info-btn');
        if (!button) return;
        button.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('suggested-path-selected', { detail: { selectedSuggestedPath: this.path } }));
        });
    }
}

customElements.define('app-suggested-path-card', SuggestedPathCardComponent);