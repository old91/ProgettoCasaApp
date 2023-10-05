import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { User } from 'src/app/Models/user';
import { AdminService } from 'src/app/Services/admin.service';
import { AlertService } from 'src/app/Services/alert.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users:User;
  idShow: number;
  typeOfRole = [{title: 'Venditori', role: 'vendor'},{title: 'Admin', role: 'admin'}];
  
  constructor(
    private adminService:AdminService,
    private alertController:AlertController,
    private alert:AlertService,
    private loadingCtrl:LoadingController
  ) { }
  
  async deleteAlert(id) {
    const alert = await this.alertController.create({
      header: 'Eliminazione Utente',
      message: ' Sei sicuro di volere eliminare questo profilo?',
      buttons: [
        {
          text: 'CONFERMA',
          handler: () => {
            this.deleteUser(id);
          }
        },
        {
          text: 'ANNULLA'
        }
      ]
    });
    await alert.present();
  }
  async deleteUser(id){
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom'
    });
    await loading.present();
    this.adminService.deleteUser(id)
      .subscribe(res => {
        if(res.success === true){
          let arr = this.adminService.dataUsers;
          for( var i = 0; i < arr.length; i++){ 
            if ( arr[i].id === res.data.id) {
              arr.splice(i, 1); 
            }
          }
          this.adminService.dataUsers = arr
          this.alert.alertToast('Utente Eliminato con Successo', true);
          this.ngOnInit();
        }else{
          this.alert.alertToast('Ops, qualcosa è andato storto', false)
        }
        loading.dismiss();
      });
  }
  showDetails(id){
    if(id == this.idShow){
      this.idShow = undefined;
    }else{ 
      this.idShow = id;
    }
  }
  
  // getUser(): any {
  //   return this.adminService.getUsers()
  //     .subscribe(res =>{
  //       this.users = res;
  //     })
  // }
  
  verified(first,type){
    if(type == 'icon'){
      return (first)?'checkmark-circle':'close-circle';
    }
    return (first)?'success':'danger';
  }

  ngOnInit() {
    this.users = this.adminService.dataUsers
  }
}
