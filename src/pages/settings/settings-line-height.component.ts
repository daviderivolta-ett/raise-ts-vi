export class SettingsLineHeightComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _lineHeight: number = 1.15;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public get lineHeight(): number {
        return this._lineHeight;
    }

    public set lineHeight(lineHeight: number) {
        this._lineHeight = lineHeight;        
        this.update();
        this.dispatchEvent(new CustomEvent('line-height-updated', { detail: { lineHeight: this.lineHeight } }));
    }

    public connectedCallback(): void {
        this.render();
        this.setup();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <div class="settings-line-height">
                <h2 class="settings-title">Altezza testo</h2>
                <div class="line-height-option-list">
                    <div class="line-height-option">
                        <input type="radio" id="line-height-s" name="line-height" value="115">
                        <label for="line-height-s" aria-label="Altezza testo: S">S</label>
                    </div>
                    <div class="line-height-option">
                        <input type="radio" id="line-height-m" name="line-height" value="150">
                        <label for="line-height-m" aria-label="Altezza testo: M">M</label>
                    </div>
                    <div class="line-height-option">
                        <input type="radio" id="line-height-l" name="line-height" value="175">
                        <label for="line-height-l" aria-label="Altezza testo: L">L</label>
                    </div>
                    <div class="line-height-option">
                        <input type="radio" id="line-height-xl" name="line-height" value="200">
                        <label for="line-height-xl" aria-label="Altezza testo: XL">XL</label>
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

                .line-height-option-list {
                    display: flex;
                    flex-wrap: wrap;
                }

                .line-height-option {
                    cursor: pointer;
                    width: calc(50% - 16px);
                    min-height: 80px;
                    margin: 8px;
                    position: relative;
                }

                .line-height-option label {
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
        const lineHeightSmallRadio: HTMLInputElement | null = this.shadowRoot.querySelector('#line-height-s');
        const lineHeightMediumRadio: HTMLInputElement | null = this.shadowRoot.querySelector('#line-height-m');
        const lineHeightLargeRadio: HTMLInputElement | null = this.shadowRoot.querySelector('#line-height-l');
        const lineHeightExtraLargeRadio: HTMLInputElement | null = this.shadowRoot.querySelector('#line-height-xl');

        if (!lineHeightSmallRadio || !lineHeightMediumRadio || !lineHeightLargeRadio || !lineHeightExtraLargeRadio) return;

        lineHeightSmallRadio.addEventListener('change', () => this.lineHeight = parseInt(lineHeightSmallRadio.value) / 100);
        lineHeightMediumRadio.addEventListener('change', () => this.lineHeight = parseInt(lineHeightMediumRadio.value) / 100);
        lineHeightLargeRadio.addEventListener('change', () => this.lineHeight = parseInt(lineHeightLargeRadio.value) / 100);
        lineHeightExtraLargeRadio.addEventListener('change', () => this.lineHeight = parseInt(lineHeightExtraLargeRadio.value) / 100);
    }

    private update(): void {
        const radioBtns: HTMLInputElement[] = Array.from(this.shadowRoot.querySelectorAll<HTMLInputElement>('input[name="line-height"]'));
        radioBtns.forEach((radio: HTMLInputElement) => {           
            if (radio.value === Math.round(this.lineHeight * 100).toString()) radio.checked = true;
        });
    }
}

customElements.define('app-settings-line-height', SettingsLineHeightComponent);