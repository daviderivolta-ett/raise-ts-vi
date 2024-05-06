export class MenuComponent extends HTMLDialogElement {
    constructor() {
        super();
    }

    public connectedCallback(): void {
        this.render();
        this.setup();
    }

    private render(): void {
        this.innerHTML =
            `
            <button autofocus aria-label="chiudi menu">Chiudi</button>
            <h2 id="menu-title">Menu</h2>
            <nav class="menu" >
                <ul>
                    <li><a href="/#/categories">Seleziona categoria</a></li>
                    <li><a href="/#/suggested-paths">Percorsi suggeriti</a></li>
                    <li><a href="/#/custom-path">Percorsi custom</a></li>
                </ul>
            </nav>
            `
            ;
    }

    private setup(): void {
        const closeBtn: HTMLButtonElement | null = this.querySelector('button');
        if (!closeBtn) return;
        closeBtn.addEventListener('click', () => this.close());
    }
}

customElements.define('app-menu', MenuComponent, { extends: 'dialog' });