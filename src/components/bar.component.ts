import { SettingService } from '../services/setting.service';

export class BarComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public connectedCallback(): void {
        this.render();
        this.configBar(SettingService.instance.settings.showSettings);
        this.setup();
        this.checkCurrentPage();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <nav class="menu" role="tablist">
                <a class="bar-el-link categories-link" href="/categories" title="Categorie" role="tab" aria-selected="false" aria-controls="categories-panel">
                    <span class="material-symbols-outlined icon" aria-label="Categorie">stacks</span>
                </a>

                <a class="bar-el-link around-you-link" href="/around-you" title="Intorno a te" role="tab" aria-selected="false" aria-controls="around-you-panel">
                    <span class="material-symbols-outlined icon" aria-label="Intorno a te">explore</span>
                </a>

                <a class="bar-el-link suggested-paths-link" href="/suggested-paths" title="Percorsi suggeriti" role="tab" aria-selected="false" aria-controls="suggested-paths-panel">
                    <span class="material-symbols-outlined icon" aria-label="Percorsi suggeriti">directions</span>
                </a>

                <a class="bar-el-link custom-path-link" href="/custom-path" title="Percorso personalizzato" role="tab" aria-selected="false" aria-controls="cusotm-path-panel">
                    <span class="material-symbols-outlined icon" aria-label="Percorso personalizzato">favorite</span>
                </a>

                <a class="bar-el-link settings-link" href="/settings" title="Impostazioni" role="tab" aria-selected="false" aria-controls="settings-panel">
                    <span class="material-symbols-outlined icon" aria-label="Impostazioni">tune</span>
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
                    min-height: 3rem;
                    background-color: var(--surface-container-high);
                    border-radius: var(--border-radius-s) var(--border-radius-s) 0 0;
                }

                .bar-el-link {
                    cursor: pointer;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    color: var(--on-surface);
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
            if (link.getAttribute('href')?.slice(1) === hash) {
                link.classList.add('current');
                link.setAttribute('aria-selected', 'true');
            } else {
                link.classList.remove('current');
                link.setAttribute('aria-selected', 'false');
            }
        });
    }

    private configBar(showSettings: boolean): void {
        const settingsLink: HTMLAnchorElement | null = this.shadowRoot.querySelector('.settings-link');
        if (settingsLink) {
            if (!showSettings) settingsLink.style.display = 'none';
        }
    }

}

customElements.define('app-bar', BarComponent);