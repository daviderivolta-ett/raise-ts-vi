export class MenuBtnComponent extends HTMLButtonElement {
    constructor() {
        super();
    }

    public connectedCallback(): void {
        this.setup();
    }

    private setup(): void {
        this.addEventListener('click', () => {
            const menu: HTMLDialogElement | null = document.body.querySelector('dialog[is="app-menu"]');
            if (!menu) return;
            menu.showModal();
        });
    }
}

customElements.define('app-menu-btn', MenuBtnComponent, { extends: 'button' });