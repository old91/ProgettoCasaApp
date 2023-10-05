import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Apartament } from 'src/app/models/apartament';
import { ApartamentsService } from 'src/app/Services/apartaments.service';
import Swiper from 'swiper';
import SwiperCore, { Pagination } from 'swiper';

SwiperCore.use([Pagination]);


interface LocalFile {
  name: string;
  path: string;
  data: string;
}

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PreviewComponent implements OnInit, ViewWillEnter{
  images:Array<LocalFile> = JSON.parse(this.apartService.apartament.images);
  index:number=1;
  apartament:Apartament;
  constructor(private apartService:ApartamentsService) {
    this.apartament = this.apartService.apartament;
   }
  swiper = new Swiper('.swiper-container', {
    centeredSlides:true,
  })
  ionViewWillEnter(){
    this.apartService.step = 4;
  }
  ngOnInit() {
  }
  
}
