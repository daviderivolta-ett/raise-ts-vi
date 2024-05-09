export class SettingsFontSizeComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _fontSize: number = 16;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public get fontSize(): number {
        return this._fontSize;
    }

    public set fontSize(fontSize: number) {
        this._fontSize = fontSize;
        this.update();
        this.dispatchEvent(new CustomEvent('font-size-updated', { detail: { fontSize: this.fontSize } }));
    }

    public connectedCallback(): void {
        this.render();
        this.setup();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <div class="settings-font-size">
                <h2 class="settings-title">Dimensione testo</h2>
                <div class="font-size-option-list">
                    <div class="font-size-option">
                        <input type="radio" id="font-size-s" name="font-size" value="16">
                        <label for="font-size-s" aria-label="Dimensione font: S">S</label>
                    </div>
                    <div class="font-size-option">
                        <input type="radio" id="font-size-m" name="font-size" value="24">
                        <label for="font-size-m" aria-label="Dimensione font: M">M</label>
                    </div>
                    <div class="font-size-option">
                        <input type="radio" id="font-size-l" name="font-size" value="36">
                        <label for="font-size-l" aria-label="Dimensione font: L">L</label>
                    </div>
                    <div class="font-size-option">
                        <input type="radio" id="font-size-xl" name="font-size" value="48">
                        <label for="font-size-xl" aria-label="Dimensione font: XL">XL</label>
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

                .font-size-option-list {
                    display: flex;
                    flex-wrap: wrap;
                }

                .font-size-option {
                    cursor: pointer;
                    width: calc(50% - 16px);
                    min-height: 80px;
                    margin: 8px;
                    position: relative;
                }

                .font-size-option label {
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
        const fontSizeSmallRadio: HTMLInputElement | null = this.shadowRoot.querySelector('#font-size-s');
        const fontSizeMediumRadio: HTMLInputElement | null = this.shadowRoot.querySelector('#font-size-m');
        const fontSizeLargeRadio: HTMLInputElement | null = this.shadowRoot.querySelector('#font-size-l');
        const fontSizeExtraLargeRadio: HTMLInputElement | null = this.shadowRoot.querySelector('#font-size-xl');

        if (!fontSizeSmallRadio || !fontSizeMediumRadio || !fontSizeLargeRadio || !fontSizeExtraLargeRadio) return;

        fontSizeSmallRadio.addEventListener('change', () => this.fontSize = parseInt(fontSizeSmallRadio.value));
        fontSizeMediumRadio.addEventListener('change', () => this.fontSize = parseInt(fontSizeMediumRadio.value));
        fontSizeLargeRadio.addEventListener('change', () => this.fontSize = parseInt(fontSizeLargeRadio.value));
        fontSizeExtraLargeRadio.addEventListener('change', () => this.fontSize = parseInt(fontSizeExtraLargeRadio.value));
    }

    private update(): void {
        const radioBtns: HTMLInputElement[] = Array.from(this.shadowRoot.querySelectorAll<HTMLInputElement>('input[name="font-size"]'));
        radioBtns.forEach((radio: HTMLInputElement) => {
            if (radio.value === this.fontSize.toString()) radio.checked = true;
        });
    }
}

customElements.define('app-settings-font-size', SettingsFontSizeComponent);