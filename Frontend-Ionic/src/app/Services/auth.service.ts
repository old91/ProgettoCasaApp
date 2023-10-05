import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../Models/user';
import { TokenService } from './token.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  isAuthenticated:boolean = this.isLoggedIn();
  first:Observable<any>;

  constructor(
    private http:HttpClient,
    private jwtHelper:JwtHelperService,
    private tokenService:TokenService,
  ) { }
  
  login(user: User): Observable<any> {
    return this.http.post(' http://127.0.0.1:8000/api/login', user) //add handler
    .pipe(
      catchError(this.errorHandler)
    );
  }
  
  isLoggedIn(){
    return !this.jwtHelper.isTokenExpired(this.tokenService.token)
  }

  isAdmin(){
    return (this.jwtHelper.decodeToken(this.tokenService.token).role == 'admin')?true:false;
  }

  errorHandler(error: HttpErrorResponse): any {
    return throwError(error || {message: 'App authService - Server Error'});
  }

}
