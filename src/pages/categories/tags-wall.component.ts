export class TagsWallComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _tags: string[] = [];
    private _selectedTags: string[] = [];
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

    public get selectedTags(): string[] {
        return this._selectedTags;
    }

    public set selectedTags(selectedTags: string[]) {
        this._selectedTags = selectedTags;
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
        this.setup();
        
        if (this.tags.length === 0) return;
        this.paginateTags();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <form>
                <div class="pagination">
                    <p class="current-page hidden">Pagina ${this.currentPage + 1} di ${this.getPagesNumber() + 1}</p>
                    <div class="hidden">
                        <p>Categorie in questa pagina: <span class="tags-list"></span></p>
                    </div>

                    <button type="button" class="prev-btn">Precedente</button>
                    <button type="button" class="next-btn">Successiva</button>

                    <div class="tags"></div>
                </div>
                <button type="submit" class="tags-submit-btn">Continua</button>
            </form>
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

    private update(tags: string[]): void {
        const currentPage: HTMLButtonElement | null = this.shadowRoot.querySelector('.current-page');
        if (!currentPage) return;
        currentPage.innerHTML = `Pagina ${this.currentPage + 1} di ${this.getPagesNumber() + 1}`;

        const tagsList: HTMLButtonElement | null = this.shadowRoot.querySelector('.tags-list');
        if (!tagsList) return;
        tagsList.innerHTML = tags.join(', ');
    }

    private createChip(tag: string): HTMLDivElement {
        let chip: HTMLDivElement = document.createElement('div');
        chip.classList.add('chip');

        let checkbox: HTMLInputElement = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = tag.replace(' ', '').toLowerCase();
        checkbox.name = 'tag';
        checkbox.value = tag;

        this.selectedTags.forEach((t: string) => {
            if (t === tag) checkbox.checked = true;
        });

        checkbox.addEventListener('change', this.handleCheckbox);

        let label: HTMLLabelElement = document.createElement('label');
        label.setAttribute('for', tag.replace(' ', '').toLowerCase());
        label.innerHTML = tag.charAt(0).toUpperCase() + tag.slice(1);

        chip.append(checkbox);
        chip.append(label);

        return chip;
    }

    private paginateTags(): void {
        const startIndex: number = this.currentPage * this.tagsPerPage;
        let endIndex: number = startIndex + this.tagsPerPage;
        if (endIndex > this.tags.length) endIndex = this.tags.length;

        let tags: string[] = [];

        const wall: HTMLDivElement | null = this.shadowRoot.querySelector('.tags');
        if (!wall) return;

        wall.innerHTML = '';

        for (let i = startIndex; i < endIndex; i++) {
            let tag: string = this.tags[i];
            tags.push(tag);
            let chip: HTMLDivElement = this.createChip(tag);
            wall.append(chip);
        }

        this.update(tags);
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
        const checkbox: HTMLInputElement = event.target as HTMLInputElement;
        const tag: string = checkbox.value;
        checkbox.checked ? this.selectedTags.push(tag) : this.selectedTags = this.selectedTags.filter((t: string) => t !== tag);
    }
}

customElements.define('app-tags-wall', TagsWallComponent);