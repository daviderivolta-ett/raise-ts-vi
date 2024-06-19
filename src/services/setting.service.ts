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
        document.body.classList.remove('dark');
        document.body.classList.remove('dark-high');
        document.body.classList.remove('light-high');
        document.body.classList.add('light');
    }

    public setDarkContrast(): void {
        document.body.classList.remove('light');
        document.body.classList.remove('light-high');
        document.body.classList.remove('dark-high');
        document.body.classList.add('dark');
    }

    public setLightHighContrast(): void {
        document.body.classList.remove('light');
        document.body.classList.remove('dark');
        document.body.classList.remove('dark-high');
        document.body.classList.add('light-high');
    }

    public setDarkHighContrast(): void {
        document.body.classList.remove('light');
        document.body.classList.remove('dark');
        document.body.classList.remove('light-high');
        document.body.classList.add('dark-high');
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