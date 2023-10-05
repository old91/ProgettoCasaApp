
import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor,HttpRequest,HttpResponse,HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from "rxjs";
import {catchError, concatMap, delay, map, retry, retryWhen, tap} from 'rxjs/operators';
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { App } from "@capacitor/app";
import { AlertService } from "./alert.service";

export const retryCount = 3;
export const retryWaitMilliSeconds = 1000;
 
@Injectable()

export class GlobalHttpInterceptorService implements HttpInterceptor {

    
  constructor(
    public router: Router,
    private toastCtrl:ToastController,
    private alertService:AlertService
  ) {}
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
      }, error => {
          if (error instanceof HttpErrorResponse) {
            switch(error.status) {
              case 0:
                this.alertService.alertToast('Errore connessione al server. Riprova più tardi',false);
              break;
              case 401:
                if(error.error.message.includes('Device')){
                  this.router.navigate(["login"])
                break;
                }
              case 500:
                if(error.error.message.includes('SQLSTATE[22003]')){
                  return this.alertService.alertToast('Errore: Controlla di avere inserito correttamente i dati', false);
                }
                if( error.error.message.includes('App')){
                  return this.alertService.alertToast('Si è verificato un errore imprevisto: '+error.error.message, false)
                }
                if(error.error.message.includes('The token has been blacklisted')){
                  return;
                }
                this.alertService.alertToast('Errore di Connessione al Server',false)
              break;
            }
          }
        }
      )
    )
  }
  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
  //   return next.handle(req).pipe(
  //     retryWhen(error => 
  //       error.pipe(
  //         concatMap((error, count) => {
  //           switch(error.status) {
  //             case 0:
  //               if (count <= retryCount) {
  //                 this.countToast('Connessione al Server: tentativo '+count)
  //                 return of(error);
  //               }
  //               break;
  //             case 500:
  //               if( error.error.message.includes('SQLSTATE[22003]')){
  //                 return this.alertToast('Errore: Controlla di avere inserito correttamente i dati');
  //               }
  //               this.alertToast('Errore di Connessione al Serve')
  //               break;
  //           }
  //         }),
  //         // delay(retryWaitMilliSeconds)
  //       )
  //     )
      // catchError((error) => {
      //   if(error.status === 0){
      //     this.alertToast('Errore di Comunicazione con il Server! Riprovare più tardi.')
      //   }
      //   return throwError(error.message);
      // })
  //   )
  // }

  async alertToast(message:string){
    const toast = await this.toastCtrl.create({
      message: message,
      position: 'bottom',
      cssClass: 'my-custom'
    });
    await toast.present()
  }
  async countToast(message:string){
    const toast = await this.toastCtrl.create({
      message: message,
      position: 'middle',
      cssClass: 'my-custom2'
    });
    await toast.present()
  }
}
