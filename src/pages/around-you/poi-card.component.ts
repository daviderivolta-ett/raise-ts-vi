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
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <h3>${this.poi.name}</h3>
            <p>${this.poi.name}</p>
            <p>${Math.round(this.poi.distance!)}m</p>
            `
            ;
    }
}

customElements.define('app-feature-card', PoiCard);