import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PatientDto } from '../modals/PatientDto';
import { Patient } from './Patient';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private urlApi = environment.apiUrl;
  private  headers = { 'content-type': 'application/json'};
  constructor(private http: HttpClient){}



  public getPatients(): Observable<PatientDto[]>{

    return this.http.get<PatientDto[]>(this.urlApi+"/patient/all-patients");

  }



  public updatePatient(patient: PatientDto, idPatient:number): Observable<any>{

    return this.http.put<PatientDto>(`${this.urlApi}/patient/update-patient/${idPatient}`, patient, {"headers": this.headers});
  }


  public deletePatient(patientId: number): Observable<void>{
    return this.http.delete<void>(`${this.urlApi}/patient/delete-patient/${patientId}`, {"headers": this.headers});
  }
}
