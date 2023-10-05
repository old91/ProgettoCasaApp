import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../Services/auth-guard.service';
import { ApartamentEditComponent } from './apartament-edit/apartament-edit.component';
import { FirstAccessComponent } from './first-access/first-access.component';
import { SaveDeviceComponent } from './save-device/save-device.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserHomeComponent } from './user-home/user-home.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: UserHomeComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'first-access',
        component: FirstAccessComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'save-device',
        component: SaveDeviceComponent
    },
    {
        path: 'apartament',
        loadChildren: () => import('../4-ApartamentModule/apartament.module').then( m => m.ApartamentModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'edit',
        component: ApartamentEditComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'change/:value',
        component: UserEditComponent,
        canActivate: [AuthGuardService]
    }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }