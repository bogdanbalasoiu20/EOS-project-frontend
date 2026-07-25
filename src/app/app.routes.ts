import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { Search } from './search/search';
import { Mytasks } from './mytasks/mytasks';
import { LoginComponent } from './login-component/login-component';
import { LoggedInGuard } from '../services/logged-in-guard';
import { guestGuard } from '../services/guest.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent, canActivate: [guestGuard] }, //daca sunt deja logat nu pot accesa pagina de login

  { path: 'home', component: Homepage },
  { path: 'mytasks', component: Mytasks, canActivate: [LoggedInGuard] },  //nu pot accesa pagina mytasks daca nu sunt logat
  { path: 'search', component: Search, canActivate: [LoggedInGuard] },

  { path: '**', redirectTo: '/login' }
];
