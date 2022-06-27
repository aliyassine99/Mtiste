import { RendezVousDto } from "./RendezVousDto";

export interface OrdonnanceDto {
  id?:           number;
  description?:  string;
  createdAt?:    Date;
  isEnabled?:    boolean;
  rendezVous?: RendezVousDto;
}
