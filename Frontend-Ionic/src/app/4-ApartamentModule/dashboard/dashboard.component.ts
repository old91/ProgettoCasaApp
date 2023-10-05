import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { Apartament } from 'src/app/Models/apartament';
import { AlertService } from 'src/app/Services/alert.service';
import { ApartamentsService } from 'src/app/Services/apartaments.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements ViewWillEnter,ViewWillLeave{
  apartamentClear = new Apartament;
  constructor(
    private apartService:ApartamentsService,
    private router:Router,
    private alertController:AlertController,
    private alertService:AlertService
  ) { }
  
  stepForward(){
    this.apartService.step +=1;
    (this.apartService.step!=4)?this.router.navigate(['/user/apartament/create/step'+this.apartService.step]):this.router.navigate(['/user/apartament/create/preview']);
  }
  stepBack(){
    this.apartService.step -=1;
    this.router.navigate(['/user/apartament/create/step'+this.apartService.step])
  }
  deleteButton(){
    this.deleteAlert()
  }
  async deleteAlert(){
    const alert = await this.alertController.create({
      header: 'Confermi la Cancellazione?',
      message: 'Se confermi perderai tutte le modifiche non salvate',
      buttons: [
        {
          text: 'CONFERMA',
          handler: ()=>{
            this.deleteData();
          }
        },
        {
          text: 'ANNULLA',
        }
      ]
    });
    await alert.present();
  }

  deleteData(){
    this.apartService.createOn = false;
    this.apartService.apartament = new Apartament;
    switch(this.apartService.createMode){
      case 'old':
        this.router.navigate(['/user/edit']);
        break;
      default:
        this.router.navigate(['/user/apartament']);
        
    }
  }


  async saveAlert(){
    const alert = await this.alertController.create({
      header: 'BOZZA',
      message: "Confermi di volere salvare i dati? in questo modo l'appartamento rimarrà in sospeso",
      buttons: [
        {
          text: 'CONFERMA',
          handler: ()=>{
            this.saveData()
          }
        },
        {
          text: 'ANNULLA',
        }
      ]
    });
    await alert.present();
  }

  saveData(){
    switch(this.apartService.createMode){
      case 'new':
        this.apartService.storeDraft().subscribe(
          res =>{
            if(res.success === true){
              this.apartService.dataDrafts.push(res.data)
              this.alertService.alertToast('Bozza Creata con Successo!', true);
              this.apartService.apartament = new Apartament;
              this.router.navigate(['/user/apartament']);
            }else{
              this.alertService.alertToast('Si è verificato un errore, Controlla di aver inserito i campi correttamente!', false);
            }
          })
        break;
      case 'draft':
        this.apartService.editDraft().subscribe( res => {
          if(res.success ===true){
            this.alertService.alertToast(res.message, true)
            this.apartService.apartament = new Apartament;
            this.router.navigate(['/user/apartament']);
          }else{
            this.alertService.alertToast(res.message, false)
          }
        });
        break;

    }
  }
  checkData(){
    let incomplete =[];
    Object.entries(this.apartService.apartament).forEach( el=>{
      if(el[1] === null){
        incomplete.push(el[0])
      }
    })
    if(incomplete.length !== 0){
      this.incompleteAlert(incomplete);
    }else{
      this.storeAlert()
    }
  }
  async incompleteAlert(value){
    const alert = await this.alertController.create({
      header: 'CAMPI INCOMPLETI',
      message: "I seguenti campi non sono stati compilati "+value,
      buttons: [
        {
          text: 'CONFERMA',
        }
      ]
    });
    await alert.present();
  }
  async storeAlert(){
    const alert = await this.alertController.create({
      header: 'CREAZIONE',
      message: "Sicuro di voler Creare l'Appartamento?",
      buttons: [
        {
          text: 'CONFERMA',
          handler: ()=>{
            this.storeData()
          }
        },
        {
          text: 'ANNULLA',
        }
      ]
    });
    await alert.present();
  }
  storeData(){
    switch(this.apartService.createMode){
      case 'new'://salviamo nuovo appartamento
        this.apartService.storeApartament().subscribe( res =>{
          if(res.success === true){
            this.alertService.alertToast(res.message, true)
            this.apartService.apartament = new Apartament;
            this.router.navigate(['/user/apartament']);
          }
        })
        break;
      case 'draft'://salviamo un appartamento che era rimasto in sospeso
        this.apartService.storeApartament().subscribe( res =>{
          if(res.success === true){
            this.apartService.deleteDraft(this.apartService.apartament.id).subscribe(res2 =>{
              if(res2.success ===true){
                this.alertService.alertToast(res.message, true)
                this.apartService.apartament = new Apartament;
                this.router.navigate(['/user/apartament']);
              }else{
                this.alertService.alertToast(res2.message,false);
              }
            })
          }else{
            this.alertService.alertToast(res.message,false)
          }
        })
      case 'old'://salviamo le modifiche apportate ad un appartamento già pubblicato
        this.apartService.editApart().subscribe(res =>{
          if(res.success === true){
            this.alertService.alertToast(res.message, true)
            this.apartService.apartament = new Apartament;
            this.router.navigate(['/user/edit']);
          }else{
            this.alertService.alertToast(res.message, false)
          }
        })
    }
  }

  ionViewWillLeave(){
    this.apartService.createOn=false;
  }
  ionViewWillEnter(){
    this.apartService.createOn=true
  }


}
