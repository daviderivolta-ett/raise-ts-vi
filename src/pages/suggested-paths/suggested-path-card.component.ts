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
    }

    private render(): void {
        this.shadowRoot.innerHTML = `<p>${this.path.name}</p>`
    }
}

customElements.define('app-suggested-path-card', SuggestedPathCardComponent);