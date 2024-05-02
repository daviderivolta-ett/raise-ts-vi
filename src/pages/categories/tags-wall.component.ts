export class TagsWallComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _tags: string[] = [];

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

    public connectedCallback(): void {
        this.render();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <form>
                <div class="tags"></div>
                <button type="submit" class="tags-submit-btn">Continua</button>
            </form>
            `
            ;

        const wall: HTMLDivElement | null = this.shadowRoot.querySelector('.tags');
        if (!wall) return;

        this.tags.forEach((tag: string) => {
            let chip: HTMLDivElement = this.createChip(tag);
            wall.append(chip);
        })
    }

    private createChip(tag: string): HTMLDivElement {
        let chip: HTMLDivElement = document.createElement('div');
        chip.classList.add('chip');

        let checkbox: HTMLInputElement = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = tag.replace(' ', '').toLowerCase();
        checkbox.name = 'tag';
        checkbox.value = tag;

        let label: HTMLLabelElement = document.createElement('label');
        label.setAttribute('for', tag.replace(' ', '').toLowerCase());
        label.innerHTML = tag.charAt(0).toUpperCase() + tag.slice(1);

        chip.append(checkbox);
        chip.append(label);

        return chip;

    }
}

customElements.define('app-tags-wall', TagsWallComponent);