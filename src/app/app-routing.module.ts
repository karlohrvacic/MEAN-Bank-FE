import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./auth/register/register.component";
import {LoginComponent} from "./auth/login/login.component";
import {AdminDashboardModule} from "./admin-dashboard/admin-dashboard.module";
import {AdminGuard} from "./shared/guards/admin.guard";
import {UserGuard} from "./shared/guards/user.guard";
import {UserSpaceModule} from "./user-space/user-space.module";
import {Error404Component} from "./shared/error404/error404.component";

const routes: Routes = [
  {path:'register', component : RegisterComponent},
  {path:'login', component : LoginComponent},
  {path:'admin', loadChildren: () => AdminDashboardModule, canActivate : [AdminGuard]},
  {path:'', loadChildren: () => UserSpaceModule, canActivate : [UserGuard]},
  {path:'*', component: Error404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: false, onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
