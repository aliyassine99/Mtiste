import { StringMap } from "@angular/compiler/src/compiler_facade_interface";
import { Patient } from "../patients/Patient";

export class RendezVous{


  constructor(

    public name?:string,
    public salary?:number,
    public fonction?:string,
    public dateRdv?: string,
    public heureRdv?: string,
    public date?: Date,



  ){}
}
