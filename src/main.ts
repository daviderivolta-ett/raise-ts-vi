// Models
import { Route, RouteType } from './models/route.model';

// Components
import './components/router.component';
import './components/loader.component';
import './pages/categories/categories.page';
import './pages/around-you/around-you.page';
import './pages/custom-path/custom-path.page';
import './pages/suggested-paths/suggested-paths.page';
import './pages/selected-suggested-path/selected-suggested-path.page';
import './pages/poi/poi.page';
import './pages/settings/settings.page';
import './components/snackbar.component';
import './components/bar.component';
import './components/home.component';

// Classes
import { Router } from './components/router.component';
import { SettingService } from './services/setting.service';
import { PathService } from './services/path.service';
import { LayerService } from './services/layer.service';
import { BarComponent } from './components/bar.component';

// Saved data
PathService.instance.getSavedCustomPath();
LayerService.instance.getSavedLayers();

// Routing
const router: Router = document.querySelector('app-router') as Router;
const categoriesRoute: Route = new Route('categories', RouteType.Default, () => '<page-categories />');
const aroundYouRoute: Route = new Route('around-you', RouteType.Page, () => '<page-around-you />');
const settingsRoute: Route = new Route('settings', RouteType.Page, () => '<page-settings />');
const poiRoute: Route = new Route('poi', RouteType.Page, () => '<page-poi />');
const customPathRoute: Route = new Route('custom-path', RouteType.Page, () => '<page-custom-path />');
const suggestedPathsRoute: Route = new Route('suggested-paths', RouteType.Page, () => '<page-suggested-paths />');
const suggestedPathRoute: Route = new Route('selected-suggested-path', RouteType.Page, () => '<page-selected-suggested-path />');

const routes: Route[] = [categoriesRoute, aroundYouRoute, settingsRoute, poiRoute, customPathRoute, suggestedPathsRoute, suggestedPathRoute];
router.addRoutes(routes);

// Settings
SettingService.instance.getLocalStorageSettings();

const bar: BarComponent | null = document.querySelector('app-bar');
if (bar) bar.showSettings = SettingService.instance.settings.showSettings;