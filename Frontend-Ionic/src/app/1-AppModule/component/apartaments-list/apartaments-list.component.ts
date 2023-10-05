import { Component,ElementRef,ViewChild,ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Apartament } from 'src/app/Models/apartament';
import { AlertService } from 'src/app/Services/alert.service';
import { ApartamentsService } from 'src/app/Services/apartaments.service';
import { FavService } from 'src/app/Services/fav.service';
import { FilterService } from 'src/app/Services/filter.service';
import Swiper from 'swiper';
import SwiperCore, { Pagination } from 'swiper';
import { FavoriteComponent } from './modal/favorite/favorite.component';
import { FilterComponent } from './modal/filter/filter.component';
import { OrderComponent } from './modal/order/order.component';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-apartaments-list',
  templateUrl: './apartaments-list.component.html',
  styleUrls: ['./apartaments-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ApartamentsListComponent{
  dataApartaments:Apartament[]; //variabile contenente la lista appartamenti che passiamo ai modali
  apartamentsList:Apartament[]; // lista appartamenti 
  modal:HTMLIonModalElement; // variabile per gestire l'apertura e chiusura dei modali
  data:boolean;// variabile usata per stoppare il fake template
  firstAccess:boolean = true; // variabile usata per far partire il fake temaplate;
  favoritesId:Array<number>;// array contente solo gli id dei preferiti
  favoritesList:Apartament[]; //arrayy contente gli appartamenti preferiti
  dataFavorites:Apartament[]; //array contente gli appartamenti preferiti che passiamo ai modali
  favorite:boolean; // valore usato per gestire se si è in home o in favorite
  activeFilter:boolean = false; //gestione filtri template

  constructor(
    private modalController:ModalController,
    private alert:AlertService,
    private router:Router,
    private fav:FavService,
    private apart:ApartamentsService,
    private filterService:FilterService,
    private alertController:AlertController,
    private toastController:ToastController,
  ) {}
 
  //all'accesso inizializziamo tutte le variabili, diamo tempo 2 secondi per permettere
  //il pieno caricamento del template
  ngOnInit(){
    this.dataApartaments = this.apart.dataApartaments;
    this.apartamentsList = (this.filterService.apartamentsList)?this.filterService.apartamentsList:this.apart.dataApartaments;
    this.favoritesId = this.fav.arrayFavorites;
    this.favoritesList = (this.filterService.favoritesList)?this.filterService.favoritesList:this.fav.dataFavorites;
    this.dataFavorites = this.fav.dataFavorites;
    this.favorite = (this.router.url == '/home')?false:true;
    this.isActiveFilter();
    setTimeout(() => {
      this.data = true;
    }, 2000);
  }
  ionWillLeave(){
    this.firstAccess = false;
  }
  //tamplate-controll
   //crea la galleria immagini
  swiper = new Swiper('.swiper-container', {
    centeredSlides:true,
  })
    //imposta  la lista di appartamenti
  setList(){
    if(!this.favorite){
      return this.apartamentsList;
    }else{
      return this.favoritesList;
    }    
  }
  //gestione visualizzazione filtri nel template
  isActiveFilter(){
    if(this.favorite){
      this.activeFilter =(this.favoritesList.length == this.dataFavorites.length)?false:true;
    }else{
      this.activeFilter =(this.apartamentsList.length == this.dataApartaments.length)?false:true;
    }
  }
  getResult(){
    if(this.favorite){
      return this.favoritesList.length
    }else{
      return this.apartamentsList.length
    } 
  }
  resetFilter(){
    if(this.favorite){
      this.favoritesList = this.dataFavorites
    }else{
      this.apartamentsList = this.dataApartaments
    }
    this.activeFilter = false
  }

  //modali

    //modale per i filtri
  async openFilterModal() {
    const modal = await this.modalController.create({
      component: FilterComponent,
      componentProps: {
        'list': (this.favorite)?this.dataFavorites:this.dataApartaments,
        'filter': (this.favorite)?this.filterService.favoriteFilter:this.filterService.apartamentsFilter,
        'favorite' : this.favorite
      }
    });
    this.modal = modal;
    modal.onDidDismiss().then(r =>{
      if(r.data){
        let newList = r.data.list;
        if(newList.lenght != 0){ 
          if(this.favorite){
            this.favoritesList = newList;
          }else{
            this.apartamentsList = newList;
          }
        }
        this.isActiveFilter();
      }
    });
    return await modal.present();
  }
  async openOrderModal() {
    const modal = await this.modalController.create({
      component: OrderComponent,
      componentProps: {
        'apartaments': this.dataApartaments
      }
    });
    this.modal = modal;
    modal.onDidDismiss().then(r =>{
      let apart = r.data.apartaments;
      this.apartamentsList = apart}
    );
    return await modal.present();
  }
  // tasto aggiungi filtro ai preferiti
  addFilterFavorite(){
    (this.activeFilter)?this.addFilterAlert():this.addFilterToast()
  }

  async addFilterAlert() {
    const alert = await this.alertController.create({
      header: 'Filtro',
      message: 'Vuoi aggiungere il filtro corrente tra i favoriti?',
      inputs: [
        {
          placeholder: 'Inserisci un nome',
        }

      ],
      buttons: [
        {
          text: 'Conferma',
          handler: res => {
            (this.favorite)?this.filterService.addFilter(this.filterService.favoriteFilter, res[0])
              :this.filterService.addFilter(this.filterService.apartamentsFilter, res[0])
          }
        },
        {
          text: 'Cancella',
        }
      ]
    });
    await alert.present();
  }
  async addFilterToast() {
    const toast = await this.toastController.create({
      message: 'Nessun filtro attivo',
      duration: 2000,
      position: 'middle'
    });
    await toast.present();
  }
  //gestione modale favoriti
  async openFavoriteModal() {
    const modal = await this.modalController.create({
      component: FavoriteComponent,
      componentProps: {
        'list': (this.favorite)?this.dataFavorites:this.dataApartaments,
        'favorite': this.favorite
      }
    });
    this.modal = modal;
    modal.onDidDismiss().then(r =>{
      let apart = r.data.list;
      (this.favorite)?this.favoritesList=apart:this.apartamentsList = apart;
    });
    return await modal.present();
  }
  //ION FAB POSITION
  @ViewChild("fab", {static: true, read: ElementRef}) fabRef: ElementRef;
  @ViewChild('content', {static: true, read:ElementRef}) contentRef: ElementRef;
  ionViewWillEnter(){
    const margin = 35;
    const x = this.contentRef.nativeElement.clientWidth-margin;
    const y = this.contentRef.nativeElement.clientHeight-margin;
    this.fabRef.nativeElement.style.setProperty('left', x+'px');
    this.fabRef.nativeElement.style.setProperty('top', y+'px');
    this.fabRef.nativeElement.childNodes[3].style.left="-183px"
    this.fabRef.nativeElement.childNodes[4].style.left="-132px"
    this.fabRef.nativeElement.childNodes[2].style.top="-183px";
    this.fabRef.nativeElement.childNodes[1].style.top="-132px";
  }

  // //ION FAB MOVE CONTROLLER
  // @ViewChild("fab", {static: true, read: ElementRef}) fabRef: ElementRef;
  // @ViewChild('fabbtn', {static: true, read:ElementRef}) fabBtn: ElementRef;
  // @ViewChild('content', {static: true, read:ElementRef}) contentRef: ElementRef;

  //   // impostiamo il longpress gesture
  // ngAfterViewInit(){
  //   this.longPress();
  // }
  //   //la gestura imposta la possibilità di spostare il fab dopo averlo premuto
  // longPress(){
  //   const gesture = this.gestureCtrl.create({
  //     el: this.fabRef.nativeElement,
  //     gestureName: 'long-press',
  //     onMove: ev => this.onMove(ev.currentX, ev.currentY),
  //     onEnd:ev => this.onEnd(ev.currentX,ev.currentY)
  //   })
  //   gesture.enable(true)
  // }
  // prova3(){
  // }

  //   //finito il movimento modifichiamo la posizione dei bottoni per non nasconderli alla vista
  // onEnd(x,y){
  //   const margin = 90;
  //   const maxWidth = this.contentRef.nativeElement.clientWidth-margin;
  //   const maxHeight = this.contentRef.nativeElement.clientHeight-margin;
  //   switch(true){
  //     case (x<margin):
  //       this.fabRef.nativeElement.childNodes[4].style.left="51px"
  //       this.fabRef.nativeElement.childNodes[3].style.left="0px"
  //       break;
  //     case (x>maxWidth):
  //       this.fabRef.nativeElement.childNodes[3].style.left="-183px"
  //       this.fabRef.nativeElement.childNodes[4].style.left="-132px"
  //       break;
  //     default:
  //       this.fabRef.nativeElement.childNodes[4].style.left="-132px";
  //       this.fabRef.nativeElement.childNodes[3].style.left="0px";
  //   }
  //   switch(true){
  //     case (y<margin):
  //       this.fabRef.nativeElement.childNodes[1].style.top="51px";
  //       this.fabRef.nativeElement.childNodes[2].style.top="0px";
  //       break;
  //     case (y>maxHeight):
  //       this.fabRef.nativeElement.childNodes[2].style.top="-183px";
  //       this.fabRef.nativeElement.childNodes[1].style.top="-132px";
  //       break;
  //     default:
  //       this.fabRef.nativeElement.childNodes[1].style.top="-132px";
  //       this.fabRef.nativeElement.childNodes[2].style.top="0px";
  //   } 
  // }

  //   //in movimento il fab non può superare i limiti della pagina
  // onMove(x,y){
  //   const margin = 35;
  //   const maxWidth = this.contentRef.nativeElement.clientWidth-margin;
  //   const maxHeight = this.contentRef.nativeElement.clientHeight-margin;
  //   if(!this.fabBtn.nativeElement.classList.contains('fab-button-close-active')){
  //     if(x>=margin && x<=maxWidth){
  //       this.fabRef.nativeElement.style.setProperty('left', x+'px');
  //     }
  //     if(y>=margin && y<=(maxHeight)){
  //       this.fabRef.nativeElement.style.setProperty('top', y+'px')
  //     }
  //   }
  // }

  //favorite controll
    //gestiamo il controllo delle icone per aggiungere, rimuovere i preferiti
  getIcon(id){
    let name;
    if (this.favorite){
      name = 'trash'
    }else{
      name = this.favoritesId.includes(id)?'heart':'heart-outline';
    }
    return name
  }
    //in base se già presente o meno, aggiungiamo e rimoviamo tra i preferiti
  async setFavorite(id){
    if(!this.favoritesId.includes(id)){
      this.fav.addFavorite(id);
      this.favoritesList = this.fav.createFavoritesList(this.apartamentsList)
      this.alert.alertToast('Appartamento aggiunto tra i preferiti', true)
    }else{
      this.fav.rmvFavorite(id);
      this.favoritesList = this.fav.createFavoritesList(this.apartamentsList)
      await this.alert.alertToast('Appartamento rimosso tra i preferiti', true)
    }
  }
  
  //apertura dell'appartamento specifico
  openApartament(id){
    this.router.navigate(['../apartament/'+id])
  }

}
