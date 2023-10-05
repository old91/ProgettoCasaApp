import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/Services/token.service';
import { UserService } from 'src/app/Services/user.service';


@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent implements OnInit {
  public infoUser = [];
  public contactUser = [];
  
  constructor(private userService:UserService, private tokenService: TokenService) { }

  ngOnInit():void {
    let data = this.userService.dataUser
    this.infoUser =[
      {title: 'Nome', value: data['name']},
      {title: 'Cognome', value: data["surname"]},
      {title: 'Ruolo', value: data['role']=="vendor"?"Venditore":"Admin"},
      {title: 'Codice', value: data['ref_user']}
    ];
    this.contactUser =[
      {title: 'Email', value: data['email']},
      {title: 'Password', value: '********'}
    ];
  }
}
