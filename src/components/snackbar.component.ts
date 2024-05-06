import { Snackbar, SnackbarType } from '../models/snackbar.model';

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

            <style>
                .info-snackbar {
                    background-color: blue;
                }

                .error-snackbar {
                    background-color: crimson;
                }
            </style>
            `
            ;
    }

    private update(): void {
        if (this.snackbar.message.length === 0) return;

        const message: HTMLParagraphElement | null = this.shadowRoot.querySelector('.snackbar-message');
        if (!message) return;
        message.innerHTML = this.snackbar.message;

        switch (this.snackbar.type) {
            case SnackbarType.Error:
                this.renderErrorSnackbar();
                break;
            default:
                this.renderInfoSnackbar();
                break;
        }

        setTimeout(() => this.resetSnackbar(), this.snackbar.duration * 1000);
    }

    private renderInfoSnackbar(): void {
        const wrapper: HTMLDivElement | null = this.shadowRoot.querySelector('.snackbar');
        if (!wrapper) return;

        wrapper.classList.add('info-snackbar');
    }

    private renderErrorSnackbar(): void {
        const wrapper: HTMLDivElement | null = this.shadowRoot.querySelector('.snackbar');
        if (!wrapper) return;

        wrapper.classList.add('error-snackbar');
    }

    private resetSnackbar(): void {
        const message: HTMLParagraphElement | null = this.shadowRoot.querySelector('.snackbar-message');
        const wrapper: HTMLDivElement | null = this.shadowRoot.querySelector('.snackbar');

        if (!message) return;
        if (!wrapper) return;

        message.innerHTML = '';
        wrapper.classList.remove('info-snackbar');
        wrapper.classList.remove('error-snackbar');
    }
}

customElements.define('app-snackbar', SnackbarComponent);