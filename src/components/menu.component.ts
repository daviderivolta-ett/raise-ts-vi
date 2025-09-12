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
            <div class="dialog-content">
                <div class="menu-header">
                    <h2 class="menu-title">Menu</h2>
                    <button type="button" class="close-menu-btn" aria-label="Chiudi menu" autofocus>
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
                <nav class="menu" aria-label="menu">
                    <ul>
                        <li><a href="/categories">Seleziona categoria</a></li>
                        <li><a href="/around-you">Intorno a me</a></li>
                        <li><a href="/custom-path">Percorso personalizzato</a></li>
                        <li><a href="/settings">Impostazioni</a></li>
                    </ul>
                </nav>
            </div>

            <style>
                h2,
                p {
                    font-weight: 400;
                    margin: 0;
                    color: var(--on-surface);
                }

                .menu-header {
                    position: relative;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 0 24px 0;
                }

                .dialog-content {
                    position: relative;
                    max-width: 576px;
                    margin: auto;
                    padding: 0 4%;
                }

                button.close-menu-btn {
                    cursor: pointer;
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                    color: var(--on-surface);
                    background-color: transparent;
                    border: none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0;
                    height: 40px;
                    width: 40px;
                }

                .menu-title {
                    text-align: center;
                    font-size: 1rem;
                }

                .menu ul {
                    margin: 0;
                    padding: 0;
                    text-align: center;
                    list-style-type: none;
                }

                .menu ul li + li {
                    margin: 16px 0;
                }

                .menu a {
                    color: var(--on-surface-variant);
                    text-decoration: none;
                    font-size: 1.4rem;
                }

                .menu a:hover {
                    color: var(--primary);
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
            </style>
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