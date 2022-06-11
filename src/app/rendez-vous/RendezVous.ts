import { StringMap } from "@angular/compiler/src/compiler_facade_interface";
import { Patient } from "../patients/Patient";

export class RendezVous{


  constructor(
    public title?:string,
    public date?: Date,
    public description?: string


  ){}
}
