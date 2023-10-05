import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';

const TOKEN_ACCESS_DIR = 'ProgettoCasaApp/Token/token-access.txt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  token:string;

  constructor(
    private jwtHelper: JwtHelperService,
  ){}

  idByToken():number{
    let t = this.jwtHelper.decodeToken(this.token);
    return t.id
  }

  async writeTokenAccess(token:string){
    const savedFile = await Filesystem.writeFile({
      path: TOKEN_ACCESS_DIR,
      data: token,
      directory: Directory.Data,
      encoding: Encoding.UTF16
    });
  }

  async getTokenAccess(){
    const readFile = await Filesystem.readFile({
      path: TOKEN_ACCESS_DIR,
      directory: Directory.Data,
      encoding: Encoding.UTF16
    }).then( res =>{
      this.token = res.data;
      return true
    },
      (err) => {
        return false
    });
  }

  async deleteToken(){
    const deleteFile = await Filesystem.deleteFile({
      path: TOKEN_ACCESS_DIR,
      directory: Directory.Data, 
    }).then( 
      ()=>{this.token = ''},
      (err)=>{ this.token=''}
    )
  }
}
