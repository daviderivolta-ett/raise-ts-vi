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
        this.setupCardsBehaviour();
    }

    public async connectedCallback(): Promise<void> {
        await PathService.instance.getCsvPaths(1);
        this.render();        
        this.paths = PathService.instance.getSuggestedPaths(LayerService.instance.activeLayers);  
        // this.setupCardsBehaviour();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <div class="suggested-paths-page">
                <div class="page-header">
                    <h1 class="page-title" tabindex="-1" autofocus>Percorsi suggeriti</h1>
                </div>
                <p class="page-desc">Elenco di percorsi suggeriti in base ai layer selezionati.</p>
                <section class="suggested-paths-list" role="feed" aria-label="Percorsi suggeriti"></section>
            </div>

            <style>
                h1,
                p {
                    font-weight: 400;
                    margin: 0;
                }

                .suggested-paths-page {
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

                .page-desc {
                    text-align: center;
                    color: var(--on-surface-variant);
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

                .suggested-paths-list {
                    margin: 1.5rem 0;
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
    }

    private update(): void {
        const list: HTMLUListElement | null = this.shadowRoot.querySelector('.suggested-paths-list');        
        if (!list) return;
       
        list.innerHTML = '';
        if (this.paths.length === 0) list.append(this.renderEmptyMsg());

        this.paths.forEach((path: Path, index: number) => {
            let card: SuggestedPathCardComponent = document.createElement('app-suggested-path-card') as SuggestedPathCardComponent;
            card.path = path;
            card.position = index;
            list.append(card);
        });
    }

    private setupCardsBehaviour(): void {
        const cards: NodeListOf<SuggestedPathCardComponent> = this.shadowRoot.querySelectorAll('app-suggested-path-card');
        cards.forEach((card: SuggestedPathCardComponent) => {
            card.addEventListener('suggested-path-selected', (e: CustomEventInit) => {
                PathService.instance.selectedSuggestedPath = e.detail.selectedSuggestedPath;
                window.location.hash = '/selected-suggested-path';                             
            });
        });
    }

    private renderEmptyMsg(): HTMLParagraphElement {
        const msg: HTMLParagraphElement = document.createElement('p');
        msg.innerHTML = 'Nessun percorso suggerito per il layer attivato al momento';
        return msg;
    }
}

customElements.define('page-suggested-paths', SuggestedPathsPage);