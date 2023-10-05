export class User {
    id?:number
    name?: string;
    surname?: string;
    email?: string;
    ref?: string;
    first?:number;
    password?: string;
    role?: string;
    keepConnection?:boolean;
    constructor(){
        this.role = ''
    }
}