import {Route, Routes} from '@angular/router';

const home: Route = {
  path: '',
  loadComponent: () => import('./pages/home').then(mod => mod.HomePageComponent),
}

export const appRoutes: Routes = [
  home,
];
