export class TagChipComponent extends HTMLButtonElement {
    private _tag: string = '';

    constructor() {
        super();
    }

    public get tag(): string {
        return this._tag;
    }

    public set tag(tag: string) {
        this._tag = tag;
    }

    public connectedCallback(): void {
        this.setup();

    }

    private setup(): void {
        this.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('tag-selected', { detail: { tag: this.tag } }));
        });
    }
}

customElements.define('app-tag-chip', TagChipComponent, { extends: 'button' });