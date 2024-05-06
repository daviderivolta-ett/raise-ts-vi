import { Snackbar } from '../models/snackbar.model';

export class SnackbarComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _snackbar: Snackbar = Snackbar.createEmpty();

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public get snackbar(): Snackbar {
        return this._snackbar;
    }

    public set snackbar(snackbar: Snackbar) {
        this._snackbar = snackbar;
        this.update();
    }

    public connectedCallback(): void {
        this.render();
        this.update();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <div class="snackbar">
                <p class="snackbar-message"></p>
            </div>
            `
            ;
    }

    private update(): void {
        if (this.snackbar.message.length === 0) return;

        const message: HTMLParagraphElement | null = this.shadowRoot.querySelector('.snackbar-message');
        if (!message) return;
        message.innerHTML = this.snackbar.message;
    }
}

customElements.define('app-snackbar', SnackbarComponent);