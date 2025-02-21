// Template
const template: HTMLTemplateElement = document.createElement('template');
template.innerHTML =
    `
    <div class="paginated-list">
        <div class="list">
            <slot></slot>
        </div>
        <div class="pagination">
            <button type="button" class="pagination-btn prev-btn" aria-label="Pagina precedente">
                <span class="material-symbols-outlined" aria-hidden="true">chevron_left</span>
            </button>
            <button type="button" class="pagination-btn next-btn" aria-label="Pagina successiva">
                <span class="material-symbols-outlined" aria-hidden="true">chevron_right</span>
            </button>
        </div>
    </div>
    `
    ;

// Style
const style: HTMLStyleElement = document.createElement('style');
style.innerHTML =
    `
    button {
        cursor: pointer;
        font-family: 'Inter', Arial, Helvetica, sans-serif;
        font-size: 1rem;

        &[disabled] {
            cursor: not-allowed;
            opacity: 0.5;
        }
    }

    .list {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .pagination {
        display: none;
        margin: 8px 0 0 0;
    }

    .pagination--visible {
        display: flex;
        justify-content: space-between;
        align-items: center;
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

        &:hover {
            opacity: .8;
        }
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
    `
    ;

// Component
export class PaginatedListComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;

    private _slot: HTMLSlotElement;
    private _slottedElements: Element[] = [];
    private _pagination: HTMLDivElement;
    private _prevBtn: HTMLButtonElement;
    private _nextBtn: HTMLButtonElement;

    private _hasPagination: boolean = false;
    private _pageElements: number = 10;
    private _currentPage: number = 0;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'open' });

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.appendChild(style.cloneNode(true));

        this._slot = this.shadowRoot.querySelector('slot') as HTMLSlotElement;
        this._pagination = this.shadowRoot.querySelector('.pagination') as HTMLDivElement;
        this._prevBtn = this.shadowRoot.querySelector('.prev-btn') as HTMLButtonElement;
        this._nextBtn = this.shadowRoot.querySelector('.next-btn') as HTMLButtonElement;
    }

    // Getter and setter
    public get hasPagination(): boolean { return this._hasPagination }
    public set hasPagination(value: boolean) {
        this._hasPagination = value;
    }

    public set pageElements(value: number) {
        this._pageElements = value;
        this._checkPagination();
    }

    public set currentPage(value: number) {
        this._currentPage = value;
        this._changePage(value);
    }

    // Component callbacks
    public connectedCallback(): void {
        this._setup();
    }

    public disconnectedCallback(): void {
    }

    static observedAttributes: string[] = ['page-elements', 'current-page'];
    public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        if (name === 'page-elements' && newValue !== oldValue) this.pageElements = parseInt(newValue);
        if (name === 'current-page' && newValue !== oldValue) {
            if (parseInt(newValue) >= 0 && parseInt(newValue) <= this._getPagesNumber()) this.currentPage = parseInt(newValue);
            else if (parseInt(newValue) < 0) this.setAttribute('current-page', '0');
            else this.setAttribute('current-page', `${this._getPagesNumber()}`);
        }
    }

    // Methods
    private _setup(): void {
        this._slot.onslotchange = () => this._onSlotChange();
        this._prevBtn.onclick = () => this._onPrevClick();
        this._nextBtn.onclick = () => this._onNextClick();
    }

    private _onSlotChange(): void {
        this._checkPagination();
        this._checkBtnStatus();
        this._paginateElements(this._currentPage);
    }

    private _onPrevClick(): void {
        this.setAttribute('current-page', JSON.stringify(this._currentPage - 1));
    }

    private _onNextClick(): void {
        this.setAttribute('current-page', JSON.stringify(this._currentPage + 1));
    }

    private _checkPagination(): void {
        this._slottedElements = this._slot.assignedElements();
        this._slottedElements.length >= this._pageElements ? this._pagination.classList.add('pagination--visible') : this._pagination.classList.remove('pagination--visible');
    }

    private _changePage(page: number): void {
        this._checkBtnStatus();
        this._paginateElements(page);
    }

    private _getPagesNumber(): number {
        return Math.floor(this._slottedElements.length / this._pageElements);
    }

    private _checkBtnStatus(): void {
        this._prevBtn.disabled = this._currentPage === 0 ? true : false;
        this._nextBtn.disabled = this._currentPage === this._getPagesNumber() ? true : false;
    }

    private _paginateElements(currentPage: number): void {
        const startIndex: number = currentPage * this._pageElements;
        const endIndex: number = Math.min(startIndex + this._pageElements, this._slottedElements.length);

        this._slottedElements.forEach((element: Element) => {
            const el: HTMLElement = element as HTMLElement;
            el.style.display = 'none';
        });

        for (let index = startIndex; index < endIndex; index++) {
            const element = this._slottedElements[index] as HTMLElement;
            element.style.display = '';
        }
    }
}

customElements.define('paginated-list', PaginatedListComponent);