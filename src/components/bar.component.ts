import './bar-element.component';

export class BarComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public connectedCallback(): void {
        this.render();
        this.setup();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <nav class="menu" aria-label="menu">
                <ul class="menu-list">
                    <li><a href="/categories">Seleziona categoria</a></li>
                    <li><a href="/around-you">Intorno a me</a></li>
                    <li><a href="/suggested-paths">Percorsi suggeriti</a></li>
                    <li><a href="/custom-path">Percorso personalizzato</a></li>
                    <li><a href="/settings">Impostazioni</a></li>
                    <li>
                        <app-bar-el href="/settings">
                            <span slot="bar-el-label">Categorie</span>
                            <span slot="bar-el-icon">stacks</span>
                        </app-bar-el>
                    </li>
                </ul>
            </nav>

            <style>
                .menu-list {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0;
                    list-style-type: none;
                }
            </style>
            `
    }

    private setup(): void {
        this.setupLinkBehaviour();
    }

    private setupLinkBehaviour(): void {
        const links: NodeListOf<HTMLAnchorElement> = this.shadowRoot.querySelectorAll('a');
        if (!links) return;

        links.forEach((link: HTMLAnchorElement) => {
            link.addEventListener('click', (e: Event) => {
                e.preventDefault();
                const href: string | null = link.getAttribute('href');
                if (href) {
                    window.location.hash = href;
                }
            });
        });
    }
}

customElements.define('app-bar', BarComponent);