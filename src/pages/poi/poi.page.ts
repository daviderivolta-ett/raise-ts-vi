import { Poi, PoiProperty } from '../../models/poi.model';
import { SnackbarType } from '../../models/snackbar.model';
import { PathService } from '../../services/path.service';
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
            <div class="poi-page">
                <div class="page-header">
                    <h1 class="page-title" tabindex="-1">Dettaglio punto di interesse</h1>
                    <button is="app-menu-btn" aria-label="apri menu">
                        <span class="material-symbols-outlined">menu</span>
                    </button>
                </div>
                <h2 class="poi-name">${this.poi.name}</h2>
                <p class="poi-category">${this.poi.name}</p>
                <div class="poi-page-buttons">
                    <button type="button" id="directions-btn" aria-label="Vedi indicazioni stradali">Indicazioni</button>
                    <button type="button" id="add-to-custom-path-btn" aria-label="Aggiungi tappa a percorso personalizzato">Aggiungi</button>
                </div>
                <div class="poi-page-infos"></div>
            </div>

            <style>
                h1,
                h2,
                p {
                    font-weight: 400;
                    margin: 0;
                }

                .poi-page {
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

                .poi-name {
                    margin: 0 0 8px 0;
                }

                .poi-category {
                    color: var(--on-surface-variant);
                }

                .poi-page-buttons {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 8px;
                    margin: 16px 0 32px 0;
                }

                #directions-btn {
                    background-color: var(--primary);
                    color: var(--on-primary);
                    border: 1px solid transparent;
                    border-radius: var(--border-radius-circle);
                }

                #add-to-custom-path-btn {
                    color: var(--on-surface);
                    background-color: var(--surface-container-high);
                    border: 1px solid var(--outline);
                    border-radius: var(--border-radius-circle);
                }

                button {
                    cursor: pointer;
                    font-family: Inter, sans-serif;
                    font-size: 1rem;
                    font-weight: 500;
                    height: 32px;
                    width: 100%;
                }

                button:hover {
                    opacity: .8;
                }

                .property {
                    margin: 0px 0px 16px;
                }

                .property-label {
                    display: block;
                    color: var(--on-surface-variant);
                    margin: 0px 0px 4px;
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

        this.renderInfo();
    }

    private renderInfo(): void {
        const info: HTMLDivElement | null = this.shadowRoot.querySelector('.poi-page-infos');
        if (!info) return;
       
        this.poi.props.forEach((prop: PoiProperty) => {
            const topic: HTMLDivElement = this.renderTopic(prop);
            info.appendChild(topic);
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
            SnackbarService.instance.updateSnackbar(SnackbarType.Info, `Aggiunto al percorso personalizzato`);
            PathService.instance.addPoiToCustomPath(this.poi);
        });
    }
}

customElements.define('page-poi', PoiPage);