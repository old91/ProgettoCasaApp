import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertService } from 'src/app/Services/alert.service';
import { CustomValidatorsService } from 'src/app/Services/custom-validators.service';
import { ResetPasswordService } from 'src/app/Services/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  requestForm:FormGroup;
  resetForm:FormGroup;
  token:string;
  email:string;

  constructor(
    private formBuilder:FormBuilder,
    private pswService:ResetPasswordService,
    private alertService:AlertService,
    private loadingCtrl:LoadingController,
    private validate:CustomValidatorsService,
    private route:Router
    ) {
    this.requestForm = this.formBuilder.group({
      email: [''],
    });
    this.resetForm = this.formBuilder.group({
      resetPassword: [''],
      newPassword: ['',
        [
          Validators.required,
          this.validate.passwordPattern()
        ]
      ],
      confirmPassword: ['',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ]
    })
  }

  async getRequest(email){
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom'
    });
    await loading.present();
    this.pswService.getTokenReset(email).subscribe( (res)=>{
      if(res.success){
        this.token = res.token;
        this.email = email.email;
        loading.dismiss();
        this.alertService.sendEmailAlert('Controlla la tua posta elettronica, abbiamo inviato un codice di 6 cifre per resettare la password.')
      }else{
        loading.dismiss();
        this.alertService.alertToast(res.message,false)
      }
    })
    
  }

  getReset($request){
    $request.email = this.email;
    $request.token = this.token;
    this.pswService.resetPassword($request).subscribe(
      (res)=>{
        this.alertService.alertToast(res.message,res.success);
        if(res.success){
          this.route.navigate(['/login'])
        }
      },
    )
  }
  
  ngOnInit() {
  }

}
