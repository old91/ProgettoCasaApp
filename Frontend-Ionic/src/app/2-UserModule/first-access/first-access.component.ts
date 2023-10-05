import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/Models/user';
import { CustomValidatorsService } from 'src/app/Services/custom-validators.service';
import { TokenService } from 'src/app/Services/token.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-first-access',
  templateUrl: './first-access.component.html',
  styleUrls: ['./first-access.component.scss'],
})
export class FirstAccessComponent {
  registerForm: FormGroup;
  id:any;
  params:any;
  user = new User();
  constructor(
    private userService:UserService,
    private formBuilder:FormBuilder,
    private tokenService:TokenService,
    public alertController: AlertController,
    private router: Router,
    private validate:CustomValidatorsService
  )
  {
    this.registerForm = this.formBuilder.group({
     
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

  async serverAlert() {
    const alert = await this.alertController.create({
      header: 'Error 500',
      message: 'Problemi con il server! Contattare lo sviluppatore.',
      buttons: ['OK']
    });
    await alert.present();
  }

  prova(text){
  }

  changePassword(psw): void {
    this.id = this.tokenService.idByToken();
    this.userService.changePassword(this.id, {password: psw})
    .subscribe(
      res => {
        this.userService.getUser(this.tokenService.idByToken()).subscribe( ()=>this.router.navigate(["user/home"]) )
      },
    );
  }
}

