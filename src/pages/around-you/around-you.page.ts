import { Poi } from '../../models/poi.model';
import { PositionService } from '../../services/position.service';
import { GeoGraphicService } from '../../services/geographic.service';
import { HaversineService } from '../../services/haversine.service';
import { LayerService } from '../../services/layer.service';
import { PoiService } from '../../services/poi.service';
import { PoiCard } from './poi-card.component';
import { LoaderComponent } from '../../components/loader.component';
import '../../components/menu.component';
import './poi-card.component';

export class AroudYouPage extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _pois: Poi[] = [];

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public get pois(): Poi[] {
        return this._pois;
    }

    public set pois(pois: Poi[]) {
        this._pois = pois;
    }

    public async connectedCallback(): Promise<void> {
        this.createLoader();
        LayerService.instance.getSavedLayers();
        const position: GeolocationPosition = await PositionService.instance.getUserPosition();
        this.pois = await GeoGraphicService.instance.getPoisFromLayers(LayerService.instance.activeLayers);
        this.pois = this.orderPoisByDistance(position, this.pois);
        this.render();
        this.setup();
        this.removeLoader();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <button id="app-menu-btn" aria-label="apri menu">Menu</button>
            <dialog is="app-menu" aria-labelledby="menu-title"></dialog>
            <h1>Punti di interesse</h1>
            <a href="/#/settings">Impostazioni</a>
            <div class="around-you-features"></div>
            `
            ;

        const list: HTMLDivElement | null = this.shadowRoot.querySelector('.around-you-features');
        if (!list) return;

        this.pois.forEach((feature: Poi) => {
            const card: PoiCard = document.createElement('app-feature-card') as PoiCard;
            card.poi = feature;
            list.append(card);
        });
    }

    private setup(): void {
        const menuBtn: HTMLButtonElement | null = this.shadowRoot.querySelector('button#app-menu-btn');
        const menu: HTMLDialogElement | null = this.shadowRoot.querySelector('dialog[is="app-menu"]');
        
        if (!menuBtn) return;
        if (!menu) return;

        menuBtn.addEventListener('click', () => menu.showModal());

        const cards: NodeListOf<PoiCard> = this.shadowRoot.querySelectorAll('app-feature-card');
        cards.forEach((card: PoiCard) => {
            card.addEventListener('poi-selected', (e: CustomEventInit) => {
                PoiService.instance.selectedPoi = e.detail.selectedPoi;
                window.location.href = '/#/poi';
            });
        })
    }

    private createLoader(): void {
        const loader: LoaderComponent = new LoaderComponent();     
        document.body.append(loader);
    }

    private removeLoader(): void {
        const loader: LoaderComponent | null = document.body.querySelector('app-loader');
        if (!loader) return;
        loader.remove();
    }

    private orderPoisByDistance(position: GeolocationPosition, pois: Poi[]): Poi[] {
        const haversine: HaversineService = new HaversineService();

        pois.forEach((poi: Poi) => {
            if (!GeoGraphicService.instance.isCoordinatesMultidimensional(poi.coordinates)) {
                const lat = Array.isArray(poi.coordinates) ? poi.coordinates[1] : poi.coordinates;
                const lon = Array.isArray(poi.coordinates) ? poi.coordinates[0] : poi.coordinates;
                const distance = haversine.haversineDistance(lat as number, lon as number, position.coords.latitude, position.coords.longitude);
                // const distance = haversine.haversineDistance(lat as number, lon as number, 44.44416497901924, 8.732173415343668);
                poi.distance = distance;
            }
        });

        pois.sort((a, b) => {
            if (a.distance && b.distance) return a.distance - b.distance;
            return 0;
        });

        return pois;
    }
}

customElements.define('page-around-you', AroudYouPage);