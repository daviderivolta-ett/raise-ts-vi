import { Snackbar, SnackbarType } from '../models/snackbar.model';

export class SnackbarService {
    private static _instance: SnackbarService;

    constructor() {
        if (SnackbarService._instance) return SnackbarService._instance;
        SnackbarService._instance = this;
    }

    static get instance(): SnackbarService {
        if (!SnackbarService._instance) SnackbarService._instance = new SnackbarService();
        return SnackbarService._instance;
    }

    public updateSnackbar(type: SnackbarType, message: string, duration: number): Snackbar {
        return new Snackbar(
            type,
            message,
            duration
        );
    }
}