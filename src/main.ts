// import './style.scss';
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

// Models
import { Route, RouteType } from './models/route.model';

// Components
import './components/router.component';
import './components/loader.component';
import './pages/categories/categories.page';
import './pages/around-you/around-you.page';
import './pages/settings/settings.page';
import './pages/poi/poi.page';
import './pages/custom-path/custom-path.page';
import './components/snackbar.component';
import './components/menu-btn.component';
import './components/menu.component';

// Classes
import { Router } from './components/router.component';
import { SettingService } from './services/setting.service';
import { PathService } from './services/path.service';

// Settings
SettingService.instance.getLocalStorageSettings();

// Saved data
PathService.instance.getSavedCustomPath();

// Routing
const router: Router = document.querySelector('app-router') as Router;
const categoriesRoute: Route = new Route('categories', RouteType.Default, () => '<page-categories />');
const aroundYouRoute: Route = new Route('around-you', RouteType.Page, () => '<page-around-you />');
const settingsRoute: Route = new Route('settings', RouteType.Page, () => '<page-settings />');
const poiRoute: Route = new Route('poi', RouteType.Page, () => '<page-poi />');
const customPathRoute: Route = new Route('custom-path', RouteType.Page, () => '<page-custom-path />');

const routes: Route[] = [categoriesRoute, aroundYouRoute, settingsRoute, poiRoute, customPathRoute];
router.addRoutes(routes);