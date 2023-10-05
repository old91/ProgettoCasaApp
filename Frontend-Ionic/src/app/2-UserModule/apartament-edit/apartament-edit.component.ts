import { Component, Input} from '@angular/core';
import { Apartament } from 'src/app/models/apartament';
import { ApartamentsService } from 'src/app/Services/apartaments.service';
import { AdminService } from 'src/app/Services/admin.service';
import { User } from 'src/app/Models/user';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';

@Component({
  selector: 'app-apartament-edit',
  templateUrl: './apartament-edit.component.html',
  styleUrls: ['./apartament-edit.component.scss'],
})
export class ApartamentEditComponent{
  @Input() apartaments:Apartament[];
  usersList:User;
  filter:string;
  apartamentsList:Apartament[];
  constructor(
    private apartService:ApartamentsService,
    private adminService:AdminService,
    private alertCtrl:AlertController,
    private router:Router,
    private alertService:AlertService
  ) { }

  filtering(event){
    let filter = event.detail.value;
    if(filter){
      if(filter != 'all'){
        this.apartamentsList = this.apartaments.filter(i => i.agent == filter);
      }else{
        this.apartamentsList = this.apartaments
      }
    }else{
      this.apartamentsList = this.apartamentsList;
    }
  }
  
  async deleteAlert(id){
    const alert = await this.alertCtrl.create({
      header: 'ELIMINA',
      message: "Sei sicuro di volere eleminare l'appartamento?",
      buttons: [
        {
          text: 'CONFERMA',
          handler: ()=>{
            this.deleteApart(id)
          }
        },
        {
          text: 'ANNULLA',
        }
      ]
    });
    await alert.present();
  }

  deleteApart(id){
    this.apartService.deleteApart(id)
      .subscribe(res=>{
        if(res.success===true){
          let arr = this.apartService.dataApartaments;
          for( var i = 0; i < arr.length; i++){ 
            if ( arr[i].id === res.data.id) {
              arr.splice(i, 1); 
            }
          }
          this.apartService.dataApartaments = arr
          this.alertService.alertToast('Appartamento Eliminato con Successo',true)
          this.ionViewWillEnter()
      }else{
        this.alertService.alertToast('Ops! si è verificato un Errore, riprova più tardi',false)
      }
    })
  }
  async modifyAlert(apart){
    const alert = await this.alertCtrl.create({
      header: 'MODIFICA',
      message: "Confermi che vuoi modificare l'appartamento selezionato?",
      buttons: [
        {
          text: 'CONFERMA',
          handler: ()=>{
            this.modifyApart(apart)
          }
        },
        {
          text: 'ANNULLA',
        }
      ]
    });
    await alert.present();
  }
  modifyApart(apart){
    this.apartService.apartament = apart;
    this.apartService.createMode = 'old';
    this.router.navigate(['/user/apartament/create/step1']);

  }
  ionViewWillEnter(){
    this.usersList = this.adminService.dataUsers;
    this.apartaments = this.apartService.dataApartaments;
    this.apartamentsList = this.apartService.dataApartaments;
  }

}
