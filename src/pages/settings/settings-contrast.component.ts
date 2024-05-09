import { Contrast } from '../../models/settings.model';

export class SettingsContrastComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _contrast: Contrast = Contrast.LightHigh;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public get contrast(): Contrast {
        return this._contrast;
    }

    public set contrast(contrast: Contrast) {
        this._contrast = contrast;
        this.update();
        this.dispatchEvent(new CustomEvent('contrast-updated', { detail: { contrast: this.contrast } }));
    }

    public connectedCallback(): void {
        this.render();
        this.setup();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <div class="settings-contrast">
                <h2 class="settings-title">Contrasto</h2>
                <div class="contrast-option-list">
                    <div class="contrast-option">
                        <input type="radio" id="light-contrast" name="contrast" value="light">
                        <label for="light-contrast" aria-label="Tema light">Light</label>
                    </div>
                    <div class="contrast-option">
                        <input type="radio" id="dark-contrast" name="contrast" value="dark">
                        <label for="dark-contrast" aria-label="Tema dark">Dark</label>
                    </div>
                    <div class="contrast-option">
                        <input type="radio" id="light-high-contrast" name="contrast" value="light-high">
                        <label for="light-high-contrast" aria-label="Tema light ad alto contrasto">Light alto contrasto</label>
                    </div>
                    <div class="contrast-option">
                        <input type="radio" id="dark-high-contrast" name="contrast" value="dark-high">
                        <label for="dark-high-contrast" aria-label="Tema dark ad alto contrasto">Dark alto contrasto</label>
                    </div>
                </div>
            </div>

            <style>
                h2,
                p {
                    font-weight: 400;
                    margin: 0;
                }

                .settings-title {
                    text-align: center;
                    font-size: 1.7rem;
                    margin: 0 0 16px 0;
                }

                .contrast-option-list {
                    display: flex;
                    flex-wrap: wrap;
                }

                .contrast-option {
                    cursor: pointer;
                    width: calc(50% - 16px);
                    min-height: 80px;
                    margin: 8px;
                    position: relative;
                }

                .contrast-option label {
                    cursor: inherit;
                    height: 100%;
                    padding: 16px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    color: var(--on-primary-container);
                    background-color: var(--primary-container);
                    border: 1px solid transparent;
                    border-radius: var( --border-radius-s);
                    box-sizing: border-box;
                }

                input[type="radio"] {
                    opacity: 0;
                    width: 0;
                    height: 0;
                    position: absolute;
                }

                input[type="radio"]:checked + label {
                    color: var(--inverse-on-surface);
                    background-color: var(--inverse-surface);
                }
            </style>
            `
            ;
    }

    private setup(): void {
        this.handleRadioChange();
    }

    private handleRadioChange(): void {
        const lightRadio: HTMLInputElement | null = this.shadowRoot.querySelector('#light-contrast');
        const darkRadio: HTMLInputElement | null = this.shadowRoot.querySelector('#dark-contrast');
        const lightHighRadio: HTMLInputElement | null = this.shadowRoot.querySelector('#light-high-contrast');
        const darkHighRadio: HTMLInputElement | null = this.shadowRoot.querySelector('#dark-high-contrast');

        if (!lightRadio || !darkRadio || !lightHighRadio || !darkHighRadio) return;

        lightRadio.addEventListener('change', () => this.contrast = Contrast.Light);
        darkRadio.addEventListener('change', () => this.contrast = Contrast.Dark);
        lightHighRadio.addEventListener('change', () => this.contrast = Contrast.LightHigh);
        darkHighRadio.addEventListener('change', () => this.contrast = Contrast.DarkHigh);
    }

    private update(): void {        
        const radioBtns: HTMLInputElement[] = Array.from(this.shadowRoot.querySelectorAll<HTMLInputElement>('input[name="contrast"]'));
        radioBtns.forEach((radio: HTMLInputElement) => {
            if (radio.value === this.contrast) radio.checked = true;
        });
    }
}

customElements.define('app-settings-contrast', SettingsContrastComponent);