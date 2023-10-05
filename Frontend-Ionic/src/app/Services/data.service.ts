import { Injectable } from '@angular/core';
import { AdminService } from './admin.service';
import { ApartamentsService } from './apartaments.service';
import { AuthService } from './auth.service';
import { DeviceService } from './device.service';
import { FavService } from './fav.service';
import { FilterService } from './filter.service';
import { TokenService } from './token.service';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private apartService:ApartamentsService,
    private favService:FavService,
    private filterService:FilterService,
    private userService:UserService,
    private authService:AuthService,
    private tokenService:TokenService,
    private adminService:AdminService,
    private deviceService:DeviceService
  ) { }

  async getApartamentsData(){ 
    await this.apartService.startApartaments(); 
  }
  async getFavoritesData(){
    await this.favService.startFavorites(this.apartService.dataApartaments)
  }

  async getFiltersData(){
    await this.filterService.startFavorites();
  }

  async getUserData(){
    if(this.authService.isLoggedIn()){
      const id = this.tokenService.idByToken();
      const promise = this.userService.getUser(id).toPromise();
      await promise;
    }
  }
  async getUsersData(){
    if(this.authService.isLoggedIn() && this.authService.isAdmin()){
      const promise = this.adminService.getUsers().toPromise();
      await promise;
    }
  }
  async getDraftsData(){
    if(this.authService.isLoggedIn()){
      const promise = this.apartService.getDrafts().toPromise();
      await promise;
    }
  }
  async getDevicesData(){
    if(this.authService.isLoggedIn()){
      const promise = this.deviceService.getDevices(this.tokenService.idByToken()).toPromise();
      await promise;
    }
  }
  async getTokenData(){
    await this.tokenService.getTokenAccess().then( () => {
      if(this.tokenService.token){
        return this.authService.isAuthenticated=true;
      }
      return this.authService.isAuthenticated=false;
    } )
    // this.authService.isAuthenticated.next(await this.tokenService.getTokenAccess())
  }
}
 
