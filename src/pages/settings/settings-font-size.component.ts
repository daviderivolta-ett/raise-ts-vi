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
                <label for="text-size">Dimensione testo</label>
                <input type="range" id="text-size" name="text-size" min="16" max="48" list="font-size-values" value="${this.fontSize}">
                <datalist id="font-size-values">
                    <option value="16"></option>
                    <option value="24"></option>
                    <option value="36"></option>
                    <option value="48"></option>
                </datalist>
            </div>

            <style>
                h2,
                p {
                    font-weight: 400;
                    margin: 0;
                }

                .settings-title {
                    text-align: center;
                    font-size: 1rem;
                }
            </style>
            `
            ;
    }

    private setup(): void {
        this.handleSlider();
    }

    private handleSlider(): void {
        const rangeInput: HTMLInputElement | null = this.shadowRoot.querySelector('input[type="range"]');
        const dataList = Array.from(this.shadowRoot.querySelectorAll<HTMLDataElement>('#font-size-values option')).map(option => parseFloat(option.value));
        if (!rangeInput || !dataList) return;
                
        rangeInput.addEventListener('input', () => {
            let currentValue: number = parseFloat(rangeInput.value);
            const nearest: number = dataList.reduce((prev, curr) => {
                return (Math.abs(curr - currentValue) < Math.abs(prev - currentValue) ? curr : prev);
            });
            currentValue = nearest;
            rangeInput.value = currentValue.toString();
            this.fontSize = currentValue;
        });

    }

    private update(): void {              
        const slider: HTMLInputElement | null = this.shadowRoot.querySelector('input[type="range"]');
        if (slider) slider.value = this.fontSize.toString();
    }
}

customElements.define('app-settings-font-size', SettingsFontSizeComponent);