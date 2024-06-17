import { Contrast, Settings } from '../models/settings.model';

export class SettingService {
    private static _instance: SettingService;
    private _settings: Settings = new Settings();

    public get settings(): Settings {
        return this._settings;
    }

    public set settings(settings: Settings) {
        this._settings = settings;        
        this.setFontSize(this.settings.fontSize);
        this.setLetterSpace(this.settings.letterSpace);
        this.setLineHeight(this.settings.lineHeight);
        this.setContrast();
        this.setLocalStorageSettings();
    }

    constructor() {
        if (SettingService._instance) return SettingService._instance;
        SettingService._instance = this;
    }

    static get instance(): SettingService {
        if (!SettingService._instance) SettingService._instance = new SettingService();
        return SettingService._instance;
    }

    public getLocalStorageSettings(): void {
        const localStorageContentString: any = localStorage.getItem('settings-vi');
        if (!localStorageContentString) return;
        const localStorageContent: any = JSON.parse(localStorageContentString);
        const settings: Settings = this.parseLocalStorageSettings(localStorageContent);
        this.settings = { ...settings };
    }

    public setLocalStorageSettings(): void {
        localStorage.setItem('settings-vi', JSON.stringify(this.settings));
    }

    public setLightContrast(): void {
        document.documentElement.style.setProperty('color-scheme', 'light');
        document.documentElement.style.setProperty('--primary', 'rgb(0, 107, 88)');
        document.documentElement.style.setProperty('--on-primary', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--primary-container', 'rgb(243, 255, 249)');
        document.documentElement.style.setProperty('--on-primary-container', 'rgb(0, 32, 25)');

        document.documentElement.style.setProperty('--secondary', 'rgb(71, 100, 91)');
        document.documentElement.style.setProperty('--on-secondary', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--secondary-container', 'rgb(243, 255, 249)');
        document.documentElement.style.setProperty('--on-secondary-container', 'rgb(3, 32, 25)');

        document.documentElement.style.setProperty('--tertiary', 'rgb(59, 99, 122)');
        document.documentElement.style.setProperty('--on-tertiary', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--tertiary-container', 'rgb(251, 252, 255)');
        document.documentElement.style.setProperty('--on-tertiary-container', 'rgb(0, 30, 45)');

        document.documentElement.style.setProperty('--error', 'rgb(184, 31, 33)');
        document.documentElement.style.setProperty('--on-error', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--error-container', 'rgb(255, 218, 214)');
        document.documentElement.style.setProperty('--on-error-container', 'rgb(65, 0, 3)');

        document.documentElement.style.setProperty('--surface-dim', 'rgb(201, 218, 255)');
        document.documentElement.style.setProperty('--surface', 'rgb(249, 249, 255)');
        document.documentElement.style.setProperty('--surface-bright', 'rgb(249, 249, 255)');

        document.documentElement.style.setProperty('--surface-container-lowest', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--surface-container-low', 'rgb(240, 243, 255)');
        document.documentElement.style.setProperty('--surface-container', 'rgb(232, 238, 255)');
        document.documentElement.style.setProperty('--surface-container-high', 'rgb(223, 232, 255)');
        document.documentElement.style.setProperty('--surface-container-highest', 'rgb(214, 227, 255)');

        document.documentElement.style.setProperty('--on-surface', 'rgb(0, 27, 61)');
        document.documentElement.style.setProperty('--on-surface-variant', 'rgb(42, 72, 112)');
        document.documentElement.style.setProperty('--outline', 'rgb(92, 120, 163)');
        document.documentElement.style.setProperty('--outline-variant', 'rgb(171, 200, 247)');

        document.documentElement.style.setProperty('--inverse-surface', 'rgb(0, 48, 99)');
        document.documentElement.style.setProperty('--inverse-on-surface', 'rgb(236, 240, 255)');
        document.documentElement.style.setProperty('--inverse-primary', 'rgb(55, 222, 187)');
    }

    public setDarkContrast(): void {
        document.documentElement.style.setProperty('color-scheme', 'dark');
        document.documentElement.style.setProperty('--primary', 'rgb(55, 222, 187)');
        document.documentElement.style.setProperty('--on-primary', 'rgb(0, 56, 45)');
        document.documentElement.style.setProperty('--primary-container', 'rgb(0, 81, 66)');
        document.documentElement.style.setProperty('--on-primary-container', 'rgb(184, 255, 233)');

        document.documentElement.style.setProperty('--secondary', 'rgb(174, 205, 194)');
        document.documentElement.style.setProperty('--on-secondary', 'rgb(25, 53, 46)');
        document.documentElement.style.setProperty('--secondary-container', 'rgb(48, 76, 68)');
        document.documentElement.style.setProperty('--on-secondary-container', 'rgb(202, 233, 222)');

        document.documentElement.style.setProperty('--tertiary', 'rgb(163, 204, 231)');
        document.documentElement.style.setProperty('--on-tertiary', 'rgb(1, 52, 74)');
        document.documentElement.style.setProperty('--tertiary-container', 'rgb(33, 75, 98)');
        document.documentElement.style.setProperty('--on-tertiary-container', 'rgb(197, 231, 255)');

        document.documentElement.style.setProperty('--error', 'rgb(255, 180, 171)');
        document.documentElement.style.setProperty('--on-error', 'rgb(105, 0, 5)');
        document.documentElement.style.setProperty('--error-container', 'rgb(147, 0, 10)');
        document.documentElement.style.setProperty('--on-error-container', 'rgb(255, 218, 214)');

        document.documentElement.style.setProperty('--surface-dim', 'rgb(0, 19, 46)');
        document.documentElement.style.setProperty('--surface', 'rgb(0, 19, 46)');
        document.documentElement.style.setProperty('--surface-bright', 'rgb(0, 56, 115)');

        document.documentElement.style.setProperty('--surface-container-lowest', 'rgb(0, 14, 37)');
        document.documentElement.style.setProperty('--surface-container-low', 'rgb(0, 27, 61)');
        document.documentElement.style.setProperty('--surface-container', 'rgb(0, 31, 69)');
        document.documentElement.style.setProperty('--surface-container-high', 'rgb(0, 41, 87)');
        document.documentElement.style.setProperty('--surface-container-highest', 'rgb(0, 52, 107)');

        document.documentElement.style.setProperty('--on-surface', 'rgb(213, 227, 255)');
        document.documentElement.style.setProperty('--on-surface-variant', 'rgb(171, 200, 247)');
        document.documentElement.style.setProperty('--outline', 'rgb(118, 146, 191)');
        document.documentElement.style.setProperty('--outline-variant', 'rgb(42, 72, 112)');

        document.documentElement.style.setProperty('--inverse-surface', 'rgb(214, 227, 255)');
        document.documentElement.style.setProperty('--inverse-on-surface', 'rgb(0, 48, 99)');
        document.documentElement.style.setProperty('--inverse-primary', 'rgb(0, 107, 88)');
    }

    public setLightHighContrast(): void {
        document.documentElement.style.setProperty('color-scheme', 'light');
        document.documentElement.style.setProperty('--primary', 'rgb(0, 0, 0)');
        document.documentElement.style.setProperty('--on-primary', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--primary-container', 'rgb(0, 0, 0)');
        document.documentElement.style.setProperty('--on-primary-container', 'rgb(255, 255, 255)');

        document.documentElement.style.setProperty('--secondary', 'rgb(0, 0, 0)');
        document.documentElement.style.setProperty('--on-secondary', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--secondary-container', 'rgb(0, 0, 0)');
        document.documentElement.style.setProperty('--on-secondary-container', 'rgb(255, 255, 255)');

        document.documentElement.style.setProperty('--tertiary', 'rgb(0, 0, 0)');
        document.documentElement.style.setProperty('--on-tertiary', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--tertiary-container', 'rgb(0, 0, 0)');
        document.documentElement.style.setProperty('--on-tertiary-container', 'rgb(255, 255, 255)');

        document.documentElement.style.setProperty('--error', 'rgb(0, 0, 0)');
        document.documentElement.style.setProperty('--on-error', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--error-container', 'rgb(0, 0, 0)');
        document.documentElement.style.setProperty('--on-error-container', 'rgb(255, 255, 255)');

        document.documentElement.style.setProperty('--surface-dim', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--surface', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--surface-bright', 'rgb(255, 255, 255)');

        document.documentElement.style.setProperty('--surface-container-lowest', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--surface-container-low', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--surface-container', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--surface-container-high', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--surface-container-highest', 'rgb(255, 255, 255)');

        document.documentElement.style.setProperty('--on-surface', 'rgb(0, 0, 0)');
        document.documentElement.style.setProperty('--on-surface-variant', 'rgb(0, 0, 0)');
        document.documentElement.style.setProperty('--outline', 'rgb(211, 211, 211)');
        document.documentElement.style.setProperty('--outline-variant', 'rgb(211, 211, 211)');

        document.documentElement.style.setProperty('--inverse-surface', 'rgb(0, 0, 0)');
        document.documentElement.style.setProperty('--inverse-on-surface', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--inverse-primary', 'rgb(255, 255, 255)');
    }

    public setDarkHighContrast(): void {
        document.documentElement.style.setProperty('color-scheme', 'dark');
        document.documentElement.style.setProperty('--primary', 'rgb(255, 255, 0)');
        document.documentElement.style.setProperty('--on-primary', 'rgb(0, 0, 0)');
        document.documentElement.style.setProperty('--primary-container', 'rgb(255, 255, 0)');
        document.documentElement.style.setProperty('--on-primary-container', 'rgb(0, 0, 0)');

        document.documentElement.style.setProperty('--secondary', 'rgb(255, 255, 0)');
        document.documentElement.style.setProperty('--on-secondary', 'rgb(0, 0, 0)');
        document.documentElement.style.setProperty('--secondary-container', 'rgb(255, 255, 0)');
        document.documentElement.style.setProperty('--on-secondary-container', 'rgb(0, 0, 0)');

        document.documentElement.style.setProperty('--tertiary', 'rgb(255, 255, 0)');
        document.documentElement.style.setProperty('--on-tertiary', 'rgb(0, 0, 0)');
        document.documentElement.style.setProperty('--tertiary-container', 'rgb(255, 255, 0)');
        document.documentElement.style.setProperty('--on-tertiary-container', 'rgb(0, 0, 0)');

        document.documentElement.style.setProperty('--error', 'rgb(255, 255, 0)');
        document.documentElement.style.setProperty('--on-error', 'rgb(0, 0, 0)');
        document.documentElement.style.setProperty('--error-container', 'rgb(255, 255, 0)');
        document.documentElement.style.setProperty('--on-error-container', 'rgb(0, 0, 0)');

        document.documentElement.style.setProperty('--surface-dim', 'rgb(0, 0, 0)');
        document.documentElement.style.setProperty('--surface', 'rgb(0, 0, 0)');
        document.documentElement.style.setProperty('--surface-bright', 'rgb(0, 0, 0)');

        document.documentElement.style.setProperty('--surface-container-lowest', 'rgb(0, 0, 0)');
        document.documentElement.style.setProperty('--surface-container-low', 'rgb(0, 0, 0)');
        document.documentElement.style.setProperty('--surface-container', 'rgb(0, 0, 0)');
        document.documentElement.style.setProperty('--surface-container-high', 'rgb(0, 0, 0)');
        document.documentElement.style.setProperty('--surface-container-highest', 'rgb(0, 0, 0)');

        document.documentElement.style.setProperty('--on-surface', 'rgb(255, 255, 0)');
        document.documentElement.style.setProperty('--on-surface-variant', 'rgb(255, 255, 0)');
        document.documentElement.style.setProperty('--outline', 'rgb(78, 78, 0)');
        document.documentElement.style.setProperty('--outline-variant', 'rgb(78, 78, 0)');

        document.documentElement.style.setProperty('--inverse-surface', 'rgb(255, 255, 0)');
        document.documentElement.style.setProperty('--inverse-on-surface', 'rgb(0, 0, 0)');
        document.documentElement.style.setProperty('--inverse-primary', 'rgb(0, 0, 0)');

    }

    public setFontSize(value: number): void {
        document.documentElement.style.setProperty('font-size', value.toString() + 'px');
    }

    public setContrast(): void {
        switch (this.settings.contrast) {
            case Contrast.Light:
                this.setLightContrast();
                break;
            case Contrast.Dark:
                this.setDarkContrast();
                break;
            case Contrast.LightHigh:
                this.setLightHighContrast();
                break;
            default:
                this.setDarkHighContrast()
                break;
        }
    }

    public setLetterSpace(value: number): void {
        document.documentElement.style.setProperty('letter-spacing', value.toString() + 'rem');
    }

    public setLineHeight(value: number): void {
        document.documentElement.style.setProperty('line-height', value.toString());
    }

    private parseLocalStorageSettings(settings: any): Settings {
        let s: Settings = new Settings();

        s.contrast = settings.contrast;
        s.fontSize = settings.fontSize;
        s.lineHeight = settings.lineHeight;
        s.letterSpace = settings.letterSpace;
        s.showSettings = settings.showSettings;

        return s;
    }
}