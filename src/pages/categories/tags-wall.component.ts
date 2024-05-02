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
                <p class="current-page">Pagina ${this.currentPage + 1} di ${this.getPagesNumber() + 1}</p>
                <div class="">
                    <p>Categorie in questa pagina: <span class="tags-list"></span></p>
                </div>

                <button type="button" class="prev-btn">Precedente</button>
                <button type="button" class="next-btn">Successiva</button>

                <div class="tags"></div>
            </div>

            <style>
                .hidden {
                    display: none;
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

        this.currentPage === 0 ? prevPageBtn.classList.add('hidden') : prevPageBtn.classList.remove('hidden');
        this.currentPage === this.getPagesNumber() ? nextPageBtn.classList.add('hidden') : nextPageBtn.classList.remove('hidden');

        const buttons: TagChipComponent[] = Array.from(this.shadowRoot.querySelectorAll('button[is="app-tag-chip"]'));
        buttons.forEach((button: TagChipComponent) => button.addEventListener('tag-selected', this.handleCheckbox));
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