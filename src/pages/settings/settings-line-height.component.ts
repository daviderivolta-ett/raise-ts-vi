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
            <div class="component">
                <h2>Altezza testo</h2>
                <label for="line-height">Spaziatura testo</label>
                <input type="range" id="line-height" name="line-height" min="115" max="200" list="line-height-values" value="115">
                <datalist id="line-height-values">
                    <option value="115"></option>
                    <option value="125"></option>
                    <option value="150"></option>
                    <option value="175"></option>
                    <option value="200"></option>
                </datalist>
            </div>
            `
            ;
    }

    private setup(): void {
        this.handleSlider();
    }

    private handleSlider(): void {
        const rangeInput: HTMLInputElement | null = this.shadowRoot.querySelector('input[type="range"]');
        const dataList = Array.from(this.shadowRoot.querySelectorAll<HTMLDataElement>('#line-height-values option')).map(option => parseFloat(option.value));
        if (!rangeInput || !dataList) return;

        rangeInput.addEventListener('input', () => {
            let currentValue: number = parseFloat(rangeInput.value);
            const nearest: number = dataList.reduce((prev, curr) => {
                return (Math.abs(curr - currentValue) < Math.abs(prev - currentValue) ? curr : prev);
            });
            currentValue = nearest;
            rangeInput.value = currentValue.toString();
            this.lineHeight = currentValue / 100;
        });
    }

    private update(): void {     
        const slider: HTMLInputElement | null = this.shadowRoot.querySelector('input[type="range"]');
        if (slider) slider.value = (this.lineHeight * 100).toString();
    }
}

customElements.define('app-settings-line-height', SettingsLineHeightComponent);