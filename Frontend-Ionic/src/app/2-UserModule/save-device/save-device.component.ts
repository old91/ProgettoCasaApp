import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
import { LoadingController } from '@ionic/angular';
import { AlertService } from 'src/app/Services/alert.service';
import { CustomValidatorsService } from 'src/app/Services/custom-validators.service';
import { DataService } from 'src/app/Services/data.service';
import { DeviceService } from 'src/app/Services/device.service';
import { ResetPasswordService } from 'src/app/Services/reset-password.service';

@Component({
  selector: 'app-save-device',
  templateUrl: './save-device.component.html',
  styleUrls: ['./save-device.component.scss'],
})
export class SaveDeviceComponent implements OnInit {

  deviceName:string;
  resetForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private deviceService:DeviceService,
    private alertService:AlertService,
    private loadingCtrl:LoadingController,
    private dataService:DataService,
    private route:Router
    ) {
    this.resetForm = this.formBuilder.group({
      password: [''],
    })
  }

  async getRequest(){
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom'
    });
    await loading.present();
    this.deviceService.getDeviceCode().subscribe( (res)=>{
      loading.dismiss();
      this.alertService.sendEmailAlert('Controlla la tua posta elettronica, abbiamo inviato un codice di 6 cifre per resettare la password.')
    })
  }

  postDevice($request){//risultato del form
    $request.deviceName = this.deviceName;
    $request.deviceId = this.deviceService.deviceId;
    this.deviceService.registerDevice($request).subscribe(
      async (res)=>{
        this.alertService.alertToast(res.message,res.success);
        if(res.success){
          await this.dataService.getUsersData();
          await this.dataService.getDraftsData();
          await this.dataService.getDevicesData();
          await this.dataService.getUserData().then(
            ()=>this.route.navigate(["user/home"])
          );
        }
      },
    )
  }
  
  async ngOnInit() {
    this.deviceName = this.deviceService.deviceName
  }


}

