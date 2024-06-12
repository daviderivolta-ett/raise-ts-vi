import { Path } from '../../models/path.model';
import { Poi } from '../../models/poi.model';
import { PathService } from '../../services/path.service';
import { PoiService } from '../../services/poi.service';
import { SelectedSuggestedPathCardComponent } from './selected-suggested-path-card.component';
import './selected-suggested-path-card.component';

export class SuggestedPathPage extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _path: Path = new Path('', []);

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public get path(): Path {
        return this._path;
    }

    public set path(path: Path) {
        this._path = path;
        this.update();
        this.setupCardsBeahviour();
    }

    public connectedCallback(): void {
        PathService.instance.getSelectedSuggestedPath();
        this.path = PathService.instance.selectedSuggestedPath;        
        this.render();
        this.update();
        this.setupCardsBeahviour();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <div class="suggested-path-page">
                <div class="page-header">
                    <h1 class="page-title" tabindex="-1">${this.path.name}</h1>
                </div>
                <section class="suggested-path-list" role="feed"></section>
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

                .suggested-path-page {
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

                .suggested-path-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;                   
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

    private update(): void {
        const list: HTMLDivElement | null = this.shadowRoot.querySelector('.suggested-path-list');
        if (!list) return;

        list.innerHTML = '';
        this.path.pois.forEach((poi: Poi, index: number) => {
            let card: SelectedSuggestedPathCardComponent = document.createElement('app-selected-suggested-path-card') as SelectedSuggestedPathCardComponent;
            card.poi = poi;
            card.position = index + 1;
            list.append(card);
        });
    }

    private setupCardsBeahviour(): void {
        const cards: NodeListOf<SelectedSuggestedPathCardComponent> = this.shadowRoot.querySelectorAll('app-selected-suggested-path-card');
        cards.forEach((card: SelectedSuggestedPathCardComponent) => {
            card.addEventListener('poi-selected', (e: CustomEventInit) => {                
                PoiService.instance.selectedPoi = e.detail.selectedPoi;
                window.location.hash = '/poi';
            });
        });
    }
}

customElements.define('page-selected-suggested-path', SuggestedPathPage);