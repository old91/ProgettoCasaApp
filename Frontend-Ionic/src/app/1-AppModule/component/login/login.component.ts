import { Component} from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth.service';
import { DataService } from 'src/app/Services/data.service';
import { TokenService } from 'src/app/Services/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent{

  loginForm: FormGroup;
  token:string;
  status:string;
  message:string;
  authMessage:string;

  constructor(
    public authService: AuthService,
    private formBuilder:FormBuilder,
    private router: Router,
    private tokenService: TokenService,
    private dataService:DataService,
    private loadingCtrl:LoadingController
  )
  { 
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
      keepConnection: [false]
    }) 
  }
  async auth(){
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom'

    });
    this.authMessage = '';
    await loading.present();
    this.authService.login(this.loginForm.value)
    .subscribe(
      async response  => {
        if(!response.auth){
          //email o password sbagliate/non inserite 1/2
          this.authMessage = response.message;

        }else if(response.first){
          //prima autenticazione
          this.tokenService.token = response.message;
          this.router.navigate(["user/first-access"]);

        }else if(response.device){
          //autenticato e device già registrato
          this.tokenService.token = response.message;
          if(this.loginForm.value.keepConnection){
            this.tokenService.writeTokenAccess(response.message);
          }
          await this.dataService.getUsersData();
          await this.dataService.getDraftsData();
          await this.dataService.getDevicesData();
          await this.dataService.getUserData().then(
            ()=>this.router.navigate(["user/home"])
          );

        }else{
          //autenticato e device non registrato
          this.tokenService.token = response.message
          this.router.navigate(["user/save-device"]);
        }
        loading.dismiss();
      }
    );
  }

}