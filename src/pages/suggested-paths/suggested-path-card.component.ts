import { Path } from '../../models/path.model';

export class SuggestedPathCardComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _path: Path = Path.createEmpty();
    
    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public get path(): Path {
        return this._path;
    }

    public set path(path: Path) {
        this._path = path;
    }

    public connectedCallback(): void {
        this.render();
        this.setup();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <div class="suggested-path-card">
                <h4 class="suggested-path-card-title">${this.path.name}</h4>
                <p class="suggested-path-card-length">${this.path.pois.length} tappe</p>
                <button type="button" id="path-info-btn">Apri percorso</button>
            </div>
            `
            ;
    }

    private setup(): void {
        this.setupPoiInfoBtn();
    }

    private setupPoiInfoBtn(): void {
        const button: HTMLButtonElement | null = this.shadowRoot.querySelector('#path-info-btn');
        if (!button) return;
        button.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('suggested-path-selected', { detail: { selectedSuggestedPath: this.path } }));
        });
    }
}

customElements.define('app-suggested-path-card', SuggestedPathCardComponent);