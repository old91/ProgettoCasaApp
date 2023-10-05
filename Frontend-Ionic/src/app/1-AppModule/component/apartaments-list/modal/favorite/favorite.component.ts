import { Component, Input, OnInit } from '@angular/core';
// import { FormGroup } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Apartament } from 'src/app/Models/apartament';
import { FilterService } from 'src/app/Services/filter.service';
// import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  filterList;
  showDetail:number;
  Filter={ 
    'bathrooms':'bagni',
    'bedrooms':'camere',
    'cellar':'cantina',
    'city':'città',
    'plans':'piano',
    'garage':'garage',
    'garden':'giardino',
    'locals':'locali',
    'macro':'zona',
    'parking':'posti auto',
    'price': 'prezzo',
    'surface': 'superficie',
    'renovate': 'da rinnovare',
    'type': 'tipo',
    'title': 'titolo'
  };
  @Input() list:Apartament[];
  @Input() favorite:boolean;

  constructor(private filterService:FilterService, private modalController:ModalController, private alertController:AlertController) {}

  ngOnInit() {
    this.filterList = this.setList()
  }

  setList(){
    let listA = [];
    let listB = [];
    let listC = [];
    this.filterService.dataFilters.forEach(a => {
      listA.push(Object.entries(a)); //trasformiamo in array l'oggetto
    })
    listA.forEach( e => {
      listB.push(e.filter( e2 => e2[1]!=null)); //da ogni elemento filtri rimuoviamo gli elementi con valori null
    })
    listB.forEach( (e,i) => { //per ogni elemento andiamo a cambiare il nome con il corrispettivo italiano
      listC.push([[]]);
      e.forEach( (e2) =>{
        if(e2[0]=='price' || e2[0]=='surface'){ //se il valore è surface o price andiamo a dividere i valori max con i min
          listC[i][0].push([this.Filter[e2[0]]+' max',e2[1].upper]);
          listC[i][0].push([this.Filter[e2[0]]+' min',e2[1].lower]);
        }else{
          if(Array.isArray(e2[1])){ //controlliamo se la voce ha risultati multipli
            e2[1].forEach( e3=>{
              listC[i][0].push([this.Filter[e2[0]],e3])//nel caso per ogni risultato creiamo una voce
            })
          }else if(e2[0]!='title'){
            listC[i][0].push([this.Filter[e2[0]],e2[1]])//se non è titolo lo aggiungiamo all'array
          }else{
            listC[i].push([this.Filter[e2[0]],e2[1]])//se è il titolo lo inseriamo come secondo elemento
          }
        }
      })
    })
    return listC;
  }

  getDetail(i){
    (this.showDetail==i+1)?this.showDetail=0:this.showDetail=i+1
  }

  async deleteAlert(i){
    const alert = await this.alertController.create({
      header: 'Elimina Filtro',
      message: 'Vuoi eliminare il filtro corrente dai favoriti?',
      buttons: [
        {
          text: 'Conferma',
          handler: () => {
            this.filterService.rmvFilter(i);
            this.ngOnInit()
          }
        },
        {
          text: 'Cancella',
        }
      ]
    });
    await alert.present();
  }
  search(i){
    let newFilter = this.filterService.dataFilters[i];
    let newList = this.filterService.filterApartaments(newFilter,this.list);
    if(this.favorite){
      this.filterService.favoriteFilter = newFilter;
      this.filterService.favoritesList = newList;
    }else{
      this.filterService.apartamentsFilter = newFilter;
      this.filterService.apartamentsList = newList;
    }
    this.modalController.dismiss({
      'list': newList,
    })
  }

  closeModal(){
    this.modalController.dismiss()
  }
}
