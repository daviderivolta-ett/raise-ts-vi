import { EventObservable } from './event.observable';

export class MenuObservable {
    private static _instance: MenuObservable;
    private _isOpen: boolean = false;

    private constructor() {
        if (MenuObservable._instance) return MenuObservable._instance;
        MenuObservable._instance = this;
    }

    public static get instance(): MenuObservable {
        if (!MenuObservable._instance) MenuObservable._instance = new MenuObservable();
        return MenuObservable._instance;
    }

    get isOpen(): boolean {
        return this._isOpen;
    }

    set isOpen(isOpen) {
        this._isOpen = isOpen;    
        EventObservable.instance.publish('toggle-menu', this.isOpen);
    }
}