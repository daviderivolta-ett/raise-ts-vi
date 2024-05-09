import { SnackbarComponent } from '../components/snackbar.component';
import { Snackbar, SnackbarType } from '../models/snackbar.model';

export class SnackbarService {
    private static _instance: SnackbarService;
    private _snackbar: Snackbar = new Snackbar(SnackbarType.Info, '');
    private _live: SnackbarComponent | null = document.body.querySelector('app-snackbar');

    constructor() {
        if (SnackbarService._instance) return SnackbarService._instance;
        SnackbarService._instance = this;
    }

    public static get instance(): SnackbarService {
        if (!SnackbarService._instance) SnackbarService._instance = new SnackbarService();
        return SnackbarService._instance;
    }

    public get snackbar(): Snackbar {
        return this._snackbar;
    }

    public set snackbar(snackbar: Snackbar) {
        this._snackbar = snackbar;
    }

    public get live(): SnackbarComponent | null {
        return this._live;
    }

    public set live(live: SnackbarComponent | null) {
        this._live = live;
    }

    public updateSnackbar(type: SnackbarType, message: string, duration: number = 5): void {
        if (!this.live) return;
        this.live.snackbar = new Snackbar(type, message, duration);
    }

    public resetSnackbar(): void {
        if (!this.live) return;
        this.live.resetSnackbar();
    }
}