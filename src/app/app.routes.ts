import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { Search } from './search/search';
import { Mytasks } from './mytasks/mytasks';
import { LoginComponent } from './login-component/login-component';
import { LoggedInGuard } from '../services/logged-in-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  { path: 'home', component: Homepage },
  { path: 'mytasks', component: Mytasks, canActivate: [LoggedInGuard] },
  { path: 'search', component: Search, canActivate: [LoggedInGuard] },

  { path: '**', redirectTo: '/login' }
];
