import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Color } from '@ionic/core';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  
  constructor(
    private alertController:AlertController,
    private router:Router,
    private toast:ToastController,
    private tokenService:TokenService,
    private auth:AuthService
  ) {}

  async alertToast(message:string, color:boolean){
    const toast = await this.toast.create({
      message: message,
      color: (color)?'success':'danger',
      duration: 3000,
      position: 'middle'
    });
    await toast.present()
  }

  async sendEmailAlert(message) {
    const alert = await this.alertController.create({
      header: 'Avviso!',
      message: message,
      buttons: [
        {
          text: 'OK',
        }
      ]
    });
    await alert.present();
  }
  async tokenInvalidAlert() {
    const alert = await this.alertController.create({
      header: 'Accesso ai dati NEGATO!',
      message: "E' possibile che qualcuno abbia provato ad accedere al tuo account, ti preghiamo di effettuare nuovamente il log in e di modificare la PASSWORD",
      buttons: [
        {
          text: 'OK',
          handler: async () => {
            await this.tokenService.deleteToken();
            this.auth.isAuthenticated=false;
            return true;
          }
        }
      ]
    });
    await alert.present();
    await alert.onDidDismiss();
  }

}
