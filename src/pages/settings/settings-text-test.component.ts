import { Settings } from '../../models/settings.model';

export class SettingsTextTestComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _settings: Settings = new Settings();

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public get settings(): Settings {
        return this._settings;
    }

    public set settings(settings: Settings) {
        this._settings = settings;
        this.update();
    }

    public connectedCallback(): void {
        this.render();
    }

    private render(): void {
        this.shadowRoot.innerHTML = 
            `
            <p class="test-text">
                Questo è un testo di esempio. Le dimensioni e il colore di questo testo cambiano quando cambi le preferenze del tuo display.
            </p>
            `
            ;
    }

    private update(): void {
        const testText: HTMLParagraphElement | null = this.shadowRoot.querySelector('.test-text');
        if (!testText) return;

        testText.style.setProperty('font-size', `${this.settings.fontSize}px`);
        testText.style.setProperty('letter-spacing', `${this.settings.letterSpace}rem`);
        testText.style.setProperty('line-height', this.settings.lineHeight + '');
    }
}

customElements.define('app-text-test', SettingsTextTestComponent);