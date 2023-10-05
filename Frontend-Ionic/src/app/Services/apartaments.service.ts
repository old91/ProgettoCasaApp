import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Apartament } from '../Models/apartament';
import { AlertService } from './alert.service';


const GETDAPI = "http://127.0.0.1:8000/api/apartament-drafts";
const POSTDAPI = "http://127.0.0.1:8000/api/create-draft";
const DELETEDAPI = "http://127.0.0.1:8000/api/delete-draft";
const POSTAPI = "http://127.0.0.1:8000/api/create-apart";
const GETSAPI = "http://127.0.0.1:8000/api/apartaments";
const DELETEAPI = "http://127.0.0.1:8000/api/delete-apart";
const GETAPI = "http://127.0.0.1:8000/api/apartament";
const EDITDAPI = "http://127.0.0.1:8000/api/edit-draft";
const EDITAAPI = "http://127.0.0.1:8000/api/edit-apart";


@Injectable({
  providedIn: 'root'
})

export class ApartamentsService {
  step:number;
  createOn:boolean;
  createMode:string;
  apartament:Apartament = new Apartament;
  dataApartaments:Apartament[]; //lista apartamenti
  dataDrafts:Apartament[];
  constructor(private http:HttpClient, private alertService:AlertService) { }

  //inizializziamo i Dati
  async startApartaments(){
    const promise = this.getApartaments().toPromise()
    await promise.then((res)=>{
      this.dataApartaments = res.sort((a,b)=>{ //ordiniamo gli appartamenti per data
        let date1 = new Date(a.created_at);
        let date2 = new Date(b.created_at);
        return date2.getTime() - date1.getTime();
      })
    }).then( ()=>{
      this.dataApartaments.forEach( el => {
        el.media = JSON.parse(el.images)
      })
    })

  }

  //recuperiamo tutti gli appartamenti
  getApartaments():Observable<any>{
    return this.http.get<Apartament[]>(GETSAPI)
    .pipe( //add handler
      catchError(this.errorHandler)
    );
  }
  //cancelliamo appartamento da id
  deleteApart(id):Observable<any>{
    return this.http.delete(DELETEAPI+'/'+id)
    .pipe( //add handler
      catchError(this.errorHandler)
    );
  }

  getDrafts():Observable<any>{
    return this.http.get<Apartament[]>(GETDAPI)
    .pipe(
      map( (res) =>{
        this.dataDrafts = res
      }),
      catchError(this.errorHandler)
    );
  }

  deleteDraft(id:number):Observable<any>{
    return this.http.delete(DELETEDAPI+'/'+id )
    .pipe( //add handler
      catchError(this.errorHandler)
    );
  }
  
  storeDraft():Observable<any>{
    return this.http.post(POSTDAPI, this.apartament)
    .pipe(
      catchError(e => of([e])),
      map((res) => {
        return res
      }),
    );
  }

  storeApartament():Observable<any>{
    return this.http.post(POSTAPI, this.apartament)
    .pipe(
      map((response) => response),
      catchError((err) =>{
        if(err.error.message.includes('1048')){
          this.alertService.alertToast("Errore!! Controlla di aver inserito tutti i Campi", false)
        }
        return throwError(err);
      }),
    );
  }

  getApartament(id:number):Observable<any>{
    return this.http.get<Apartament>(GETAPI+'/'+id)
    .pipe( //add handler
      catchError(this.errorHandler)
    );

  }

  editDraft():Observable<any>{
    let id = this.apartament.id;
    return this.http.patch(EDITDAPI+'/'+id, this.apartament)
    .pipe( //add handler
      catchError(this.errorHandler)
    );
  }

  editApart():Observable<any>{
    let id = this.apartament.id;
    return this.http.patch(EDITAAPI+'/'+id, this.apartament)
    .pipe( //add handler
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: HttpErrorResponse): any {
    return throwError(error || {message: 'App apartamentsService - Server Error'});
  }

}
