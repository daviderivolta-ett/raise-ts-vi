import { Feature, FeatureGeometry, FeatureGeometryType } from '../../models/feature.model';
import { Layer } from '../../models/layer.model';
import { GeoGraphicService } from '../../services/geographic.service';
import { HaversinService } from '../../services/haversine.service';
import { LayerService } from '../../services/layer.service';
import { PositionService } from '../../services/position.service';
import { FeatureCard } from './feature-card.component';
import './feature-card.component';

export class AroudYouPage extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _features: Feature[] = [];

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public get features(): Feature[] {
        return this._features;
    }

    public set features(features: Feature[]) {
        this._features = features;
    }

    public async connectedCallback(): Promise<void> {
        LayerService.instance.getSavedLayers();
        const position: GeolocationPosition = await PositionService.instance.getUserPosition();

        const geoJsonPromises: Promise<any>[] = LayerService.instance.activeLayers.map(async (layer: Layer) => {
            return GeoGraphicService.instance.createGeoJson(layer);
        });

        const geoJsons: any = await Promise.all(geoJsonPromises);

        geoJsons.forEach((geoJson: any) => {
            geoJson.features.forEach((f: Feature) => this.features.push(f));
        });

        console.log(this.features);     

        this.render();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <h1>Punti di interesse</h1>
            <a href="/raise-ts-vi/#/settings">Impostazioni</a>
            <div class="around-you-features"></div>
            `
            ;

        const list: HTMLDivElement | null = this.shadowRoot.querySelector('.around-you-features');
        if (!list) return;

        this.features.forEach((feature: Feature) => {
            const card: FeatureCard = document.createElement('app-feature-card') as FeatureCard;
            card.feature = feature;
            this.shadowRoot.append(card);
        });
    }
}

customElements.define('page-around-you', AroudYouPage);