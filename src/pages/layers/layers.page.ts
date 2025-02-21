import { Data, Layer } from '../../models/layer.model';
import { DataService } from '../../services/data.service';
import { LayerService } from '../../services/layer.service';
import { TagChipComponent } from '../categories/tag-chip.component';

// Template
const template: HTMLTemplateElement = document.createElement('template');
template.innerHTML =
    `
    <div class="layers-page">
        <div class="page-header">
            <h1 tabindex="-1" class="title">Scegli una categoria</h1>
        </div>
        <p class="desc">Scegli una categoria per cercare i punti di interesse associati.</p>
        <div class="list">
            <paginated-list page-elements="12" current-page="0"></paginated-list>
        </div>
    </div>
    `
    ;

// Style
const style: HTMLStyleElement = document.createElement('style');
style.innerHTML =
    `
    h1,
    p {
        font-weight: 400;
        margin: 0;
    }

    .layers-page {
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
        
    .title {
        text-align: center;
        font-size: 1rem;
    }

    .desc {
        text-align: center;
        color: var(--on-surface-variant);
        margin: 0 0 24px 0;
    }
    `
    ;

// Component
export class LayersPage extends HTMLElement {
    public shadowRoot: ShadowRoot;

    private _list: HTMLElement;

    private _layers: Layer[] = [];

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'open' });

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.appendChild(style.cloneNode(true));

        this._list = this.shadowRoot.querySelector('paginated-list') as HTMLElement;
    }

    // Getter and setter
    public set layers(value: Layer[]) {
        this._layers = value;
    }

    // Component callbacks
    public async connectedCallback(): Promise<void> {
        const hash: string = window.location.hash.slice(2);
        const params = new URLSearchParams(hash.slice(hash.indexOf('?')));
        const tag: string | null = params.get('layer');

        if (!tag) {
            window.location.hash = '/categories';
            return;
        }

        await DataService.instance.getData();
        this.layers = DataService.instance.filterLayersByTag(tag);

        this._render();
        this._setup();
    }

    public disconnectedCallback(): void {
        this.removeEventListener('tag-selected', this._onTagSelected);
    }

    static observedAttributes: string[] = [];
    public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {

    }

    // Methods
    private _render(): void {
        this._layers.forEach((layer: Layer) => {
            const chip: TagChipComponent = new TagChipComponent();
            chip.id = layer.id;
            chip.tag = layer.name;
            this._list.appendChild(chip);
        });
    }

    private _setup(): void {
        this.addEventListener('tag-selected', this._onTagSelected);
    }

    private _onTagSelected = (event: Event): void => {
        const e: CustomEvent = event as CustomEvent;
        const layer: Layer | undefined = DataService.instance.getLayerById(e.detail.id);
        if (layer) LayerService.instance.activeLayers = [layer];
        window.location.hash = '/around-me';
    }
}

customElements.define('page-layers', LayersPage);