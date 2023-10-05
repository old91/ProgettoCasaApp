import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApartamentsService } from 'src/app/Services/apartaments.service';
import { Apartament } from 'src/app/models/apartament';
import { AlertController, ViewWillEnter } from '@ionic/angular';
import { AlertService } from 'src/app/Services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements ViewWillEnter{
  drafts:Apartament[] = this.apartService.dataDrafts;//mettere modello giusto
  constructor(
    private apartService:ApartamentsService,
    private router:Router,
    private alertService:AlertService,
    private alertCtrl:AlertController
  ) { }
  createStart(){
    this.apartService.createMode = 'new';
    this.router.navigate(["user/apartament/create"]);
  }
  setDraft(apart){
    this.apartService.apartament = apart;
    this.apartService.createMode = 'draft';
    this.router.navigate(["user/apartament/create"]);
  }
  async deleteAlert(id){
    const alert = await this.alertCtrl.create({
      header: 'ELIMINA',
      message: "Vuoi Eliminare la Bozza?",
      buttons: [
        {
          text: 'CONFERMA',
          handler: ()=>{
            this.deleteDraft(id)
          }
        },
        {
          text: 'ANNULLA',
        }
      ]
    });
    await alert.present();
  }
  deleteDraft(id:number){
    this.apartService.deleteDraft(id).subscribe(res=>{
      if(res.success===true){
        let arr = this.apartService.dataDrafts;
        for( var i = 0; i < arr.length; i++){ 
          if ( arr[i].id === res.data.id) {
            arr.splice(i, 1); 
          }
        }
        this.apartService.dataDrafts = arr
        this.alertService.alertToast('Bozza Eliminata con Successo', true)
        this.ionViewWillEnter()
      }else{
        this.alertService.alertToast('Ops! Si è verificato un Errore, riprova più tardi!', false)
      }
    })
  }
  ionViewWillEnter() {
    // this.drafts = this.apartService.dataDrafts;
  }


}
