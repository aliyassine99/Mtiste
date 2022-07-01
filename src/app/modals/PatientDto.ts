import { FactureDto } from "./FactureDto";
import { RendezVousDto } from "./RendezVousDto";

export interface PatientDto{


   id?: number,
     cin?:string ,
     nomPrenom?: string,
    sexe?: string,
     dateNaissance?: Date,
     email?: string,
    telephone?: number,
    adresse?: string,
    rendezVous?: RendezVousDto[]
    factures?: FactureDto[];








  }

