import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ApartamentEditComponent } from './apartament-edit/apartament-edit.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserHomeComponent } from './user-home/user-home.component';
import { IonicModule } from '@ionic/angular';
import { FirstAccessComponent } from './first-access/first-access.component';
import { SaveDeviceComponent } from './save-device/save-device.component';


@NgModule({
  declarations: [
    ApartamentEditComponent,
    UserEditComponent,
    UserHomeComponent,
    FirstAccessComponent,
    SaveDeviceComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    IonicModule,
    FormsModule

  ],
  providers: [
    FormBuilder
  ]
})
export class UserModule { }