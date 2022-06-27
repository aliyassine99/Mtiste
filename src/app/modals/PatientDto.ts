import { RendezVousDto } from "./RendezVousDto";

export interface PatientDto{




     id?: number,
     cin?:string ,
     nomComplet?: string,
      dateNaissance?: Date,
     sexe?: string,
    email?: string,
     telephone?: number,
     adresse?: string,
     rendezVous?: RendezVousDto[]





  }

