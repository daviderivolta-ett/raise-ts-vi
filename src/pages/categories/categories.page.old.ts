import { DataService } from '../../services/data.service';
import { LayerService } from '../../services/layer.service';
import { TagsWallComponent } from './tags-wall.component';
import './tags-wall.component';

export class CategoriesOldPage extends HTMLElement {
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
                <div class="page-header">
                    <h1 tabindex="-1" class="categories-page-title">Esplora categorie</h1>
                </div>
                <app-tags-wall></app-tags-wall>
            </div>

            <style>
                :host {
                    display: block;
                    padding:  0 0 5rem 0;
                }
                
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

                .categories-page-title {
                    text-align: center;
                    font-size: 1rem;
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

customElements.define('page-categories-old', CategoriesOldPage);