import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { AlertController } from '@ionic/angular';
import { ApartamentsService } from 'src/app/Services/apartaments.service';
import { AuthService } from 'src/app/Services/auth.service';
import { TokenService } from 'src/app/Services/token.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public appPages = [
    { title: 'Chi Siamo', url: 'about', icon: 'people' },
    { title: 'Servizi', url: 'services', icon: 'business' },
    { title: 'Contatti', url: 'where', icon: 'paper-plane' },
    { title: 'Accedi', url: 'login', icon: 'person' },
  ];
  
  public userPages = [
    {title: 'Impostazioni Account', url: '/user/home', icon: 'settings' },
    {title: 'Nuovo Appartamento', url: '/user/apartament', icon: 'home'},
    {title: 'Modifica Appartamento', url: '/user/edit', icon: 'construct'},

  ];
  public adminPages = [
    {title: 'Aggiungi Account', url: '/admin/new', icon: 'person-add' },
    {title: 'Modifica Account', url: '/admin', icon: 'people-circle'},

  ];

  constructor( 
    private callNumber: CallNumber,
    private apart:ApartamentsService,
    private auth:AuthService,
    private alertController:AlertController,
    private userService:UserService,
    private router:Router,
    private tokenService:TokenService,
  ) { 

  }

  callUs(){
    this.callNumber.callNumber("0541 382847", true)
  }

  async logOutAlert() {
    const alert = await this.alertController.create({
      header: "Vuoi disconettere l'account?",
      buttons: [
        {
          text: 'Conferma',
          handler: async () => {
            await this.tokenService.deleteToken();
            this.auth.isAuthenticated=false;
            this.router.navigate(['/home'])
          }
        },
        {
          text: 'Annulla'
        }
      ]
    });
    await alert.present();
  }
  setTitle(){
    if(this.auth.isLoggedIn()){
      return this.userService.dataUser['name'] + ' ' + this.userService.dataUser['surname'];
    }else{
      return 'Progetto Casa';
    }
  }
  setSubtitle(){
    if(this.auth.isLoggedIn()){
      return this.userService.dataUser['ref_user']+' '+this.userService.dataUser['role'];
    }else{
      return "info@progettocasarimini.it";
    }
  }

  isAdmin(){
    let u = this.userService.dataUser
    if(u){
      if(this.userService.dataUser['role']=='admin'){
        return true
      }
    }
    return false
  }
  ngOnInit() {}

}