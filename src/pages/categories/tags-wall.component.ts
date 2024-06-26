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
                <p class="desc">Scegli una categoria per caricare i punti di interesse associati.</p>
                <p tabindex="-1" class="current-page">Pagina ${this.currentPage + 1} di ${this.getPagesNumber() + 1}</p>

                <div class="tags"></div>

                <div class="pagination-buttons">
                    <button type="button" class="pagination-btn prev-btn" aria-label="Pagina precedente">
                        <span class="material-symbols-outlined" aria-hidden="true">chevron_left</span>
                    </button>
                    <button type="button" class="pagination-btn next-btn" aria-label="Pagina successiva">
                        <span class="material-symbols-outlined" aria-hidden="true">chevron_right</span>
                    </button>
                </div>
            </div>

            <style>
                p {
                    color: var(--on-surface-variant);
                }

                button {
                    font-family: 'Inter', Arial, Helvetica, sans-serif;
                    font-size: 1rem;
                    cursor: pointer;
                }

                button[disabled] {
                    cursor: not-allowed;
                    opacity: 0.5;
                }

                .desc {
                    text-align: center;
                }

                .current-page {
                    text-align: center;
                }

                .pagination-buttons {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin: 8px 0 0 0;
                }

                .pagination-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 4px;
                    min-height: 40px;
                    min-width: 40px;
                    color: var(--on-primary-container);
                    background-color: var(--primary-container);
                    border: 1px solid transparent;
                    border-radius: var( --border-radius-s);
                    box-sizing: border-box;
                }

                .tags {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .material-symbols-outlined {
                    font-family: 'Material Symbols Outlined';
                    font-size: 1.2rem;
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
        const currentPage: HTMLParagraphElement | null = this.shadowRoot.querySelector('.current-page');       
        if (!currentPage) return;        
        currentPage.innerHTML = `Pagina ${this.currentPage + 1} di ${this.getPagesNumber() + 1}`;

        const prevPageBtn: HTMLButtonElement | null = this.shadowRoot.querySelector('.prev-btn');
        const nextPageBtn: HTMLButtonElement | null = this.shadowRoot.querySelector('.next-btn');
        if (!prevPageBtn) return;
        if (!nextPageBtn) return;
       
        if (this.currentPage === 0) {
            prevPageBtn.setAttribute('disabled', '');
            prevPageBtn.style.visibility = 'hidden';
        } else {
            prevPageBtn.removeAttribute('disabled');
            prevPageBtn.style.visibility = 'visible';
        }

        if (this.currentPage === this.getPagesNumber()) {
            nextPageBtn.setAttribute('disabled', '');
            nextPageBtn.style.visibility = 'hidden';
        } else {
            nextPageBtn.removeAttribute('disabled');
            nextPageBtn.style.visibility = 'visible';
        }

        const buttons: TagChipComponent[] = Array.from(this.shadowRoot.querySelectorAll('app-tag-chip'));
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
            // SnackbarService.instance.updateSnackbar(SnackbarType.Info, `Paginazione cambiata: pagina ${this.currentPage + 1} di ${this.getPagesNumber() + 1}. Categorie in questa pagina: ${this.currentPageTags.join(', ')}`);

            const currentPage: HTMLButtonElement | null = this.shadowRoot.querySelector('.current-page');
            if (currentPage) currentPage.focus();
        }
    }
    
    private nextPage(): void {
        if (this.currentPage < this.getPagesNumber()) {
            this.currentPage++;
            this.paginateTags();
            // SnackbarService.instance.updateSnackbar(SnackbarType.Info, `Paginazione cambiata: pagina ${this.currentPage + 1} di ${this.getPagesNumber() + 1}. Categorie in questa pagina: ${this.currentPageTags.join(', ')}`);

            const currentPage: HTMLButtonElement | null = this.shadowRoot.querySelector('.current-page');
            if (currentPage) currentPage.focus();
        }
    }

    private handleCheckbox = (event: Event): void => {       
        const button: TagChipComponent = event.target as TagChipComponent;
        this.dispatchEvent(new CustomEvent('tag-selected', { detail: { tag: button.tag } }));
    }
}

customElements.define('app-tags-wall', TagsWallComponent);