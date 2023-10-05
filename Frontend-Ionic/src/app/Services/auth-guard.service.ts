import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
    constructor(private auth:AuthService, private router:Router) { }

    canActivate(): any {
      if (!this.auth.isLoggedIn()) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
    
}
