import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(private router:Router, private userService:UserService) { }

  async canActivate() {
    if (this.userService.dataUser['role']=='admin') {
      return true;
    }
    this.router.navigate(['/login']);
    return false
  }
}
