export class Settings {
    fontSize: number = 16;
    letterSpace: number = 0;
    lineHeight = 1.15;
    contrast: Contrast = Contrast.Dark;

    constructor() { }
}

export enum Contrast {
    Light = 'light',
    Dark = 'dark',
    LightHigh = 'light-high',
    DarkHigh = 'dark-high'
}