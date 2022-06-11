import { RendezVous } from "../rendez-vous/RendezVous";

export class Consultation{

constructor(
  public id? : number,
  public description?: string,
  public rendezVous?: RendezVous,
){}
}
