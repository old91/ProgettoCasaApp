import {NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { PreviewComponent } from './steps/preview/preview.component';
import { Step1Component } from './steps/step1/step1.component';
import { Step2Component } from './steps/step2/step2.component';
import { Step3Component } from './steps/step3/step3.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'create',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'step1'
      },
      {
        path: 'step1',
        component: Step1Component
      },
      {
        path: 'step2',
        component: Step2Component
      },
      {
        path: 'step3',
        component: Step3Component
      },
      {
        path: 'preview',
        component: PreviewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartamentRoutingModule { }
