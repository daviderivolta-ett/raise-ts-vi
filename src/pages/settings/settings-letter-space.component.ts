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
            <div class="component">
                <h2>Spaziatura testo</h2>
                <label for="letter-space">Spaziatura testo</label>
                <input type="range" id="letter-space" name="letter-spacing" min="0" max="100" list="letter-space-values" value="0">
                <datalist id="letter-space-values">
                    <option value="0"></option>
                    <option value="25"></option>
                    <option value="50"></option>
                    <option value="75"></option>
                    <option value="100"></option>
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
        const dataList = Array.from(this.shadowRoot.querySelectorAll<HTMLDataElement>('#letter-space-values option')).map(option => parseFloat(option.value));
        if (!rangeInput || !dataList) return;

        rangeInput.addEventListener('input', () => {
            let currentValue: number = parseFloat(rangeInput.value);
            const nearest: number = dataList.reduce((prev, curr) => {
                return (Math.abs(curr - currentValue) < Math.abs(prev - currentValue) ? curr : prev);
            });
            currentValue = nearest;
            rangeInput.value = currentValue.toString();
            this.letterSpace = currentValue / 100;
        });

    }

    private update(): void {     
        const slider: HTMLInputElement | null = this.shadowRoot.querySelector('input[type="range"]');
        if (slider) slider.value = (this.letterSpace * 100).toString();
    }
}

customElements.define('app-settings-letter-space', SettingsLetterSpaceComponent);