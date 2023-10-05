import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const GAPI = "http://127.0.0.1:8000/api/request-reset";
const PAPI = 'http://127.0.0.1:8000/api/password-reset';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http:HttpClient) { }

  getTokenReset($email):Observable<any>{
    return this.http.post(GAPI, $email)
    .pipe(
      catchError(this.errorHandler)
    );
  }
  resetPassword($request):Observable<any>{
    return this.http.patch(PAPI, $request)
    .pipe(
      map((response) => response),
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: HttpErrorResponse): any {
    return throwError(error || {message: 'App resetPasswordService - Server Error'});
  }
}
