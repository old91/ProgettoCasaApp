import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Apartament } from 'src/app/Models/apartament';
import { FilterService } from 'src/app/Services/filter.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  orderForm:FormGroup
  @Input() apartaments:Apartament[];
  constructor(private formBuilder:FormBuilder,private modalController:ModalController, private filter:FilterService) { 
    this.orderForm = this.formBuilder.group({
      date: [(this.filter.orderValue)?this.filter.orderValue['date']:'cre-date'],
      price: [(this.filter.orderValue)?this.filter.orderValue['price']:'no-price'],
      surface: [(this.filter.orderValue)?this.filter.orderValue['surface']:'no-surface'],
    })
  }
  Search(value:FormGroup){
    const array = Object.entries(value);
    array.forEach(e =>{
      if(!e[1].includes('no')){    
        this.apartaments = this.apartaments.sort((a,b)=>{
          let order = (e[1].includes('cre'))?[a,b]:[b,a];
          switch(e[0]){
            case 'date':
              let date1 = new Date( order[0].created_at);
              let date2 = new Date (order[1].created_at);
              return date2.getTime() - date1.getTime();
            case 'price':
              return order[0].price-order[1].price;
            case 'surface':
              return order[0].surface-order[1].surface;
            default:
          }
        })
      }
    })
    this.dismissModal();
  }

  dismissModal(){
    this.filter.orderValue = this.orderForm.value
    this.modalController.dismiss({
      'apartaments': this.apartaments,
    })
  }
  
  closeModal(){
    this.modalController.dismiss()
  }


  ngOnInit() {}

}
