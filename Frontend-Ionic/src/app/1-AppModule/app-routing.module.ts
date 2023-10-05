import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './Component/about/about.component';
import { ApartamentsListComponent } from './component/apartaments-list/apartaments-list.component';
import { ServicesComponent } from './Component/services/services.component';
import { WhereWeAreComponent } from './Component/where/where-we-are.component';
import { LoginComponent } from './Component/login/login.component';
import { ApartamentComponent } from './component/apartament/apartament.component';
import { AuthGuardService } from '../Services/auth-guard.service';
import { AdminGuardService } from '../Services/admin-guard.service';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: ApartamentsListComponent,
  },
  {
    path: 'favorite',
    component: ApartamentsListComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'where',
    component: WhereWeAreComponent
  },
  {
    path: 'services',
    component: ServicesComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'reset',
    component: ResetPasswordComponent
  },
  {
    path: 'apartament/:id',
    component: ApartamentComponent
  },
  {
    path: 'user',
    loadChildren: () => import('../2-UserModule/user.module').then(m => m.UserModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin',
    loadChildren: () => import('../3-AdminModule/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuardService, AdminGuardService]
  },
 
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
