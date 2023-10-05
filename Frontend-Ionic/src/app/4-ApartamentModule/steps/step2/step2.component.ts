import { Component } from '@angular/core';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { AlertController, LoadingController, Platform} from '@ionic/angular';
import { Apartament } from 'src/app/models/apartament';
import { AlertService } from 'src/app/Services/alert.service';
import { ApartamentsService } from 'src/app/Services/apartaments.service';

interface LocalFile {
  name: string;
  data: string;
}

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss'],
})
export class Step2Component {
  images: LocalFile[] = [];//qua bisogna creare un if per vedere se stiamo parlando di nuova creazione o bozza, nel caso di bozza bisogna mostrare le immagini prese dal server
  imagesJSON:string;
  draft:Apartament;
  constructor(
    private apartService:ApartamentsService,
    private loadingCtrl:LoadingController,
    private alertService:AlertService,
    private alertCtrl:AlertController
    ) { 
      this.draft = this.apartService.apartament;
  }
  async ionViewWillEnter(){
    this.apartService.step = 2;
    const loading = await this.loadingCtrl.create({
      message: 'Loading data...', //guardare doc per vedere cosa puoi fare di bello
    });
    await loading.present();
    if(this.apartService.apartament.images){
      this.images = JSON.parse(this.apartService.apartament.images);
    }
    loading.dismiss();
  }
  ionViewWillLeave(){
    this.apartService.apartament.images = JSON.stringify(this.images);
    this.images=[];
  }  

  async selectImage(){
    const image = await Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.Uri
    });
    if(image){
     this.nameAlert(image)
    }
  }

  async nameAlert(image:Photo){
    const alert = await this.alertCtrl.create({
      header: "Scrivi il nome per l'immagine",
      inputs: [
        {
          name: 'titolo',
          placeholder: 'Scrivi qui...',
        },
      ],
      buttons: [
        {
          text: 'Cancella',
        },
        {
          text: 'Salva',
          handler: data => {
            this.saveImage(data.titolo, image)
          }
        }
      ]
    })
    alert.present()
  }

  async saveImage(name:string,photo: Photo) {
    const savedFile = this.images.push({
      name: name,
      data: photo.webPath
    })
  }

  deleteImage(index) {
    this.images.splice(index);
    this.alertService.alertToast('File Rimosso', true)
  }
}
