import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { Search } from './search/search';
import { Mytasks } from './mytasks/mytasks';

export const routes: Routes = [
    {path:'home', component: Homepage},
    {path:'mytasks', component: Mytasks},
    {path:'search', component: Search},
    // {path:'about', component:AboutComponent},
    // {path:'', redirectTo:'/home',pathMatch:'full'},
    // {path:'**',component:NotFoundComponent}
];
