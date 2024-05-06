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
            <div class="poi-card">
                <h3>${this.poi.name}</h3>
                <div class="poi-card-info">
                    <p>${this.poi.name}</p>
                    <p>${Math.round(this.poi.distance!)}m</p>
                </div>
            </div>

            <style>
                .poi-card {
                    cursor: pointer;
                    border: 1px solid var(--outline);
                }

                .poi-card-info {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
            </style>

            `
            ;
    }

    private setup(): void {
        this.addEventListener('click', () => {           
            this.dispatchEvent(new CustomEvent('poi-selected', { detail: { selectedPoi: this.poi } }));
        });
    }
}

customElements.define('app-poi-card', PoiCard);