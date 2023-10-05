import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { Device } from '@capacitor/device';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TokenService } from './token.service';

const PAPI = 'http://127.0.0.1:8000/api/save-device';
const RAPI = 'http://127.0.0.1:8000/api/request-device';
const GAPI = 'http://127.0.0.1:8000/api/devices';
const DAPI = 'http://127.0.0.1:8000/api/delete-device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http:HttpClient, private tokenService:TokenService) { }

  //dichiarati in appcomponent
  deviceId;
  deviceName;
  dataDevice;

  async getDeviceInfo(){
    await Device.getId().then(res=>this.deviceId=res.uuid);
    await Device.getInfo().then(res => this.deviceName = res.model);//cambiare per smartphone in res.name
  }

  getDevices(id:number):Observable<any>{
    return this.http.get(GAPI + '/' + id )
      .pipe(
        map((res)=> this.dataDevice = res),
        catchError(this.errorHandler)  
      )
  }

  getDeviceCode():Observable<any>{
    return this.http.post(RAPI,this.tokenService.idByToken())
      .pipe(
        map((response) => response),
        catchError(this.errorHandler)
      );
  }

  registerDevice($request):Observable<any>{
    return this.http.post(PAPI,$request)
    .pipe(
      map((response) => response),
      catchError(this.errorHandler)
    );
  }

  deleteDevice(id):Observable<any>{
    return this.http.delete(DAPI+'/'+id)
    .pipe(
      map((response)=>response),
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: HttpErrorResponse): any {
    return throwError(error || {message: 'App deviceService - Server Error'});
  }
}
