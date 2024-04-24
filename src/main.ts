// import './style.scss';
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

// Models
import { Route, RouteType } from './models/route.model';

// Components
import './components/router.component';
import './pages/settings/settings.page';
import './pages/around-you/around-you.page';

// Classes
import { Router } from './components/router.component';
import { SettingService } from './services/setting.service';

// Routing
const router: Router = document.querySelector('app-router') as Router;
const aroundYouRoute: Route = new Route('around-you', RouteType.Default, () => '<page-around-you />');
const settingsRoute: Route = new Route('settings', RouteType.Page, () => '<page-settings />');

const routes: Route[] = [aroundYouRoute, settingsRoute];
router.addRoutes(routes);

// Settings
SettingService.instance.getLocalStorageSettings();