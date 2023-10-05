import { Component } from '@angular/core';
import { Device } from '@capacitor/device';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { AlertController, ToastController } from '@ionic/angular';
import { AlertService } from '../Services/alert.service';
import { DataService } from '../Services/data.service';
import { DeviceService } from '../Services/device.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent{
  dataComplete:boolean = false;
  constructor(
    private data:DataService,
    private toastCtrl:ToastController,
    private alertCtrl:AlertController,
    private deviceService:DeviceService,
    private alertService:AlertService
  ) {
      window.addEventListener('offline', ()=>{
        if(!this.dataComplete){
          this.netAlert()
        }else{
          this.netToast()
        }
      })
    }

  async netAlert(){
    const alert = await this.alertCtrl.create({
      header: 'Errore',
      message: 'Connessione Assente!',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            navigator['app'].exitApp()
          }
        }
      ]
    });
    await alert.present()
  }

  async netToast(){
      const toast = await this.toastCtrl.create({
        message: 'Connessione Assente! attiva i dati mobili per continuare',
        cssClass: 'my-custom'
      });
      await toast.present()
  }

  async ngOnInit(){
    try{
      await this.deviceService.getDeviceInfo();
      await this.data.getApartamentsData();
      await this.data.getFavoritesData(); 
      await this.data.getFiltersData();
      await this.data.getTokenData();
      await this.data.getUserData();
      await this.data.getUsersData();
      await this.data.getDraftsData();
      await this.data.getDevicesData(); 
      await this.createFolder();
      this.dataComplete = true;
    }catch(e){
      if(e.error.message.includes("The token has been blacklisted")){
        await this.alertService.tokenInvalidAlert().then( ()=>
          this.dataComplete = true
        );
      }
    }
  }

  // async getDeviceId(){
  //   await Device.getId().then(res=>this.deviceService.deviceId=res.uuid);
  //   await Device.getInfo().then(res => this.deviceService.deviceName = res.name);
  // }

  async createFolder(){
    await Filesystem.readdir({
      path: 'ProgettoCasaApp',
      directory: Directory.Data
    }).then(
      ()=>{},
      async (err)=>{
        await Filesystem.mkdir({
          path: 'ProgettoCasaApp/Token',
          directory: Directory.Data,
          recursive: true
        }).then(async ()=>{
          await Filesystem.mkdir({
            path: 'ProgettoCasaApp/Favoriti',
            directory: Directory.Data
          })
        })
      }
    )
  }
}
