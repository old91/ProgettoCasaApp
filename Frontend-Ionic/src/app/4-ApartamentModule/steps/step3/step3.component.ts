import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ViewWillLeave } from '@ionic/angular';
import { ApartamentsService } from 'src/app/Services/apartaments.service';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss'],
})
export class Step3Component implements OnInit, ViewWillLeave {
  step3Form:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private apartService:ApartamentsService
    ){
    this.step3Form = this.formBuilder.group({
      description: [this.apartService.apartament.description]
    });
  }

  ngOnInit() {
  }

  ionViewWillLeave(){
    this.apartService.apartament.description = this.step3Form.value.description;
  }

  ionViewWillEnter(){
    this.apartService.step = 3;
  }

}
