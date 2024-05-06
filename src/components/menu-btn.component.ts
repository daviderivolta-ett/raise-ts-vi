import { EventObservable } from '../observables/event.observable';

export class MenuBtnComponent extends HTMLButtonElement {
    private _isOpen: boolean = false;
    private _label: string = '';

    constructor() {
        super();
    }

    public get isOpen(): boolean {
        return this._isOpen;
    }

    public set isOpen(isOpen: boolean) {
        this._isOpen = isOpen;
        this.isOpen ? this.label = 'chiudi menu' : this.label = 'apri menu';
    }

    get label(): string {
        return this._label;
    }

    set label(label: string) {
        this._label = label;
        this.setAttribute('aria-label', this.label);
    }

    public connectedCallback(): void {
        // this.setup();
    }

    // private setup(): void {
    //     this.addEventListener('click', () => {
    //         MenuObservable.instance.isOpen = !this.isOpen;
    //     });
    //     EventObservable.instance.subscribe('toggle-menu', (isOpen: boolean) => this.isOpen = isOpen);
    // }

    public disconnectedCallback(): void {
        EventObservable.instance.unsubscribeAll('toggle-menu');
    }
}

customElements.define('app-menu-btn', MenuBtnComponent, { extends: 'button' });