import { Poi } from '../../models/poi.model';

export class PoiCard extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _poi: Poi = new Poi();

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public get poi(): Poi {
        return this._poi;
    }

    public set poi(poi: Poi) {
        this._poi = poi;
    }

    public connectedCallback(): void {
        this.render();
        this.setup();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <article class="poi-card">
                <div class="poi-card-info">
                    <h3 class="poi-card-title">${this.poi.name}</h3>
                    <p class="poi-card-distance">${Math.round(this.poi.distance!)}<span aria-label="metri">m</span></p>
                </div>
                <button type="button" class="info-btn" aria-label="Vedi dettagli punto di interesse">
                    <span class="material-symbols-outlined">chevron_right</span>
                </button>
            </article>

            <style>
                h3,
                p {
                    font-weight: 400;
                    margin: 0;
                }

                .poi-card-title {
                    margin: 0 0 8px 0;
                }

                .poi-card-distance {
                    color: var(--on-surface-variant);
                }

                .info-btn {
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
                    border-radius: var( --border-radius-s);
                    box-sizing: border-box;
                }

                .info-btn:hover {
                    opacity: 0.75;
                }

                .poi-card {
                    background-color: var(--surface-container);
                    color: var(--on-surface);
                    border: 1px solid var(--outline);
                    border-radius: var(--border-radius-s);
                    padding: 24px;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
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
        const button: HTMLButtonElement | null = this.shadowRoot.querySelector('.info-btn');
        if (!button) return;

        button.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('poi-selected', { detail: { selectedPoi: this.poi } }));
        });
    }
}

customElements.define('app-poi-card', PoiCard);