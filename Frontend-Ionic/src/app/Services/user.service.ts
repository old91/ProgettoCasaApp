import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import { User } from '../Models/user';

const GETAPI = 'http://127.0.0.1:8000/api/user';
const PSWAPI = 'http://127.0.0.1:8000/api/change-psw';
const EMAILAPI = 'http://127.0.0.1:8000/api/change-email';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  dataUser:User = new User; //contiene i dati dell'utente da usare nei component

  constructor(private http:HttpClient) { }
  
  //otteniamo l'utente
  getUser(id: any): Observable<any> {
    return this.http.get(GETAPI + '/' + id)
    .pipe(
      map((response) =>{
        this.dataUser = response;
      }),
      catchError(this.errorHandler)
    );
  }

  //cambiamo password
  changePassword(id:number,psw:any):Observable<any>{
    return this.http.patch(PSWAPI+'/'+ id, psw)
    .pipe(
      map((res) => res),
      catchError(this.errorHandler)
    );
  }

  //cambiamo email
  changeEmail(id:number, email:any):Observable<any>{
    return this.http.patch(EMAILAPI+'/'+ id, email)
    .pipe(
      map((res) => res),
      catchError(this.errorHandler)
    );
  }

  //gestiamo gli errori
  errorHandler(error: HttpErrorResponse): any {
    return throwError(error || {message: 'App userService - Server Error'});
  }

}
