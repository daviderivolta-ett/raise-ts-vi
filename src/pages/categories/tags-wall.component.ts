import './tag-chip.component';
import { TagChipComponent } from './tag-chip.component';

export class TagsWallComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _tags: string[] = [];
    private _currentPageTags: string[] = [];
    private _currentPage: number = 0;
    private _tagsPerPage: number = 8;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public get tags(): string[] {
        return this._tags;
    }

    public set tags(tags: string[]) {
        this._tags = tags;
        this.connectedCallback();
    }

    public get currentPageTags(): string[] {
        return this._currentPageTags;
    }

    public set currentPageTags(currentPageTags: string[]) {
        this._currentPageTags = currentPageTags;
    }

    public get currentPage(): number {
        return this._currentPage;
    }

    public set currentPage(currentPage: number) {
        this._currentPage = currentPage;
    }

    public get tagsPerPage(): number {
        return this._tagsPerPage;
    }

    public set tagsPerPage(tagsPerPage: number) {
        this._tagsPerPage = tagsPerPage;
    }

    public connectedCallback(): void {
        this.render();
        if (this.tags.length === 0) return;
        this.paginateTags();
        this.setup();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <div class="pagination">
                <div class="current-page-status">
                    <p class="current-page">Pagina ${this.currentPage + 1} di ${this.getPagesNumber() + 1}</p>
                    <p>Categorie in questa pagina: <span class="tags-list"></span></p>
                </div>

                <div class="pagination-buttons">
                    <button type="button" class="pagination-btn prev-btn" aria-label="Pagine precedente"><span class="material-symbols-outlined">chevron_left</span> Precedente</button>
                    <button type="button" class="pagination-btn next-btn" aria-label="Pagina successiva">Successiva <span class="material-symbols-outlined">chevron_right</span></button>
                </div>

                <div class="tags"></div>
            </div>

            <style>
                button {
                    cursor: pointer;
                }

                button[disabled] {
                    cursor: not-allowed;
                }

                .pagination-buttons {
                    display: flex;
                    justify-content: space-between;
                }

                .pagination-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .hidden {
                    display: none;
                }

                .tags {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                button[is="app-tag-chip"] {
                    width: 100%;
                    display: block;
                    color: var(--on-surface);
                    background-color: var(--surface-container);
                    border: 1px solid var(--outline);
                    padding: 8px 8px;
                    border-radius: var( --border-radius-circle);
                }

                button[is="app-tag-chip"]:hover {
                    background-color:  var(--surface-container-highest); 
                    border-color: var(--primary);  
                }

                .material-symbols-outlined {
                    font-family: 'Material Symbols Outlined';
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

    private setup(): void {
        const prevPageBtn: HTMLButtonElement | null = this.shadowRoot.querySelector('.prev-btn');
        const nextPageBtn: HTMLButtonElement | null = this.shadowRoot.querySelector('.next-btn');

        if (!prevPageBtn) return;
        if (!nextPageBtn) return;

        prevPageBtn.addEventListener('click', () => this.prevPage());
        nextPageBtn.addEventListener('click', () => this.nextPage());
    }

    private update(): void {
        const currentPage: HTMLButtonElement | null = this.shadowRoot.querySelector('.current-page');
        if (!currentPage) return;
        currentPage.innerHTML = `Pagina ${this.currentPage + 1} di ${this.getPagesNumber() + 1}`;

        const tagsList: HTMLButtonElement | null = this.shadowRoot.querySelector('.tags-list');
        if (!tagsList) return;
        tagsList.innerHTML = this.currentPageTags.join(', ');

        const prevPageBtn: HTMLButtonElement | null = this.shadowRoot.querySelector('.prev-btn');
        const nextPageBtn: HTMLButtonElement | null = this.shadowRoot.querySelector('.next-btn');
        if (!prevPageBtn) return;
        if (!nextPageBtn) return;

        // this.currentPage === 0 ? prevPageBtn.classList.add('hidden') : prevPageBtn.classList.remove('hidden');
        this.currentPage === 0 ? prevPageBtn.setAttribute('disabled', '') : prevPageBtn.removeAttribute('disabled');
        // this.currentPage === this.getPagesNumber() ? nextPageBtn.classList.add('hidden') : nextPageBtn.classList.remove('hidden');
        this.currentPage === this.getPagesNumber() ? nextPageBtn.setAttribute('disabled', '') : nextPageBtn.removeAttribute('disabled');

        const buttons: TagChipComponent[] = Array.from(this.shadowRoot.querySelectorAll('button[is="app-tag-chip"]'));
        buttons.forEach((button: TagChipComponent) => button.addEventListener('tag-selected', this.handleCheckbox));

        currentPage.focus();
    }

    private paginateTags(): void {
        const startIndex: number = this.currentPage * this.tagsPerPage;
        let endIndex: number = startIndex + this.tagsPerPage;
        if (endIndex > this.tags.length) endIndex = this.tags.length;

        const wall: HTMLDivElement | null = this.shadowRoot.querySelector('.tags');
        if (!wall) return;

        wall.innerHTML = '';
        this.currentPageTags = [];

        for (let i = startIndex; i < endIndex; i++) {
            let tag: string = this.tags[i];
            this.currentPageTags.push(tag);
            let chip: TagChipComponent = this.createChip(tag);
            wall.append(chip);
        }

        this.update();
    }

    private createChip(tag: string): TagChipComponent {
        let chip: TagChipComponent = new TagChipComponent();
        chip.setAttribute('is', 'app-tag-chip');
        chip.classList.add('chip');
        chip.innerHTML = tag.charAt(0).toUpperCase() + tag.slice(1);
        chip.tag = tag;
        return chip;
    }

    private getPagesNumber(): number {
        return Math.floor(this.tags.length / this.tagsPerPage);
    }

    private prevPage(): void {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.paginateTags();
        }
    }

    private nextPage(): void {
        if (this.currentPage < this.getPagesNumber()) {
            this.currentPage++;
            this.paginateTags();
        }
    }

    private handleCheckbox = (event: Event): void => {
        const button: TagChipComponent = event.target as TagChipComponent;
        this.dispatchEvent(new CustomEvent('tag-selected', { detail: { tag: button.tag } }));
    }
}

customElements.define('app-tags-wall', TagsWallComponent);