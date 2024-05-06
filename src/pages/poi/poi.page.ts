import { SnackbarComponent } from '../../components/snackbar.component';
import { Poi, PoiProperty } from '../../models/poi.model';
import { SnackbarType } from '../../models/snackbar.model';
import { PoiService } from '../../services/poi.service';
import { SnackbarService } from '../../services/snackbar.service';

export class PoiPage extends HTMLElement {
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
        PoiService.instance.getSelectedPoi();
        this.poi = PoiService.instance.selectedPoi;
        this.render();
        this.setup();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <div class="page-poi">
                <h1>${this.poi.name}</h1>
                <p>${this.poi.name}</p>
                <button type="button" id="directions-btn">Indicazioni</button>
                <button type="button" id="add-to-custom-path-btn">Aggiungi</button>
            </div>
            `
            ;

        this.renderInfo();
    }

    private renderInfo(): void {
        const page: HTMLDivElement | null = this.shadowRoot.querySelector('.page-poi');
        if (!page) return;

        this.poi.props.forEach((prop: PoiProperty) => {
            const topic: HTMLDivElement = this.renderTopic(prop);
            page.appendChild(topic);
        })
    }

    private renderTopic(prop: PoiProperty): HTMLDivElement {
        const topic: HTMLDivElement = document.createElement('div');
        topic.classList.add('property');
        const label: HTMLLabelElement = document.createElement('label');
        label.classList.add('property-label');
        label.innerHTML = prop.displayName;
        const info: HTMLParagraphElement = document.createElement('p');
        info.classList.add('property-value');
        prop.value !== '' ? info.innerHTML = prop.value : info.innerHTML = '-';
        topic.appendChild(label);
        topic.appendChild(info);
        return topic;
    }

    private setup(): void {
        this.setupDirectionsBtn();
        this.setupAddToCustomPathBtn();
    }

    private setupDirectionsBtn(): void {
        const button: HTMLButtonElement | null = this.shadowRoot.querySelector('#directions-btn');
        if (!button) return;
        button.addEventListener('click', () => {
            const url: string = `https://www.google.it/maps/dir/?api=1&destination=${this.poi.coordinates[1]},${this.poi.coordinates[0]}`;
            window.open(url, '_blank');
        });
    }

    private setupAddToCustomPathBtn(): void {
        const button: HTMLButtonElement | null = this.shadowRoot.querySelector('#add-to-custom-path-btn');
        if (!button) return;

        button.addEventListener('click', () => {
            const live: SnackbarComponent | null = document.body.querySelector('app-snackbar');          
            if (!live) return;            
            live.snackbar = SnackbarService.instance.updateSnackbar(SnackbarType.Info, `Aggiunto al percorso personalizzato`, 2);
        });
    }
}

customElements.define('page-poi', PoiPage);