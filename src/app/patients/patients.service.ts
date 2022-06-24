import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Patient } from './Patient';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private urlApi = environment.apiUrl;

  constructor(private http: HttpClient){}

  getEmployees(): Observable<any>{
    return this.http.get(`http://localhost:8888/employees`)
  }

  public getPatients(): Observable<Patient[]>{

    return this.http.get<Patient[]>(`${this.urlApi}/patient/all`);

  }

  public addPatient(patient: Patient): Observable<Patient>{
    return this.http.post<Patient>(`${this.urlApi}/patient/add`, patient);
  }

  public updatePatient(patient: Patient): Observable<Patient>{
    return this.http.put<Patient>(`${this.urlApi}/patient/update`, patient);
  }


  public deletePatient(patientId: number): Observable<void>{
    return this.http.delete<void>(`${this.urlApi}/patient/delete/${patientId}`);
  }
}
