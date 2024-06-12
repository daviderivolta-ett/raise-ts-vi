export class TagChipComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _tag: string = '';

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public get tag(): string {
        return this._tag;
    }

    public set tag(tag: string) {
        this._tag = tag;
    }

    public connectedCallback(): void {
        this.render();
        this.setup();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <button type="button" class="tag-chip">${this.tag.charAt(0).toUpperCase() + this.tag.slice(1)}</button>

            <style>
                .tag-chip {
                    cursor: pointer;
                    width: 100%;
                    display: block;
                    color: var(--on-surface);
                    background-color: var(--surface-container);
                    border: 1px solid var(--outline);
                    padding: 8px 8px;
                    border-radius: var( --border-radius-s);
                    font-size: 1rem;
                }

                .tag-chip:hover {
                    background-color:  var(--surface-container-highest); 
                    border-color: var(--primary);  
                }
            </style>
            `
    }

    private setup(): void {
        this.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('tag-selected', { detail: { tag: this.tag } }));
        });
    }
}

customElements.define('app-tag-chip', TagChipComponent);