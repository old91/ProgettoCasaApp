import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Apartament } from 'src/app/Models/apartament';
import { ApartamentsService } from 'src/app/Services/apartaments.service';
import Swiper from 'swiper';
import SwiperCore, { Pagination } from 'swiper';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-apartament',
  templateUrl: './apartament.component.html',
  styleUrls: ['./apartament.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ApartamentComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute, private apart:ApartamentsService, private loadingCtrl:LoadingController) { }
  id:any;
  apartament:Apartament;
  images;
  swiper = new Swiper('.swiper-container', {
    centeredSlides:true,
  })
  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading data...',
    });
    await loading.present();
    this.id=this.activatedRoute.snapshot.paramMap.get("id");
    this.apart.getApartament(this.id).subscribe(
      res =>{
        this.apartament = res
        this.images = JSON.parse(this.apartament.images)
        loading.dismiss()
      },
    )
  }
}
