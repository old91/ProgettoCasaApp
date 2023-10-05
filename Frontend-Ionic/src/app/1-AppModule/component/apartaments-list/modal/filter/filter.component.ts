import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, ToastController} from '@ionic/angular';
import { Apartament } from 'src/app/models/apartament';
import { FilterService } from 'src/app/Services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit{
  minSurface:any;
  maxSurface:any;
  minPrice:any;
  maxPrice:any;
  filtersForm:FormGroup;
  filter:FormGroup;
  @Input() list:Apartament[];
  @Input() favorite:boolean;

  //creiamo il form, se sono presenti valori nella variabile filter allora li impostiamo come predefiniti
  constructor(private formBuilder:FormBuilder, private modalController:ModalController, private toastController:ToastController, private filterService:FilterService) { 
    this.filter = (this.favorite)?this.filterService.favoriteFilter:this.filterService.apartamentsFilter;
    this.filtersForm = this.formBuilder.group({
      city: [(this.filter)?this.filter['city']:null],
      macro: [(this.filter)?this.filter['macro']:null],
      type: [(this.filter)?this.filter['type']:null],
      renovate: [(this.filter)?this.filter['renovate']:null],
      floor: [(this.filter)?this.filter['floor']:null],
      locals: [(this.filter)?this.filter['locals']:null],
      bedrooms: [(this.filter)?this.filter['bedrooms']:null],
      bathrooms: [(this.filter)?this.filter['bathrooms']:null],
      surface: [(this.filter)?this.filter['surface']:{lower:0,upper:150}],
      garden: [(this.filter)?this.filter['garden']:null],
      garage: [(this.filter)?this.filter['garage']:null],
      parking: [(this.filter)?this.filter['parking']:null],
      cellar: [(this.filter)?this.filter['cellar']:null],
      price: [(this.filter)?this.filter['price']:{lower:0,upper:800}],
    })
  }
  //all'init settiamo i valori per gli ion-range predefiniti CONTROLLARE SE SERVE
  ngOnInit() {
    this.minSurface = 0;
    this.maxSurface = 150;
    this.minPrice = 0+'k';
    this.maxPrice = 800+'k';
  }

  //funzione usata per modificare i valori limiti dinamicamente, quando l'utente li raggiunge
  setSurfaceRange(event){
    //l'if è stato messo perchè chiudendo e riaprendo il modal, si attiva l'evento e assegnava i valori NaN
    if(!isNaN(event.detail.value.lower)){
      this.minSurface = event.detail.value.lower==150?'150+':event.detail.value.lower;
      this.maxSurface = event.detail.value.upper==150?'150+':event.detail.value.upper;
    }
  }
  setPriceRange(event){
    if(!isNaN(event.detail.value.lower)){
      this.minPrice = event.detail.value.lower==800?'800k+':event.detail.value.lower+'k';
      this.maxPrice = event.detail.value.upper==800?'800k+':event.detail.value.upper+'k';
    }
  }

  //avvio del filtraggio se il risultato ottenuto non è vuoto chiudiamo il modale altrimenti lanciamo il toast
  Search(value:FormGroup){
    let newList = this.filterService.filterApartaments(value, this.list);
    this.dismissModal(newList,value);
  }

  dismissModal(list:Apartament[], filter:FormGroup){
    if(this.favorite){
      this.filterService.favoriteFilter = filter;
      this.filterService.favoritesList = list;
    }else{
      this.filterService.apartamentsFilter = filter;
      this.filterService.apartamentsList = list;
    }
    this.modalController.dismiss({
      'list': list,
    })
  }

  //funzione per chiudere il modale
  closeModal(){
    this.modalController.dismiss()
  }

  //funzione per resettare il modale
  resetForm(){
    this.filtersForm.reset({surface:{lower:0,upper:150}, price:{lower:0,upper:800}})
  }
}
