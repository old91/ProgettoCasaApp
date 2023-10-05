import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../Models/user';

const GETAPI = 'http://127.0.0.1:8000/api/users';
const DELETEAPI = 'http://127.0.0.1:8000/api/delete-user';
const ROLEAPI = 'http://127.0.0.1:8000/api/change-role';
const ADDAPI = 'http://127.0.0.1:8000/api/create-user';
const GETAPI2 = 'http://127.0.0.1:8000/api/is-user';


@Injectable({
  providedIn: 'root'
})

export class AdminService {
  dataUsers;

  constructor(private http:HttpClient) { }

  //otteniamo tutti gli utenti
  getUsers(): Observable<any>{
    return this.http.get<User>(GETAPI)
    .pipe(
      map((response) =>{
        this.dataUsers = response;
      }),
      catchError(this.errorHandler)
    );
  }

  //cancelliamo utente
  deleteUser(id:number):Observable<any>{
    return this.http.delete(DELETEAPI+'/'+id)
    .pipe(
      map((res) => res),
      catchError(this.errorHandler)
    );
  }

  //aggiungiamo utente
  addUser(user: User): Observable<any> {
    return this.http.post(ADDAPI, user)
    .pipe(
      catchError(this.errorHandler)
    );//add handler
  }

  //modifichiamo privilegi utente
  changeRole(id:number):Observable<any>{
    return this.http.patch(ROLEAPI+'/'+ id, '')
    .pipe(
      map((res) => res),
      catchError(this.errorHandler)
    );
  }

  //gestiamo gli errori
  errorHandler(error: HttpErrorResponse): any {
    return throwError(error || {message: 'App adminService - Server Error'});
  }
}
