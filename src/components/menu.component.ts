import { EventObservable } from '../observables/event.observable';

export class MenuComponent extends HTMLDialogElement {
    private _isOpen: boolean = false;

    constructor() {
        super();
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
        this.innerHTML =
            `
            <button autofocus aria-label="chiudi menu">Chiudi</button>
            <h2 id="menu-title">Menu</h2>
            <nav class="menu" >
                <ul>
                    <li>Pagina</li>
                    <li>Pagina</li>
                    <li>Pagina</li>           
                </ul>
            </nav>
            `
            ;
    }

    private setup(): void {
        EventObservable.instance.subscribe('toggle-menu', (isOpen: boolean) => this.isOpen = isOpen);

        const closeBtn: HTMLButtonElement | null = this.querySelector('button');
        if (!closeBtn) return;
        // closeBtn.addEventListener('click', () => MenuObservable.instance.isOpen = false);
        closeBtn.addEventListener('click', () => this.close());
    }

    private update(): void {
        const menu: HTMLDivElement | null = this.querySelector('.menu');
        if (!menu) return;
        this.isOpen ? this.classList.add('menu-visible') : this.classList.remove('menu-visible');

        const menuTitle: HTMLHeadingElement | null = this.querySelector('#menu-title');
        if (!menuTitle) return;
        // if (this.isOpen) menuTitle.focus();
    }
}

customElements.define('app-menu', MenuComponent, { extends: 'dialog' });