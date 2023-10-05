import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { Apartament } from '../Models/apartament';

const FAV_FILTER_DIR='ProgettoCasaApp/Favorite/filters-list.txt';

const FilterA = ['city','place', 'type', 'locals','floor'];
const FilterB = ['garden','garage','parking','cellar','renovate'];
const FilterC = ['bathrooms','bedrooms'];
const FilterD = ['surface', 'price'];

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  
  orderValue:FormGroup;
  filterValue:FormGroup;
  favoriteFilter:FormGroup;
  apartamentsFilter:FormGroup;
  favoritesList:Apartament[];
  apartamentsList:Apartament[];
  dataFilters = [];

  constructor() { }

  filterApartaments(value:FormGroup, list:Apartament[]):Apartament[]{
    let filter = Object.entries(value);
    filter.forEach( e =>{
      list = this.doFiltering(e[0],e[1],list);
    });
    return list
  }

  doFiltering(index,value,list:Apartament[]):Apartament[]{
    if(FilterA.includes(index)){
      let newList:Apartament[] =[];
      if(value != null){
        value.forEach(v =>{
            newList = newList.concat(list.filter(i => i[index] == v));
        })
        list = newList
      } 
    }else if(FilterB.includes(index)){
      if(value){
        list = list.filter(i => i[index] == value);
      }
    }else if(FilterC.includes(index)){
      let newList:Apartament[] =[];
      if(value != null){
        value.forEach(v =>{
          if(v!='3+' && v!='4+'){
            newList = newList.concat(list.filter(i => i[index] == v));
          }else{
            newList = newList.concat(list.filter(i => i[index] > ((v=='3+')?3:4)));
          }
        })
        list = newList
      }
    }else if (FilterD.includes(index)){
      let min = value.lower*1000;
      let max = value.upper*1000;
      list = list.filter(i =>(i[index]<=max)&&(i[index]>=min));
    }
    return list; 
  }

  //inizializziamo i dati
  async startFavorites(){
    await this.getFiltersList();
  }

  //ricaviamo i dati dal file
  async getFiltersList(){
    await Filesystem.readFile({
      path:FAV_FILTER_DIR,
      directory: Directory.Data,
      encoding: Encoding.UTF8
    })
    .then( 
      (res) => {
        this.dataFilters = JSON.parse(res.data);
      },
      (err) =>{
        return false
      }
    )
  }

  //aggiungi favoriti al file
  async addFilter(filter:FormGroup, name:string){
    filter['title'] = name;
    this.dataFilters.push(filter);
    let data = JSON.stringify(this.dataFilters); 
    await Filesystem.writeFile({
      path: FAV_FILTER_DIR,
      data: data,
      encoding: Encoding.UTF8,
      directory: Directory.Data
    })
  }
  
  //rimuovi favoriti al file
  async rmvFilter(index){
    this.dataFilters.splice(index,1)
    let data = JSON.stringify(this.dataFilters); 
    await Filesystem.writeFile({
      path: FAV_FILTER_DIR,
      data: data,
      encoding: Encoding.UTF8,
      directory: Directory.Data
    })
  }
}
