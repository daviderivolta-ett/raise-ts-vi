import { Poi } from '../../models/poi.model';

export class SelectedSuggestedPathCardComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _poi: Poi = new Poi();
    private _position: number = 0;

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
            <article class="selected-suggested-path-card" aria-labelledby="selected-suggested-path-card-title" aria-posinset="${this.position}" tabindex="${this.position}" aria-setsize="-1">
                <div class="selected-suggested-path-card-info">
                    <h3 class="selected-suggested-path-card-title" id="selected-suggested-path-card-title">${this.poi.props.find(p => p.displayName === 'Nome')?.value || this.poi.name}</h3>
                    <p class="selected-suggested-path-card-distance" role="text" aria-label="Distanza da te: ${Math.round(this.poi.distance || 0)} metri">
                        <span class="distance">${Math.round(this.poi.distance || 0)}</span>
                        <span aria-hidden="true">m</span>
                    </p>
                </div>
                <div class="selected-suggested-path-card-buttons">
                    <button type="button" class="poi-info-btn" aria-label="Vedi dettagli punto di interesse">
                        <span class="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            </article>

            <style>
                h3,
                p {
                    font-weight: 400;
                    margin: 0;
                }

                .selected-suggested-path-card {
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

                .selected-suggested-path-card-distance {
                    font-size: .9rem;
                    color: var(--on-surface-variant);
                    margin: 8px 0 0 0;
                }

                button {
                    font-family: 'Inter', Arial, Helvetica, sans-serif;
                    font-size: 1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 32px;
                    min-width: 32px;
                    box-sizing: border-box;
                    border-radius: var( --border-radius-s);
                }

                button:hover {
                    opacity: .8;
                }

                .selected-suggested-path-card-buttons {
                    display: flex;
                    gap: .5rem;
                }

                .poi-info-btn {
                    color: var(--on-primary-container);
                    background-color: var(--primary-container);
                    border: 1px solid transparent;
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

    public setup(): void {
        this.setupPoiInfoBtn();
    }

    private setupPoiInfoBtn(): void {
        const button: HTMLButtonElement | null = this.shadowRoot.querySelector('.poi-info-btn');
        if (!button) return;
        button.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('poi-selected', { detail: { selectedPoi: this.poi } }));
        });
    }
}

customElements.define('app-selected-suggested-path-card', SelectedSuggestedPathCardComponent);