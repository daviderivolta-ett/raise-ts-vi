export class SnackbarComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _msg: string = '';

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public get msg(): string {
        return this._msg;
    }

    public set msg(msg: string) {
        this._msg = msg;
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
        if (this.msg.length === 0) return;
     
        const message: HTMLParagraphElement | null = this.shadowRoot.querySelector('.snackbar-message');
        if (!message) return;
        message.innerHTML = this.msg;
    }
}

customElements.define('app-snackbar', SnackbarComponent);