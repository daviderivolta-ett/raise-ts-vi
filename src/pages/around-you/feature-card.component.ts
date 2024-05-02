import { Feature } from '../../models/feature.model';

export class FeatureCard extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _feature: Feature = Feature.createEmpty();

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public get feature(): Feature {
        return this._feature;
    }

    public set feature(feature: Feature) {
        this._feature = feature;
    }

    public connectedCallback(): void {
        this.render();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <p>${this.feature.id}</p>
            `
            ;
    }
}

customElements.define('app-feature-card', FeatureCard);