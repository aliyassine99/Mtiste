import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { json } from 'ngx-custom-validators/src/app/json/validator';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConsultationDto } from '../modals/ConsulationDto';
import { PatientDto } from '../modals/PatientDto';
import { RendezVousDto } from '../modals/RendezVousDto';
import { RendezVous } from './RendezVous';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {


   apiUrl = environment.apiUrl;
   private  headers = { 'content-type': 'application/json'};
  constructor(private http: HttpClient) { }


  public getRendezVous(): Observable<RendezVousDto[]>{
    return this.http.get<RendezVousDto[]>(this.apiUrl+"/rendez-vous/all-rendez-vous");
  }

  public addRendezVousToPatient(patientRdv: PatientDto): Observable<any>{


   return  this.http.post(`${this.apiUrl}/patient/save-patient`, patientRdv, { "headers" : this.headers });
  }

  public updateRendezVous (rendezVous: RendezVousDto, idRdv:any): Observable<any>{

    return this.http.put<RendezVousDto>(`${this.apiUrl}/rendez-vous/update-rendez-vous/${idRdv}`, rendezVous, {"headers": this.headers});
  }

  public deleteRendezVous(rendezVousId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/rendez-vous/delete-rendez-vous/${rendezVousId}`);
  }

  public addConsultation(rdvConsultation: ConsultationDto):Observable<ConsultationDto>{
    return this.http.post(this.apiUrl+"/rendez-vous/save-consultation", rdvConsultation , {"headers": this.headers});
  }


}
