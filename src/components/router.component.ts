import { Route } from '../models/route.model';
import { Contrast, Settings } from '../models/settings.model';
import { GoogleAuthService } from '../services/google-auth.service';
import { SettingService } from '../services/setting.service';
import { SnackbarService } from '../services/snackbar.service';

export class Router extends HTMLElement {
    public shadowRoot: ShadowRoot;
    public routes: Route[] = [];

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
    }

    public connectedCallback(): void {
        window.addEventListener('hashchange', (): void => {
            this.checkRoute();
        });
    }

    public addRoutes(routes: Route[]) {
        this.routes = [...routes];
        this.checkRoute();
    }

    private checkRoute(): void {
        const hash: string = window.location.hash.slice(2) || 'categories';
        this.changeRoute(hash);
    }

    private changeRoute(hash: string): void {
        SnackbarService.instance.resetSnackbar();

        const route: Route | undefined = this.routes.find((r: Route) => r.url === hash);        

        const auth = GoogleAuthService.instance.checkAuth();

        // if (!auth) {
        //     window.location.href = '/';
        //     return;
        // }
        
        this.checkParams(window.location.search);

        if (!route) {
            window.location.hash = '#/categories';
            return;
        }

        this.shadowRoot.innerHTML = route.routing();
    }

    private checkParams(search: string): void {        
        const params = new URLSearchParams(search);
        const settings: Settings = new Settings();
        let paramsProcessed = false;

        params.forEach((value: string) => {
            paramsProcessed = true;
            switch (value) {
                case 'blind':
                    settings.showSettings = false;
                    break;
                case 'vi':
                    settings.fontSize = 24;
                    settings.contrast = Contrast.DarkHigh;
                    break;
                case 'fine-motor':
                    settings.fontSize = 24;
                    break;
                case 'color-blindness':
                    settings.contrast = Contrast.DarkHigh;
                    break;
                default:
                    break;
            }
        });

        if (paramsProcessed) {
            const newUrl = window.location.pathname + window.location.hash;
            history.replaceState(null, '', newUrl);
        }

        SettingService.instance.settings = { ...settings };
    }
}

customElements.define('app-router', Router);