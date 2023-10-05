import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {

  rows = [0,2,4,6];

  columns = [
    {
      title: 'Valutazione Immobile Gratuita',
      icon: 'home'
    },
    {
      title: 'Servizi Idraulici e Elettrici',
      icon: 'thunderstorm'
    },
    {
      title: 'Broker per Mutui Personalizzati',
      icon: 'briefcase'
    },
    {
      title: 'Ristrutturazione',
      icon: 'construct'
    },
    {
      title: 'Servizi Tecnici per Pratiche Edilizie',
      icon: 'document-text'
    },
    {
      title: 'Servizio Fotografico Immobile',
      icon: 'camera'
    },
    {
      title: 'Progettazione e Arredo',
      icon: 'bed'
    },
    {
      title: 'Assistenza Legale e Fiscale',
      icon: 'cash'
    }
  ]

  constructor() { }

  ngOnInit() {}

}
