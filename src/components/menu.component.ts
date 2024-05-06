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
                    <li><a href="/categories">Seleziona categoria</a></li>
                    <li><a href="/around-you">Intorno a me</a></li>
                    <li><a href="/suggested-paths">Percorsi suggeriti</a></li>
                    <li><a href="/custom-path">Percorsi custom</a></li>
                    <li><a href="/settings">Impostazioni</a></li>
                </ul>
            </nav>
            `
            ;
    }

    private setup(): void {
        this.setupCloseBtn();
        this.setupLinkBehaviour();
    }

    private setupCloseBtn(): void {
        const closeBtn: HTMLButtonElement | null = this.querySelector('button');
        if (!closeBtn) return;
        closeBtn.addEventListener('click', () => this.close());
    }

    private setupLinkBehaviour(): void {
        const links: NodeListOf<HTMLAnchorElement> = this.querySelectorAll('a');
        if (!links) return;

        links.forEach((link: HTMLAnchorElement) => {
            link.addEventListener('click', (e: Event) => {
                e.preventDefault();
                const href: string | null = link.getAttribute('href');
                if (href) {
                    this.close();
                    window.location.hash = href;
                }
            });
        });
    }
}

customElements.define('app-menu', MenuComponent, { extends: 'dialog' });