import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApartamentsService } from 'src/app/Services/apartaments.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(private apart:ApartamentsService, private router: Router) { }

  isChecked(button){
    if(this.router.url == button){
      return 'segment-button-checked'
    }
  }
  ngOnInit() {}

}