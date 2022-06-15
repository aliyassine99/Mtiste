import { StringMap } from "@angular/compiler/src/compiler_facade_interface";
import { Patient } from "../patients/Patient";

export class RendezVous{


  constructor(
    public id?:number,
    public title?:string,
    public date?: Date,
    public description?: string,
    public patient?: Patient


  ){}
}
