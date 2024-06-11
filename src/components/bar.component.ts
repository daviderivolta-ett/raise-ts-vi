export class BarComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public connectedCallback(): void {
        this.render();
        this.setup();
        this.checkCurrentPage();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <nav class="menu" aria-label="menu" role="navigation">
                <a class="bar-el-link" href="/categories" role="link" tabindex="0" title="categorie">
                    <span class="material-symbols-outlined icon" aria-hidden="true">stacks</span>
                </a>

                <a class="bar-el-link" href="/around-you" role="link" tabindex="0" title="intorno a te">
                    <span class="material-symbols-outlined icon" aria-hidden="true">explore</span>
                </a>

                <a class="bar-el-link" href="/suggested-paths" role="link" tabindex="0" title="percorsi suggeriti">
                    <span class="material-symbols-outlined icon" aria-hidden="true">directions</span>
                </a>

                <a class="bar-el-link" href="/custom-path" role="link" tabindex="0" title="percorso personalizzato">
                    <span class="material-symbols-outlined icon" aria-hidden="true">favorite</span>
                </a>

                <a class="bar-el-link" href="/settings" role="link" tabindex="0" title="impostazioni">
                    <span class="material-symbols-outlined icon" aria-hidden="true">tune</span>
                </a>
            </nav>

            <style>
                .menu {
                    display: flex;
                    justify-content: space-between;
                    align-items: stretch;
                    padding: 0;
                    margin: 0;
                    list-style-type: none;
                    min-height: 48px;
                    background-color: var(--surface-container-high);
                }

                .bar-el-link {
                    cursor: pointer;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    color: var(--on-surface);
                    background-color: var(--surface-container-high);
                    font-size: .8rem;
                    width: 100%;
                    flex-grow: 1;
                    text-align: center;
                }

                .icon {
                    width: 66%;
                    height: 32%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 100px;
                }

                .current .icon {
                    color: var(--on-primary-container);
                    background-color: var(--primary-container);
                    padding: 8px;
                }

                .current .material-symbols-outlined {
                    font-variation-settings:
                        'FILL' 1,
                        'opsz' 20;
                }

                .material-symbols-outlined {
                    font-family: 'Material Symbols Outlined';
                    font-size: 1.6rem;
                    font-variation-settings:
                        'FILL' 0,
                        'wght' 400,
                        'GRAD' 0,
                        'opsz' 48;
                }
            </style>
            `
    }

    private setup(): void {
        this.onLinkClick();
        window.addEventListener('hashchange', () => this.checkCurrentPage());
    }

    private onLinkClick(): void {
        const links: HTMLAnchorElement[] = Array.from(this.shadowRoot.querySelectorAll('.bar-el-link'));
        links.forEach((link: HTMLAnchorElement) => {
            link.addEventListener('click', (e: Event) => {
                e.preventDefault();
                const href: string | null = link.getAttribute('href');
                if (href) window.location.hash = href;
            });
        });
    }

    private checkCurrentPage(): void {
        const hash: string = window.location.hash.slice(2);
        const links: HTMLAnchorElement[] = Array.from(this.shadowRoot.querySelectorAll('.bar-el-link'));
        links.forEach((link: HTMLAnchorElement) => {
            link.getAttribute('href')?.slice(1) === hash ? link.classList.add('current') : link.classList.remove('current');
        });
    }

}

customElements.define('app-bar', BarComponent);