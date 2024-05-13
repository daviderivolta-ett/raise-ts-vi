import { Path } from '../../models/path.model';
import { Poi } from '../../models/poi.model';
import { SnackbarType } from '../../models/snackbar.model';
import { PathService } from '../../services/path.service';
import { PoiService } from '../../services/poi.service';
import { PositionService } from '../../services/position.service';
import { SnackbarService } from '../../services/snackbar.service';
import { TspService } from '../../services/tsp.service';
import { CustomPathCardComponent } from './custom-path-card.component';
import './custom-path-card.component';

export class CustomPathPage extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _customPath: Path = { ...PathService.instance.customPath };

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public get customPath(): Path {
        return this._customPath;
    }

    public set customPath(customPath: Path) {
        this._customPath = customPath;
        this.update();
        this.setupCardsBeahviour();
    }

    public connectedCallback(): void {
        this.render();
        this.update();
        this.setup();
        this.setupCardsBeahviour();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <div class="custom-path-page">
                <div class="page-header">
                    <h1 class="page-title" tabindex="-1">Percorso personalizzato</h1>
                    <button is="app-menu-btn" aria-label="apri menu">
                        <span class="material-symbols-outlined">menu</span>
                    </button>
                </div>
                <section class="custom-path-list" role="feed"></section>
                <div class="custom-path-tools-wrapper">
                    <nav class="custom-path-tools">
                        <button type="button" id="reorder-pois-btn" class="tool-btn" title="Riordina punti di interesse" aria-label="Riordina punti di interesse">
                            <span class="material-symbols-outlined tool-icon">sort</span>
                        </button>
                        <button type="button" id="save-custom-path-btn" class="tool-btn" title="Salva percorso" aria-label="Salva percorso">
                            <span class="material-symbols-outlined tool-icon">bookmark</span>
                        </button>
                    </nav>
                </div>
            </div>

            <style>
                h1,
                p {
                    font-weight: 400;
                    margin: 0;
                }

                .custom-path-page {
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

                .custom-path-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;                   
                }

                .empty-msg {
                    text-align: center;
                }

                .custom-path-tools-wrapper {
                    width: 100%;
                    max-width: 576px;
                }

                .custom-path-tools {
                    position: fixed;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 100%;
                    min-height: 48px;
                    max-width: inherit;
                    display: flex;
                    justify-content: space-between;
                    gap: 1px;
                }
                
                button {
                    cursor: pointer;
                }

                .tool-btn {
                    cursor: pointer;
                    font-family: Inter, sans-serif;
                    width: 100%;
                    border: none;
                    color: var(--on-surface);
                    background-color: var(--surface-container-high);
                    font-size: .8rem;
                    font-weight: 500;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: .5rem;
                }

                .tool-btn:hover {
                    color: var(--on-surface-variant);
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
        this.setupSaveCustomPathBtn();
        this.setupReorderPoisBtn();
    }

    private update(): void {
        const list: HTMLDivElement | null = this.shadowRoot.querySelector('.custom-path-list');
        if (!list) return;
        list.innerHTML = '';

        if (this.customPath.pois.length === 0) list.append(this.renderEmptyMsg());

        this.customPath.pois.forEach((poi: Poi, index: number) => {
            let card: CustomPathCardComponent = document.createElement('app-custom-path-card') as CustomPathCardComponent;
            card.poi = poi;
            card.position = index + 1;
            list.append(card);
        });
    }

    private setupSaveCustomPathBtn(): void {
        const button: HTMLButtonElement | null = this.shadowRoot.querySelector('#save-custom-path-btn');
        if (!button) return;
        button.addEventListener('click', () => {
            PathService.instance.saveCustomPath()
            SnackbarService.instance.updateSnackbar(SnackbarType.Info, 'Percorso personalizzato salvato');
        });
    }

    private setupReorderPoisBtn(): void {
        const button: HTMLButtonElement | null = this.shadowRoot.querySelector('#reorder-pois-btn');
        if (!button) return;
        button.addEventListener('click', async () => {
            let position: GeolocationPosition = await PositionService.instance.getUserPosition();
            if (!position) return;
            const orderedPois: Poi[] = TspService.instance.nearestInsertion(this.customPath.pois, [position.coords.latitude, position.coords.longitude]);
            this.customPath = { ...this.customPath, pois: orderedPois };
            PathService.instance.customPath = this.customPath;
            SnackbarService.instance.updateSnackbar(SnackbarType.Info, 'Tappe riordinate secondo il percorso ottimale');
        });
    }

    private setupCardsBeahviour(): void {
        const cards: NodeListOf<CustomPathCardComponent> = this.shadowRoot.querySelectorAll('app-custom-path-card');
        cards.forEach((card: CustomPathCardComponent) => {
            card.addEventListener('poi-selected', (e: CustomEventInit) => {
                PoiService.instance.selectedPoi = e.detail.selectedPoi;
                window.location.hash = '/poi';
            });

            card.addEventListener('poi-deleted', (e: CustomEventInit) => {
                let pois: Poi[] = this.customPath.pois.filter((poi: Poi) => poi.uuid !== e.detail.deletedPoi.uuid);
                this.customPath = { ...this.customPath, pois: pois };
                PathService.instance.customPath = this.customPath;
                SnackbarService.instance.updateSnackbar(SnackbarType.Info, `Tappa ${e.detail.deletedPoi.name} rimossa`);
            });
        });
    }

    private renderEmptyMsg(): HTMLParagraphElement {
        const msg: HTMLParagraphElement = document.createElement('p');
        msg.classList.add('empty-msg');
        msg.innerHTML = 'Nessuna tappa attualmente presente nel percorso personalizzato';
        return msg;
    }
}

customElements.define('page-custom-path', CustomPathPage);