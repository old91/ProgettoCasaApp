import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApartamentRoutingModule } from './apartament-routing.module'
import { HomeComponent } from './home/home.component';
import { Step1Component } from './steps/step1/step1.component'
import { Step2Component } from './steps/step2/step2.component';
import { Step3Component } from './steps/step3/step3.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PreviewComponent } from './steps/preview/preview.component';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    PreviewComponent,
  ],
  imports: [
    CommonModule,
    ApartamentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SwiperModule
  ],
  providers: [

  ]
})
export class ApartamentModule { }

