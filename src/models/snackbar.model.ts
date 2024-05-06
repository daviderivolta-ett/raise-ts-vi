export class Snackbar {
    type: SnackbarType;
    message: string;
    duration: number;

    constructor(type: SnackbarType, message: string, duration: number = 2) {
        this.type = type;
        this.message = message;
        this.duration = duration;
    }

    static createEmpty(): Snackbar {
        return new Snackbar(SnackbarType.Info, '', 2);
    }
}

export enum SnackbarType {
    Error = 'error',
    Info = 'info'
}