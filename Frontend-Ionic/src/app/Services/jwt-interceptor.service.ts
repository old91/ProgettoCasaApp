import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceService } from './device.service';
import { TokenService } from './token.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService, private deviceService:DeviceService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = this.tokenService.token;
      const deviceId = this.deviceService.deviceId;
      const deviceName = this.deviceService.deviceName;
      request = request.clone({
        setHeaders: 
          {
            authorization: `Bearer ${token}`,
            device_id: `${deviceId}`,
            device_name: `${deviceName}`
      }});
      return next.handle(request);
    }
}
