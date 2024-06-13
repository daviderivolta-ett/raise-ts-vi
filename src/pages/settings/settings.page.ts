import { Settings } from '../../models/settings.model';
import { SettingService } from '../../services/setting.service';
import { SettingsContrastComponent } from './settings-contrast.component';
import { SettingsFontSizeComponent } from './settings-font-size.component';
import { SettingsLetterSpaceComponent } from './settings-letter-space.component';
import { SettingsLineHeightComponent } from './settings-line-height.component';

import './settings-contrast.component';
import './settings-font-size.component';
import './settings-letter-space.component';
import './settings-line-height.component';

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
        console.log(this.settings);
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <div class="settings-page">
                <div class="page-header">
                    <h1 class="page-title" tabindex="-1">Impostazioni</h1>
                </div>
                <app-settings-contrast class="settings-option"></app-settings-contrast>
                <app-settings-font-size class="settings-option"></app-settings-font-size>
                <app-settings-letter-space class="settings-option"></app-settings-letter-space>
                <app-settings-line-height class="settings-option"></app-settings-line-height>
            </div>

            <style>
                :host {
                    display: block;
                    padding:  0 0 5rem 0;
                }
                
                h1,
                p {
                    font-weight: 400;
                    margin: 0;
                }

                .settings-page {
                    padding: 0 4%;
                }

                .page-header {
                    position: relative;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 0 24px 0;
                }
                
                button[is="app-menu-btn"] {
                    cursor: pointer;
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                    color: var(--on-surface);
                    background-color: transparent;
                    border: none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0;
                    height: 40px;
                    width: 40px;
                }

                .page-title {
                    text-align: center;
                    font-size: 1rem;
                }

                .page-desc {
                    text-align: center;
                    margin: 0 0 24px 0;
                    color: var(--on-surface-variant);
                }

                .settings-option {
                    display: block;
                    margin: 0 0 40px 0;
                }

                .material-symbols-outlined {
                    font-family: 'Material Symbols Outlined';
                    font-size: 1.2rem;
                    font-variation-settings:
                        'FILL' 0,
                        'wght' 400,
                        'GRAD' 0,
                        'opsz' 24;
                }
            </style>
            `
            ;

        const title: HTMLHeadingElement | null = this.shadowRoot.querySelector('h1');
        if (title) title.focus();
    }

    private setup(): void {
        const contrast: SettingsContrastComponent | null = this.shadowRoot.querySelector('app-settings-contrast');
        const fontSize: SettingsFontSizeComponent | null = this.shadowRoot.querySelector('app-settings-font-size');
        const letterSpacing: SettingsLetterSpaceComponent | null = this.shadowRoot.querySelector('app-settings-letter-space');
        const lineHeight: SettingsLineHeightComponent | null = this.shadowRoot.querySelector('app-settings-line-height');

        if (!contrast) return;
        if (!fontSize) return;
        if (!letterSpacing) return;
        if (!lineHeight) return;

        contrast.contrast = this.settings.contrast;
        fontSize.fontSize = this.settings.fontSize;
        lineHeight.lineHeight = this.settings.lineHeight;
        letterSpacing.letterSpace = this.settings.letterSpace;

        contrast.addEventListener('contrast-updated', (e: CustomEventInit) => {
            this.settings.contrast = e.detail.contrast;
            SettingService.instance.settings.contrast = this.settings.contrast;
            SettingService.instance.setContrast();
            SettingService.instance.settings = this.settings;
        });

        fontSize.addEventListener('font-size-updated', (e: CustomEventInit) => {
            this.settings.fontSize = e.detail.fontSize;    
            SettingService.instance.settings.fontSize = this.settings.fontSize;
            SettingService.instance.setFontSize(this.settings.fontSize);
            SettingService.instance.settings = this.settings;           
        });

        letterSpacing.addEventListener('letter-space-updated', (e: CustomEventInit) => {
            this.settings.letterSpace = e.detail.letterSpace;
            SettingService.instance.settings.letterSpace = this.settings.letterSpace;
            SettingService.instance.setLetterSpace(this.settings.letterSpace);
            SettingService.instance.settings = this.settings;
        });

        lineHeight.addEventListener('line-height-updated', (e: CustomEventInit) => {
            this.settings.lineHeight = e.detail.lineHeight;            
            SettingService.instance.settings.lineHeight = this.settings.lineHeight;
            SettingService.instance.setLineHeight(this.settings.lineHeight);
            SettingService.instance.settings = this.settings;
        });
    }
}

customElements.define('page-settings', SettingsPage);