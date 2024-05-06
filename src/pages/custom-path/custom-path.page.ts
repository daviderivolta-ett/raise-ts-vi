import { Path } from '../../models/path.model';
import { Poi } from '../../models/poi.model';
import { PathService } from '../../services/path.service';

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
    }

    public connectedCallback(): void {
        this.render();
        this.setup();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <div class="custom-path-page">
                <nav>
                    <button type="button" aria-label="Riordina punti di interesse">Riordina punti di interesse</button>
                    <button type="button" id="save-custom-path-btn" aria-label="Salva percorso">Salva percorso</button>
                </nav>
                <h1>Percorso personalizzato</h1>
                <div class="custom-path-list"></div>
            </div>
            `
            ;

        const list: HTMLDivElement | null = this.shadowRoot.querySelector('.custom-path-list');
        if (!list) return;
        this.customPath.pois.forEach((poi: Poi) => {
            let p = document.createElement('p');
            p.innerHTML = poi.name;
            list.append(p);
        });
    }

    private setup(): void {
        this.setupSaveCustomPathBtn();
    }

    private setupSaveCustomPathBtn(): void {
        const button: HTMLButtonElement | null = this.shadowRoot.querySelector('#save-custom-path-btn');
        if (!button) return;
        button.addEventListener('click', () => PathService.instance.saveCustomPath());
    }
}

customElements.define('page-custom-path', CustomPathPage);