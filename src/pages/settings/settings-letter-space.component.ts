export class SettingsLetterSpaceComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;
    private _letterSpace: number = 0;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public get letterSpace(): number {
        return this._letterSpace;
    }

    public set letterSpace(letterSpace: number) {
        this._letterSpace = letterSpace;
        this.update();
        this.dispatchEvent(new CustomEvent('letter-space-updated', { detail: { letterSpace: this.letterSpace } }));
    }

    public connectedCallback(): void {
        this.render();
        this.setup();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <div class="settings-letter-space">
                <h2 class="settings-title">Spaziatura testo</h2>
                <div class="letter-space-option-list">
                    <div class="letter-space-option">
                        <input type="radio" id="letter-space-s" name="letter-spacing" value="0">
                        <label for="letter-space-s" aria-label="Spaziatura testo: S">S</label>
                    </div>
                    <div class="letter-space-option">
                        <input type="radio" id="letter-space-m" name="letter-spacing" value="25">
                        <label for="letter-space-m" aria-label="Spaziatura testo: M">M</label>
                    </div>
                    <div class="letter-space-option">
                        <input type="radio" id="letter-space-l" name="letter-spacing" value="50">
                        <label for="letter-space-l" aria-label="Spaziatura testo: L">L</label>
                    </div>
                    <div class="letter-space-option">
                        <input type="radio" id="letter-space-xl" name="letter-spacing" value="75">
                        <label for="letter-space-xl" aria-label="Spaziatura testo: XL">XL</label>
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

                .letter-space-option-list {
                    display: flex;
                    flex-wrap: wrap;
                }

                .letter-space-option {
                    cursor: pointer;
                    width: calc(50% - 16px);
                    min-height: 80px;
                    margin: 8px;
                    position: relative;
                }

                .letter-space-option label {
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
        const letterSpaceSmallRadio: HTMLInputElement | null = this.shadowRoot.querySelector('#letter-space-s');
        const letterSpaceMediumRadio: HTMLInputElement | null = this.shadowRoot.querySelector('#letter-space-m');
        const letterSpaceLargeRadio: HTMLInputElement | null = this.shadowRoot.querySelector('#letter-space-l');
        const letterSpaceExtraLargeRadio: HTMLInputElement | null = this.shadowRoot.querySelector('#letter-space-xl');

        if (!letterSpaceSmallRadio || !letterSpaceMediumRadio || !letterSpaceLargeRadio || !letterSpaceExtraLargeRadio) return;

        letterSpaceSmallRadio.addEventListener('change', () => this.letterSpace = parseInt(letterSpaceSmallRadio.value) / 100);
        letterSpaceMediumRadio.addEventListener('change', () => this.letterSpace = parseInt(letterSpaceMediumRadio.value) / 100);
        letterSpaceLargeRadio.addEventListener('change', () => this.letterSpace = parseInt(letterSpaceLargeRadio.value) / 100);
        letterSpaceExtraLargeRadio.addEventListener('change', () => this.letterSpace = parseInt(letterSpaceExtraLargeRadio.value) / 100);
    }

    private update(): void {
        const radioBtns: HTMLInputElement[] = Array.from(this.shadowRoot.querySelectorAll<HTMLInputElement>('input[name="letter-spacing"]'));
        radioBtns.forEach((radio: HTMLInputElement) => {            
            if (radio.value === (this.letterSpace * 100).toString()) radio.checked = true;
        });
    }
}

customElements.define('app-settings-letter-space', SettingsLetterSpaceComponent);