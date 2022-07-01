import { Patient } from "../patients/Patient";
import { ConsultationDto } from "./ConsulationDto";
import { PatientDto } from "./PatientDto";

export interface RendezVousDto {

     id?: number,
     dateVisite?: string,
     heureVisite?: string,
     etat?: string;
     patient?: PatientDto,
     consultation?: ConsultationDto







}
