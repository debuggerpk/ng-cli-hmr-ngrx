import { Routes } from '@angular/router';

import { SearchComponent } from './components/search/search.component';
import { DetailComponent } from './components/detail/detail.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/search',
    pathMatch: 'full'
    // component: SearchComponent
  }, {
    path: 'country/:id',
    component: DetailComponent
  }, {
    path: 'search',
    component: SearchComponent,
  }
];
