import { PatientDto } from "./PatientDto";

export interface FactureDto{
  id?:        number;
  montant?:   number;
  createdAt?: Date;
  isEnabled?: boolean;
  patient?:   PatientDto;
}
