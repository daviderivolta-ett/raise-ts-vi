import { Poi } from '../../models/poi.model';
import { SnackbarType } from '../../models/snackbar.model';

import { GeoGraphicService } from '../../services/geographic.service';
import { LayerService } from '../../services/layer.service';
import { PoiService } from '../../services/poi.service';
import { PositionService } from '../../services/position.service';
import { SnackbarService } from '../../services/snackbar.service';

import { PoiCard } from './poi-card.component';

// Template
const template: HTMLTemplateElement = document.createElement('template');
template.innerHTML =
    `
    <div class="around-me-page">
        <div class="page-header">
            <h1 tabindex="-1" class="title">Punti di interesse</h1>
        </div>
        <p class="desc">Elenco punti di interesse nelle vicinanze</p>
        <section class="around-you-features" role="feed"></section>
        <div class="message"></div>
    </div>
    `
    ;

// Style
const style: HTMLStyleElement = document.createElement('style');
style.innerHTML =
    `
    h1,
    p {
        font-weight: 400;
        margin: 0;
    }
    
    .around-me-page {
        position: relative;
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

    .title {
        text-align: center;
        font-size: 1rem;
    }

    .desc {
        text-align: center;
        color: var(--on-surface-variant);
        margin: 0 0 24px 0;
    }

    .around-you-features {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .message {
        text-align: center;
    }
    `
    ;

// Component
export class AroundMePage extends HTMLElement {
    public shadowRoot: ShadowRoot;

    private _heading: HTMLHeadingElement;
    private _list: HTMLElement;
    private _message: HTMLDivElement;

    private _pois: Poi[] = [];

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'open' });

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.appendChild(style.cloneNode(true));

        this._heading = this.shadowRoot.querySelector('.title') as HTMLHeadingElement;
        this._list = this.shadowRoot.querySelector('.around-you-features') as HTMLElement;
        this._message = this.shadowRoot.querySelector('.message') as HTMLDivElement;
    }

    // Getter and setter
    public set pois(value: Poi[]) {
        this._pois = value;
    }

    // Component callbacks
    public async connectedCallback(): Promise<void> {
        SnackbarService.instance.updateSnackbar(SnackbarType.Info, 'Caricamento...');
        this._updateMsg('loading');

        let position: GeolocationPosition | null = null;        

        try {            
            position = await PositionService.instance.getUserPosition();
            const pois: Poi[] = await GeoGraphicService.instance.getPoisFromLayer(LayerService.instance.activeLayers[0]);
            this.pois = GeoGraphicService.instance.orderPoisByDistance(position, pois);                   
            if (this._pois.length === 0) this._updateMsg('empty');
        } catch (error) {
            this._updateMsg('error');
        } finally {
            this._render();
            this._setup();

            if (this._pois.length !== 0) this._updateMsg();
            SnackbarService.instance.resetSnackbar();
        }
    }

    public disconnectedCallback(): void {
        this.removeEventListener('poi-selected', this._onPoiSelected);
    }

    // Methods
    private async _render(): Promise<void> {        
        this._heading.innerHTML = this._pois[0] ? this._pois[0].layer.name : 'Punti di interesse';
        this._list.innerHTML = '';
        this._pois.forEach((poi: Poi, index: number) => {
            const card: PoiCard = new PoiCard();
            card.poi = poi;
            card.position = index + 1;
            this._list.appendChild(card);
        });
    }

    private _setup(): void {
        this.addEventListener('poi-selected', this._onPoiSelected);
    }

    private _onPoiSelected = (event: Event): void => {
        const e: CustomEvent = event as CustomEvent;
        PoiService.instance.selectedPoi = e.detail.selectedPoi;
        window.location.hash = '/poi';
    }

    private _updateMsg(type?: 'loading' | 'empty' | 'error'): void {
        this._message.innerHTML = '';

        switch (type) {
            case 'loading':
                this._message.innerHTML = '<app-spinner-loader />';
                break;
            case 'error':
                this._message.innerText = 'Impossibile trovare la tua posizione.\n\nPer mostrare i punti di interesse nelle vicinanze è necessario concedere all\'app l\'autorizzazione ad accedere alla posizione del dispositivo.';
                break;
            case 'empty':
                this._message.innerText = 'Sembra non ci siano punti di interesse per la categoria selezionata.\n\nAndare nella sezione "Categorie" e sceglierne un\'altra.';
                break;
            default:
                break;
        }
    }
}

customElements.define('page-around-me', AroundMePage);