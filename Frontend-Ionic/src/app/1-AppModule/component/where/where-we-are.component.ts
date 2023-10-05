import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { LaunchNavigator} from '@awesome-cordova-plugins/launch-navigator/ngx';
import { LaunchNavigatorOptions } from 'uk.co.workingedge.phonegap.plugin.launchnavigator';

@Component({
  selector: 'app-where-we-are',
  templateUrl: './where-we-are.component.html',
  styleUrls: ['./where-we-are.component.scss'],
})
export class WhereWeAreComponent implements OnInit {

  Orari = [
    {
      giorno: 'Lunedi',
      mattina: '09:30–12:30',
      pomeriggio: ' 15:00–19:30',
      chiuso: false,
    },
    {
      giorno: 'Martedi',
      mattina: '09:30–12:30',
      pomeriggio: ' 15:00–19:30',
      chiuso: false,
    },
    {
      giorno: 'Mercoledi',
      mattina: '09:30–12:30',
      pomeriggio: ' 15:00–19:30',
      chiuso: false,
    },
    {
      giorno: 'Giovedi',
      mattina: '09:30–12:30',
      pomeriggio: ' 15:00–19:30',
      chiuso: false,
    },
    {
      giorno: 'Venerdi',
      mattina: '09:30–12:30',
      pomeriggio: ' 15:00–19:30',
      chiuso: false,
    },
    {
      giorno: 'Sabato',
      mattina: '09:30–12:30',
      pomeriggio: ' 15:00–19:30',
      chiuso: false,
    },
    {
      giorno: 'Domenica',
      mattina: '09:30–12:30',
      pomeriggio: ' 15:00–19:30',
      chiuso: true,
    }
  ]

  constructor( private launchNavigator: LaunchNavigator, private callNumber:CallNumber) { }
  
  doNavigate(){
    let options: LaunchNavigatorOptions = {
      start: 'London, ON',
    }
    this.launchNavigator.navigate('Toronto, ON', options)
  }
  doCall(){
    this.callNumber.callNumber("+390541382847", true)
  }

  ngOnInit() {}

}