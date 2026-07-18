import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { Search } from './search/search';
import { Mytasks } from './mytasks/mytasks';
import { LoginComponent } from './login-component/login-component';
import { LoggedInGuard } from '../services/logged-in-guard';

export const routes: Routes = [
    {path:'home', component: Homepage, canActivate: [LoggedInGuard]},
    {path:'mytasks', component: Mytasks, canActivate: [LoggedInGuard]},
    {path:'search', component: Search, canActivate: [LoggedInGuard]},
    { path: 'login', component: LoginComponent},
    // {path:'about', component:AboutComponent},
    // {path:'', redirectTo:'/home',pathMatch:'full'},
    // {path:'**',component:NotFoundComponent}
];
