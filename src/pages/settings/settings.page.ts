import { Settings } from '../../models/settings.model';
import { SettingService } from '../../services/setting.service';
import { SettingsContrastComponent } from './settings-contrast.component';
import { SettingsFontSizeComponent } from './settings-font-size.component';
import { SettingsLetterSpaceComponent } from './settings-letter-space.component';
import { SettingsLineHeightComponent } from './settings-line-height.component';
import { SettingsTextTestComponent } from './settings-text-test.component';
import './settings-contrast.component';
import './settings-font-size.component';
import './settings-letter-space.component';
import './settings-line-height.component';
import './settings-text-test.component';

export class SettingsPage extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _settings: Settings = { ...SettingService.instance.settings };

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public get settings(): Settings {
        return this._settings;
    }

    public set settings(settings: Settings) {
        this._settings = settings;
    }

    public connectedCallback(): void {        
        this.render();
        this.setup();
        this.update();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <div class="page">
                <button is="app-menu-btn" aria-label="apri menu">Menu</button>
                <h1 tabindex="-1">Impostazioni</h1>
                <app-settings-contrast></app-settings-contrast>
                <app-settings-font-size></app-settings-font-size>
                <app-settings-letter-space></app-settings-letter-space>
                <app-settings-line-height></app-settings-line-height>
                <app-text-test></app-text-test>
                <button type="button" class="apply-btn">Applica</button>
            </div>

            <style>
                .page {
                    max-width: 500px;
                    margin: auto;
                }
            </style>
            `
            ;
    }

    private setup(): void {
        const contrast: SettingsContrastComponent | null = this.shadowRoot.querySelector('app-settings-contrast');
        const fontSize: SettingsFontSizeComponent | null = this.shadowRoot.querySelector('app-settings-font-size');
        const letterSpacing: SettingsLetterSpaceComponent | null = this.shadowRoot.querySelector('app-settings-letter-space');
        const lineHeight: SettingsLineHeightComponent | null = this.shadowRoot.querySelector('app-settings-line-height');
        const applyBtn: HTMLButtonElement | null = this.shadowRoot.querySelector('.apply-btn');

        if (!contrast) return;
        if (!fontSize) return;
        if (!letterSpacing) return;
        if (!lineHeight) return;
        if (!applyBtn) return;

        contrast.contrast = this.settings.contrast;
        fontSize.fontSize = this.settings.fontSize;
        lineHeight.lineHeight = this.settings.lineHeight;
        letterSpacing.letterSpace = this.settings.letterSpace;

        contrast.addEventListener('contrast-updated', (e: CustomEventInit) => {
            this.settings.contrast = e.detail.contrast;
            SettingService.instance.settings.contrast = this.settings.contrast;
            SettingService.instance.setContrast();
        });

        fontSize.addEventListener('font-size-updated', (e: CustomEventInit) => {
            this.settings.fontSize = e.detail.fontSize;
            this.update();
        });

        letterSpacing.addEventListener('letter-space-updated', (e: CustomEventInit) => {
            this.settings.letterSpace = e.detail.letterSpace;
            this.update();
        });

        lineHeight.addEventListener('line-height-updated', (e: CustomEventInit) => {
            this.settings.lineHeight = e.detail.lineHeight;
            this.update();
        })

        applyBtn.addEventListener('click', () => {
            window.location.href = '/#/around-you'
            SettingService.instance.settings = this.settings;
        });
    }

    private update(): void {
        const testText: SettingsTextTestComponent | null = this.shadowRoot.querySelector('app-text-test');
        if (!testText) return;
        testText.settings = this.settings;
    }
}

customElements.define('page-settings', SettingsPage);