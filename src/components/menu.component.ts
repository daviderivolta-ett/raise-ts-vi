import { EventObservable } from '../observables/event.observable';
import { MenuObservable } from '../observables/menu.observable';

export class MenuComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _isOpen: boolean = false;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public get isOpen(): boolean {
        return this._isOpen;
    }

    public set isOpen(isOpen: boolean) {
        this._isOpen = isOpen;
        this.update();
    }

    public connectedCallback(): void {
        this.render();
        this.setup();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <div class="menu">
                <button aria-label="chiudi menu">Chiudi</button>
                <p>MENU</p>            
            </div>

            <style>
                :host {
                    display: block;
                    position: fixed;
                    width: 100%;
                    height: 100vh;
                    top: 0;
                    right: -500px;
                    background-color: red;
                }

                :host(.menu-visible) {
                    right: 0;
                }
            </style>
            `
            ;
    }

    private setup(): void {
        EventObservable.instance.subscribe('toggle-menu', (isOpen: boolean) => this.isOpen = isOpen);

        const closeBtn: HTMLButtonElement | null = this.shadowRoot.querySelector('button');
        if (!closeBtn) return;
        closeBtn.addEventListener('click', () => MenuObservable.instance.isOpen = false);
    }

    private update(): void {
        this.isOpen ? this.classList.add('menu-visible') : this.classList.remove('menu-visible');
    }
}

customElements.define('app-menu', MenuComponent);