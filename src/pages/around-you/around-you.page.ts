import { Poi } from '../../models/poi.model';
import { PositionService } from '../../services/position.service';
import { GeoGraphicService } from '../../services/geographic.service';
import { LayerService } from '../../services/layer.service';
import { PoiService } from '../../services/poi.service';
import { PoiCard } from './poi-card.component';
// import { LoaderComponent } from '../../components/loader.component';
import { SnackbarService } from '../../services/snackbar.service';
import { SnackbarType } from '../../models/snackbar.model';
import './poi-card.component';
import { EventObservable } from '../../observables/event.observable';

export class AroudYouPage extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _pois: Poi[] = [];
    private _isLoading: boolean = true;
    private hasrenderedError: boolean = false;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public get pois(): Poi[] { return this._pois }
    public set pois(pois: Poi[]) {
        this._pois = pois;

        if (this.pois.length === 0 && !this.hasrenderedError) {
            this.renderMsg('empty');
            this.hasrenderedError = true;
            return;
        }

        this.update();
        this.setupCards();
    }

    public async connectedCallback(): Promise<void> {
        SnackbarService.instance.updateSnackbar(SnackbarType.Info, 'Caricamento...');

        await PositionService.instance.startWatchingPosition();
        this.render();
        this.setup();


        if (LayerService.instance.activeLayers.length === 0) {
            this.renderMsg('empty');
            return;
        }

        SnackbarService.instance.resetSnackbar();
    }

    public disconnectedCallback(): void {
        this.hasrenderedError = false;
        PositionService.instance.stopWatchingPosition();
        EventObservable.instance.unsubscribeAll('position-update');
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <div class="around-you-page">
                <div class="page-header">
                    <h1 class="page-title" tabindex="-1">Punti di interesse</h1>
                </div>
                <p class="page-desc">Elenco punti di interesse nelle vicinanze</p>
                <section class="around-you-features" role="feed"></section>
            </div>

            <style>
                :host {
                    display: block;
                    padding:  0 0 5rem 0;
                }
                
                h1,
                p {
                    font-weight: 400;
                    margin: 0;
                }

                .around-you-page {
                    padding: 0 4%;
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
                    cursor: pointer;
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                    color: var(--on-surface);
                    background-color: transparent;
                    border: none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0;
                    height: 40px;
                    width: 40px;
                }
                
                .page-title {
                    text-align: center;
                    font-size: 1rem;
                }

                .page-desc {
                    text-align: center;
                    margin: 0 0 24px 0;
                    color: var(--on-surface-variant);
                }

                .around-you-features {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .message {
                    text-align: center;
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

        const title: HTMLHeadingElement | null = this.shadowRoot.querySelector('h1');
        if (title) title.focus();
    }

    private setup(): void {
        EventObservable.instance.subscribe('position-update', async (position: GeolocationPosition) => {
            console.log('position updated');
            
            if (this._isLoading) this.renderMsg('loading');
            this._isLoading = false;

            if (!position) {
                this.renderMsg('error');
                return;
            }

            let pois: Poi[] = [];
            pois = [...await GeoGraphicService.instance.getPoisFromLayers(LayerService.instance.activeLayers)];
            this.pois = [...GeoGraphicService.instance.orderPoisByDistance(position, pois)];

            const err: HTMLParagraphElement | null = this.shadowRoot.querySelector('.message');
            if (err) err.remove();
        });
    }

    private update(): void {
        if (this.pois.length === 0) return;

        const err: HTMLParagraphElement | null = this.shadowRoot.querySelector('.message');
        if (err) err.remove();

        const list: HTMLElement | null = this.shadowRoot.querySelector('.around-you-features');
        if (!list) return;

        list.innerHTML = '';

        this.pois.forEach((poi: Poi, index: number) => {
            const card: PoiCard = document.createElement('app-poi-card') as PoiCard;
            card.poi = poi;
            card.position = index + 1;
            list.append(card);
        });
    }

    private setupCards(): void {
        const cards: NodeListOf<PoiCard> = this.shadowRoot.querySelectorAll('app-poi-card');
        cards.forEach((card: PoiCard) => {
            card.addEventListener('poi-selected', (e: CustomEventInit) => {
                PoiService.instance.selectedPoi = e.detail.selectedPoi;
                window.location.hash = '/poi';
            });
        });
    }

    // private createLoader(): void {
    //     const loader: LoaderComponent = new LoaderComponent();     
    //     document.body.append(loader);
    // }

    // private removeLoader(): void {
    //     const loader: LoaderComponent | null = document.body.querySelector('app-loader');
    //     if (!loader) return;
    //     loader.remove();
    // }

    private renderMsg(type: 'loading' | 'empty' | 'error'): void {
        const page: HTMLDivElement | null = this.shadowRoot.querySelector('.around-you-page');
        if (!page) return;
        const msg: HTMLParagraphElement = document.createElement('p');

        switch (type) {
            case 'loading':
                msg.innerText = 'Caricamento...'
                break;
            case 'error':
                msg.innerText = 'Impossibile trovare la tua posizione.\n\nPer mostrare i punti di interesse nelle vicinanze è necessario concedere all\'app l\'autorizzazione ad accedere alla posizione del dispositivo.';
                break;
            default:
                msg.innerText = 'Impossibile trovare punti di interesse nelle vicinanze senza selezionare alcuna categoria.\n\nAndare nella sezione "Categorie" e sceglierne una.';
                break;
        }

        msg.classList.add('message');
        page.appendChild(msg);
    }
}

customElements.define('page-around-you', AroudYouPage);