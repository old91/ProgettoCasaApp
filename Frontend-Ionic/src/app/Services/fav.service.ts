import { Injectable } from '@angular/core';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { Apartament } from '../Models/apartament';
import { ApartamentsService } from './apartaments.service';

const FAV_APARTAMENTS_DIR='ProgettoCasaApp/Favoriti/apartaments-list.txt';


@Injectable({
  providedIn: 'root'
})
export class FavService {

  arrayFavorites:Array<number> = [];
  dataFavorites:Apartament[];


  constructor(private apart:ApartamentsService) { }

  //inizializziamo i dati
  async startFavorites(list){
    await this.getFavoriteApartaments().then( res => this.createFavoritesList(list))
  }

  //ricaviamo i dati dal file
  async getFavoriteApartaments(){
    await Filesystem.readFile({
      path:FAV_APARTAMENTS_DIR,
      directory: Directory.Data,
      encoding: Encoding.UTF8
    })
    .then(
      (res) => {
        this.arrayFavorites = JSON.parse(res.data);
      },
      (err) => {
        return false
      }
    )
  }

  //aggiungi favoriti al file
  async addFavorite(id){
    this.arrayFavorites.push(id);
    let data = JSON.stringify(this.arrayFavorites); 
    await Filesystem.writeFile({
      path: FAV_APARTAMENTS_DIR,
      data: data,
      encoding: Encoding.UTF8,
      directory: Directory.Data
    }).then( ()=>this.createFavoritesList(this.apart.dataApartaments))
  }
  
  createFavoritesList(apartaments:Apartament[]){
    this.dataFavorites = [];
    this.arrayFavorites.forEach( f =>{
      this.dataFavorites.push( apartaments.find( a => a.id == f) ); 
    })
    return this.dataFavorites
  }
  //rimuovi favoriti al file
  async rmvFavorite(id){
    let arr = this.arrayFavorites
    for( var i = 0; i < arr.length; i++){ 
      if ( arr[i] === id) {
        arr.splice(i, 1); 
      }
    }
    this.arrayFavorites = arr;
    let data = JSON.stringify(this.arrayFavorites); 
    await Filesystem.writeFile({
      path: FAV_APARTAMENTS_DIR,
      data: data,
      encoding: Encoding.UTF8,
      directory: Directory.Data
    }).then( ()=>this.createFavoritesList(this.apart.dataApartaments))
  }
}
