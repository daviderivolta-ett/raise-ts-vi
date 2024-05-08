import { Path } from '../../models/path.model';
import { LayerService } from '../../services/layer.service';
import { PathService } from '../../services/path.service';
import { SuggestedPathCardComponent } from './suggested-path-card.component';
import './suggested-path-card.component';

export class SuggestedPathsPage extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _paths: Path[] = [];

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public get paths(): Path[] {
        return this._paths;
    }

    public set paths(paths: Path[]) {
        this._paths = paths;             
        this.update();
        this.setupCardsBeahviour();
    }

    public async connectedCallback(): Promise<void> {
        await PathService.instance.getCsvPaths(1);
        this.render();        
        this.paths = PathService.instance.getSuggestedPaths(LayerService.instance.activeLayers);  
        this.setupCardsBeahviour();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <div class="suggested-paths-page">
                <h1 tabindex="-1" autofocus>Percorsi suggeriti</h1>
                <button is="app-menu-btn" aria-label="apri menu">Menu</button>
                <ul class="suggested-paths-list" aria-label="Percorsi suggeriti"></ul>
            </div>
            `
            ;
    }

    private update(): void {
        const list: HTMLUListElement | null = this.shadowRoot.querySelector('.suggested-paths-list');        
        if (!list) return;
       
        this.paths.forEach((path: Path) => {
            let li: HTMLLIElement = document.createElement('li');
            let card: SuggestedPathCardComponent = document.createElement('app-suggested-path-card') as SuggestedPathCardComponent;
            card.path = path;
            li.append(card);
            list.append(li);
        });
    }

    private setupCardsBeahviour(): void {
        const cards: NodeListOf<SuggestedPathCardComponent> = this.shadowRoot.querySelectorAll('app-suggested-path-card');
        cards.forEach((card: SuggestedPathCardComponent) => {
            card.addEventListener('suggested-path-selected', (e: CustomEventInit) => {
                PathService.instance.selectedSuggestedPath = e.detail.selectedSuggestedPath;
                window.location.hash = '/selected-suggested-path';                             
            });
        });
    }
}

customElements.define('page-suggested-paths', SuggestedPathsPage);