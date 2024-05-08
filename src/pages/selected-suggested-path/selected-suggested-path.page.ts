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
                <h1 tabindex="-1">${this.path.name}</h1>
                <button is="app-menu-btn" aria-label="apri menu">Menu</button>
                <div class="suggested-path-list"></div>
            </div>
            `
            ;

        const title: HTMLHeadingElement | null = this.shadowRoot.querySelector('h1');
        if (title) title.focus();
    }

    private update(): void {
        const list: HTMLDivElement | null = this.shadowRoot.querySelector('.suggested-path-list');
        if (!list) return;

        list.innerHTML = '';
        this.path.pois.forEach((poi: Poi) => {
            let li: HTMLLIElement = document.createElement('li');
            let card: SelectedSuggestedPathCardComponent = document.createElement('app-selected-suggested-path-card') as SelectedSuggestedPathCardComponent;
            card.poi = poi;
            li.append(card);
            list.append(li);
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