import { Poi } from '../../models/poi.model';
import { PositionService } from '../../services/position.service';
import { GeoGraphicService } from '../../services/geographic.service';
import { LayerService } from '../../services/layer.service';
import { PoiService } from '../../services/poi.service';
import { PoiCard } from './poi-card.component';
import { LoaderComponent } from '../../components/loader.component';
import { SnackbarService } from '../../services/snackbar.service';
import { SnackbarType } from '../../models/snackbar.model';
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
        const position: GeolocationPosition = await PositionService.instance.getUserPosition();
        SnackbarService.instance.updateSnackbar(SnackbarType.Info, 'Caricamento...');
        this.pois = await GeoGraphicService.instance.getPoisFromLayers(LayerService.instance.activeLayers);
        this.pois = GeoGraphicService.instance.orderPoisByDistance(position, this.pois);
        this.render();
        this.setup();
        this.removeLoader();
        SnackbarService.instance.resetSnackbar();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <div class="around-you-page">
                <div class="page-header">
                    <h1 class="page-title" tabindex="-1">Punti di interesse</h1>
                    <button is="app-menu-btn" aria-label="apri menu">
                    <span class="material-symbols-outlined">menu</span>
                    </button>
                </div>
                <p class="page-desc">Elenco punti di interesse nelle vicinanze.</p>
                <div class="around-you-features"></div>
            </div>

            <style>
                h1,
                p {
                    font-weight: 400;
                    margin: 0;
                }

                .page-header {
                    position: relative;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 0 24px 0;
                }
                
                button[is="app-menu-btn"] {
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                    color: var(--on-surface);
                    background-color: transparent;
                    border: none;
                }

                .page-desc {
                    text-align: center;
                    margin: 0 0 24px 0;
                    color: var(--on-surface-variant);
                }
                
                .page-title {
                    text-align: center;
                    font-size: 1rem;
                }

                .around-you-features {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
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

        const list: HTMLDivElement | null = this.shadowRoot.querySelector('.around-you-features');
        if (!list) return;

        this.pois.forEach((poi: Poi) => {
            const card: PoiCard = document.createElement('app-poi-card') as PoiCard;
            card.poi = poi;
            list.append(card);
        });

        const title: HTMLHeadingElement | null = this.shadowRoot.querySelector('h1');
        if (title) title.focus();
    }

    private setup(): void {
        const cards: NodeListOf<PoiCard> = this.shadowRoot.querySelectorAll('app-poi-card');
        cards.forEach((card: PoiCard) => {
            card.addEventListener('poi-selected', (e: CustomEventInit) => {
                PoiService.instance.selectedPoi = e.detail.selectedPoi;             
                window.location.hash = '/poi';
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
}

customElements.define('page-around-you', AroudYouPage);