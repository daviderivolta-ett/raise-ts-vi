import { DataService } from '../../services/data.service';
import { LayerService } from '../../services/layer.service';
import { TagsWallComponent } from './tags-wall.component';
import './tags-wall.component';

export class CategoriesPage extends HTMLElement {
    public shadowRoot: ShadowRoot;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public async connectedCallback(): Promise<void> {
        await DataService.instance.getData();
        this.render();
        this.setup();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <div class="categories-page">
                <h1 tabindex="-1" class="categories-page-title">Esplora categorie</h1>
                <app-tags-wall />
            </div>

            <style>
                .categories-page-title {
                    text-align: center;
                }
            </style>
            `
            ;

        const title: HTMLHeadingElement | null = this.shadowRoot.querySelector('h1');
        if (title) title.focus();
    }

    private setup(): void {
        const tagsWall: TagsWallComponent = this.shadowRoot.querySelector('app-tags-wall') as TagsWallComponent;
        if (!tagsWall) return;

        let tags: string[] = DataService.instance.getAllTags(DataService.instance.data);
        tagsWall.tags = tags;

        tagsWall.addEventListener('tag-selected', (e: CustomEventInit) => {
            LayerService.instance.activeLayers = DataService.instance.filterLayersByTag(e.detail.tag);
            window.location.hash = '/around-you';
        });
    }
}

customElements.define('page-categories', CategoriesPage);