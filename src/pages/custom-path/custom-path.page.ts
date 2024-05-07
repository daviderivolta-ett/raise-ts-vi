import { Path } from '../../models/path.model';
import { Poi } from '../../models/poi.model';
import { SnackbarType } from '../../models/snackbar.model';
import { PathService } from '../../services/path.service';
import { PositionService } from '../../services/position.service';
import { SnackbarService } from '../../services/snackbar.service';
import { TspService } from '../../services/tsp.service';

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
    }

    public connectedCallback(): void {
        this.render();
        this.update();
        this.setup();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <div class="custom-path-page">
                <h1 tabindex="-1">Percorso personalizzato</h1>
                <button is="app-menu-btn" aria-label="apri menu">Menu</button>
                <div class="custom-path-list"></div>
                <nav>
                    <button type="button" id="reorder-pois-btn" aria-label="Riordina punti di interesse">Riordina punti di interesse</button>
                    <button type="button" id="save-custom-path-btn" aria-label="Salva percorso">Salva percorso</button>
                </nav>
            </div>
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
        this.customPath.pois.forEach((poi: Poi) => {
            let p = document.createElement('p');
            p.innerHTML = poi.name;
            list.append(p);
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
        });
    }
}

customElements.define('page-custom-path', CustomPathPage);