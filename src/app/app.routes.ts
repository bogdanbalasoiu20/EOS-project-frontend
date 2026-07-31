import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { Search } from './search/search';
import { Mytasks } from './mytasks/mytasks';
import { LoginComponent } from './login-component/login-component';
import { LoggedInGuard } from '../services/logged-in-guard';
import { guestGuard } from '../services/guest.guard';
import { Admin } from './admin/admin';
import { AdminGuard } from '../services/admin.guard';
import { MyTeams } from './my-teams/my-teams';
import { TeamDetails } from './team-details/team-details';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent, canActivate: [guestGuard] }, //daca sunt deja logat nu pot accesa pagina de login

  { path: 'home', component: Homepage },
  { path: 'mytasks', component: Mytasks, canActivate: [LoggedInGuard] },  //nu pot accesa pagina mytasks daca nu sunt logat
  { path: 'search', component: Search, canActivate: [LoggedInGuard] },
  {path: 'myteams',component: MyTeams,canActivate: [LoggedInGuard]},
  {path: 'myteams/:teamId',component: TeamDetails,canActivate: [LoggedInGuard]},

  {path: 'admin', component: Admin, canActivate:[AdminGuard]}, //pagina de admin poate fi accesata doar de userii cu rolul ADMIN

  { path: '**', redirectTo: '/login' }
];
