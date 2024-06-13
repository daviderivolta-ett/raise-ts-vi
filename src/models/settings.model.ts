export class Settings {
    fontSize: number = 14;
    letterSpace: number = 0;
    lineHeight = 1.15;
    contrast: Contrast = Contrast.Dark;
    showSettings: boolean = true;

    constructor() { }
}

export enum Contrast {
    Light = 'light',
    Dark = 'dark',
    LightHigh = 'light-high',
    DarkHigh = 'dark-high'
}

export enum User {
    Blind = 'blind',
    VisuallyImpaired = 'vi',
    FineMotor = 'fine-motor'
}