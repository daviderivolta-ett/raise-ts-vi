export class LoaderComponent extends HTMLElement {
    public shadowRoot: ShadowRoot;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public connectedCallback(): void {
        this.render();
    }

    private render(): void {
        this.shadowRoot.innerHTML =
            `
            <div class="loader">
                <div id="loader-spin"></div>
                <p class="loader-text">Caricamento...</p>
            </div>

            <style>
                .loader {
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 100dvh;
                    width: 100vw;
                    background-color: var(--surface-container);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                #loader-spin {
                    position: absolute;
                    bottom: 24px;
                    width: 32px;
                    height: 32px;
                    margin: 16px;
                    border-radius: 50%;
                    animation: rotate 1s linear infinite
                }
                
                #loader-spin::before {
                    content: "";
                    box-sizing: border-box;
                    position: absolute;
                    inset: 0px;
                    border-radius: 50%;
                    border: 3px solid var(--on-surface);
                    animation: prixClipFix 2s linear infinite;
                }
                
                @keyframes rotate {
                    100% {
                        transform: rotate(360deg)
                    }
                }
                
                @keyframes prixClipFix {
                    0% {
                        clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0)
                    }
                
                    25% {
                        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0)
                    }
                
                    50% {
                        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%)
                    }
                
                    75% {
                        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%)
                    }
                
                    100% {
                        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0)
                    }
                }
            </style>
            `
            ;
    }
}

customElements.define('app-loader', LoaderComponent);