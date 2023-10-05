import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/auth.service';
import { AlertService } from 'src/app/Services/alert.service';
import { TokenService } from 'src/app/Services/token.service';
import { UserService } from 'src/app/Services/user.service';
import { CustomValidatorsService } from 'src/app/Services/custom-validators.service';
import { Thumbs } from 'swiper';
import { DeviceService } from 'src/app/Services/device.service';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})


export class UserEditComponent implements OnInit {
typeOfChange:string;
form:FormGroup;
user: User;
pswForm:FormGroup;
emailForm:FormGroup;
status:boolean;
id:number;
control:boolean;
devices = this.deviceService.dataDevice;

  constructor(
    private activatedRoute:ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private formBuilder:FormBuilder,
    private alertController: AlertController,
    private alert: AlertService,
    private validate: CustomValidatorsService,
    private loadingCtrl:LoadingController,
    private deviceService:DeviceService
  ){
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, this.validate.emailPattern() ]],
      password: ['',Validators.required]
    });
    this.pswForm = this.formBuilder.group({
      password: ['', Validators.required],
      newPassword: ['', this.isValidPassword()],
      confirmPassword: ['', this.isValidPassword()],
    })
  }

  passwordMatchControl():boolean{
    if(this.validate.passwordMatch(this.pswForm)){
      return false
    }else{
      return true;
    }
  }
  isValidPassword():any{
    return [
      Validators.required,
      this.validate.passwordPattern(),
    ]
  }

  ngOnInit(): void {
    this.typeOfChange=this.activatedRoute.snapshot.paramMap.get("value");
    this.form = (this.typeOfChange=='email')?this.emailForm:this.pswForm;
    this.user = new User;
    this.id = this.userService.dataUser['id'];
    this.user.email = this.userService.dataUser['email']
    // this.userService.getUser(this.id).subscribe(
    //   data => {
    //     this.user.email = data['email']
    //   }
    // );  
  }
  async auth(): Promise<void> {
    const loading = await this.loadingCtrl.create({
            cssClass: 'my-custom',
    });
    loading.present();
    this.user.password = this.form.value['password'];
    await this.authService.login(this.user).toPromise()
    .then(
      async response  => {
        if (response.auth === true) {
          if(this.typeOfChange == 'email'){
            await this.changeEmail();
          }else{
            await this.changePassword();
          }
          this.userService.getUser(this.userService.dataUser['id']);
        } else {
          await this.alert.alertToast("La password inserita non è corretta",false)
        }
      },
    );
    loading.dismiss()
  }

  async changeEmail(){
    await this.userService.changeEmail(this.id, {email: this.form.value['email']}).toPromise().then(
      response  => {
        this.alert.alertToast("Email modificata con successo!",true)
      },
      error =>  {
        this.alert.alertToast("L'email inserita appartiene già ad un account",false)
      }
    );
  }

  async changePassword(){
    await this.userService.changePassword(this.id, {password: this.form.value['newPassword']}).toPromise().then(
      response  => {
        this.alert.alertToast("Password modificata con successo",true)
      }
    );
  }

  async deviceAlert(id){
    const alert = await this.alertController.create({
      header: 'Rimozione Device',
      message: 'Sei sicuro di volere rimuovere il device?',
      buttons: [
        {
          text: 'Conferma',
          handler: ()=> this.rmvDevice(id)
        },
        {
          text: 'Annulla'
        }
      ]
    });
    await alert.present();
  }

  async rmvDevice(id){
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom',
    });
    loading.present();
    this.deviceService.deleteDevice(id).subscribe(
      (res) => {
        if(res.success){
          this.deviceService.getDevices(this.userService.dataUser['id']).subscribe(
            (res)=> this.devices = res
          );
          this.alert.alertToast(res.message,true);
        }else{
          this.alert.alertToast(res.message,false);
        }
        loading.dismiss();
      }
    )
  }

}
