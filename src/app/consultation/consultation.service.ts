import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConsultationDto } from '../modals/ConsulationDto';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

   apiUri = environment.apiUrl;
   private  headers = { 'content-type': 'application/json'};

  constructor(private httpClient: HttpClient) { }


  public getConsultation(): Observable<ConsultationDto[]>{
    return this.httpClient.get<ConsultationDto[]>(`${this.apiUri}/consultation/all-consultations`);
  }

  public addConsultation(consultation: ConsultationDto): Observable<any>{
    return this.httpClient.post<ConsultationDto>(`${this.apiUri}/rendez-vous/save-consultation`, consultation, { "headers": this.headers});
  }

  public updateConsultatio(consultation: ConsultationDto, consultationId: any): Observable<any>{
    return this.httpClient.put(`${this.apiUri}/consultation/update-consultation/${consultationId}`, consultation,{"headers": this.headers});
  }

  public deleteConsultation(consultationId: any): Observable<any>{
    return this.httpClient.delete<ConsultationDto>(`${this.apiUri}/consultation/delete-consultation/${consultationId}`);
  }

  public addOrdonnance(consultation: ConsultationDto): Observable<any>{
    return this.httpClient.post<ConsultationDto>(`${this.apiUri}/consultation/save-ordonnance`, consultation,{"headers": this.headers});
  }
}
