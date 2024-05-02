// import './style.scss';
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

// Models
import { Route, RouteType } from './models/route.model';

// Components
import './components/router.component';
import './pages/categories/categories.page';
import './pages/around-you/around-you.page';
import './pages/settings/settings.page';

// Classes
import { Router } from './components/router.component';
import { SettingService } from './services/setting.service';

// Routing
const router: Router = document.querySelector('app-router') as Router;
const categoriesRoute: Route = new Route('categories', RouteType.Default, () => '<page-categories />');
const aroundYouRoute: Route = new Route('around-you', RouteType.Page, () => '<page-around-you />');
const settingsRoute: Route = new Route('settings', RouteType.Page, () => '<page-settings />');

const routes: Route[] = [categoriesRoute, aroundYouRoute, settingsRoute];
router.addRoutes(routes);

// Settings
SettingService.instance.getLocalStorageSettings();