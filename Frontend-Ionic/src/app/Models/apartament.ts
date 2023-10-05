interface LocalFile {
    name: string;
    path: string;
    data: string;
  }
export class Apartament {
    id:number;
    title:string;
    agent:string;
    date:Date;
    city:string;
    macro:string;
    micro:string;
    // map;
    type:string;
    renovate:boolean;
    floor:string;
    floors:number;
    apartaments:number;
    fees:number;
    year:number;
    locals:string;
    bedrooms:number;
    bathrooms:number;
    surface:number;
    balcony:boolean;
    terrace:boolean;
    garage: boolean;
    parking:boolean;
    cellar:boolean;
    garden:boolean;
    price:number;
    estimate:number;
    images:string;
    media:Array<LocalFile>;
    description:string;
    created_at:Date;

}