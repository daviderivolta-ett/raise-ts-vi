import { Data } from '../../models/layer.model';
import { DataService } from '../../services/data.service';
import { TagChipComponent } from './tag-chip.component';

// Template
const template: HTMLTemplateElement = document.createElement('template');
template.innerHTML =
    `
    <div class="categories-page">
        <div class="page-header">
            <h1 tabindex="-1" class="title">Esplora macrocategorie</h1>
        </div>
        <p class="desc">Scegli una macrocategoria per conoscere le sue sottocategorie.</p>
        <div class="list">
            <paginated-list page-elements="13" current-page="0"></paginated-list>
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

    .categories-page {
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
export class CategoriesPage extends HTMLElement {
    public shadowRoot: ShadowRoot;

    private _list: HTMLElement;

    private _tags: string[] = [];

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'open' });

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.appendChild(style.cloneNode(true));

        this._list = this.shadowRoot.querySelector('paginated-list') as HTMLElement;
    }

    // Getter and setter
    public set tags(value: string[]) {
        this._tags = value;
        this._render();
    }

    // Component callbacks
    public async connectedCallback(): Promise<void> {
        const data: Data = await DataService.instance.getData();
        this.tags = DataService.instance.getAllTags(data).sort();

        this._setup();
    }

    public disconnectedCallback(): void {
        this.removeEventListener('tag-selected', this._onTagSelected);
    }

    // Methods
    private _render(): void {
        this._tags.forEach((tag: string) => {
            const chip: TagChipComponent = new TagChipComponent();
            chip.id = tag;
            chip.tag = tag;
            this._list.appendChild(chip);
        });
    }

    private _setup(): void {
        this.addEventListener('tag-selected', this._onTagSelected);
    }

    private _onTagSelected = (event: Event): void => {
        const e: CustomEvent = event as CustomEvent;
        window.location.hash = `/layers?layer=${e.detail.id}`;
    }
}

customElements.define('page-categories', CategoriesPage);