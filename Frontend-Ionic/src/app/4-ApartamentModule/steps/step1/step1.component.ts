import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApartamentsService } from 'src/app/Services/apartaments.service';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/Services/admin.service';
import { ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { Apartament } from 'src/app/Models/apartament';



@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss'],
})

export class Step1Component implements OnInit, ViewWillLeave, ViewWillEnter {
  button:number;
  todayISODate:string;
  vendors:User;
  step1Form:FormGroup;
  draft:Apartament;
  typeArray = ['Appartamento', 'Appartamento a Schiera','Casa Abbinata','Casa Singola','Rustico','Villetta a Schiera'];
  floorArray = ['Piano Terra', 'Piano Rialzato', 'Ultimo Piano', 'Attico', '2° Piano','3° Piano','4° Piano','5° Piano','6° Piano','7° Piano','8° Piano','9° Piano','10° Piano','11° Piano'];
  localArray = ['Monolocale', 'Bilocale', 'Trilocale', 'Quadrilocale', '5','6','7'];
  cityArray = ['Rimini','Riccione'];
  macroArray = ['San Giuliano', 'Centro Storico'];
  microArray = ['Borgo', 'p.za'];
  yearsArray = [];
  constructor(
    private apartService:ApartamentsService,
    private formBuilder:FormBuilder,
    private adminService:AdminService
  ){ 
    this.draft=this.apartService.apartament;
    this.step1Form = this.formBuilder.group({
      title: [this.draft.title],
      agent: [this.draft.agent],
      date: [this.draft.date],
      city: [this.draft.city],
      macro: [this.draft.macro],
      micro: [this.draft.micro],
      type: [this.draft.type],
      renovate: [(this.draft.renovate)?this.draft.renovate:false],
      floor: [this.draft.floor],
      floors: [this.draft.floors,Validators.max(127)],
      apartaments: [this.draft.apartaments,Validators.max(127)],
      fees: [this.draft.fees],
      year: [this.draft.year],
      locals: [this.draft.locals],
      bedrooms: [this.draft.bedrooms,Validators.max(127)],
      bathrooms: [this.draft.bathrooms,Validators.max(127)],
      surface: [this.draft.surface],
      terrace: [(this.draft.terrace)?this.draft.terrace:false],
      balcony: [(this.draft.balcony)?this.draft.balcony:false],
      garage: [(this.draft.garage)?this.draft.garage:false],
      parking: [(this.draft.parking)?this.draft.parking:false],
      cellar: [(this.draft.cellar)?this.draft.cellar:false],
      garden: [(this.draft.garden)?this.draft.garden:false],
      price: [this.draft.price],
      estimate: [this.draft.estimate]
    })
  }
  buttonClick(numberBtn:number){
    (this.button==numberBtn)?this.button=0:this.button=numberBtn;
  }
  ngOnInit() {
    this.todayISODate = new Date().toISOString().substring(0,10);
    this.vendors = this.adminService.dataUsers;
    for (let i = 0; i < 155; i++) {
      this.yearsArray.push(1901+i);
    }
  }
  // array;

  ionViewWillLeave(){
    Object.entries(this.step1Form.value).forEach(
      el => this.apartService.apartament[el[0]] = el[1]
    );
  }
  // a;
  ionViewWillEnter(){
    this.apartService.step = 1;
  }

  ngOnDestroy(){
    this.apartService.apartament = new Apartament;
  }
}
