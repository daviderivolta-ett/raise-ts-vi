import { Poi } from '../../models/poi.model';

export class SelectedSuggestedPathCardComponent extends HTMLElement {
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
            <div class="custom-path-card">
                <h4 class="custom-path-card-title">${this.poi.name}</h4>
                <button type="button" id="poi-info-btn">Vedi tappa</button>
            </div>
            `
            ;
    }

    public setup(): void {
        this.setupPoiInfoBtn();
    }

    private setupPoiInfoBtn(): void {
        const button: HTMLButtonElement | null = this.shadowRoot.querySelector('#poi-info-btn');
        if (!button) return;
        button.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('poi-selected', { detail: { selectedPoi: this.poi } }));
        });
    }
}

customElements.define('app-selected-suggested-path-card', SelectedSuggestedPathCardComponent);