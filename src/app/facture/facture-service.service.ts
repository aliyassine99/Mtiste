import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FactureDto } from '../modals/FactureDto';
import { PatientDto } from '../modals/PatientDto';

@Injectable({
  providedIn: 'root'
})
export class FactureServiceService {

  apiUri = environment.apiUrl;
  private  headers = { 'content-type': 'application/json'};
  constructor(private httpClient:HttpClient) { }


  public addFacture(patientFacture: PatientDto): Observable<any>{

    return this.httpClient.post(`${this.apiUri}/patient/save-facture`, patientFacture, {"headers": this.headers});
  }

  public getFactures(): Observable<any>{

    return this.httpClient.get(`${this.apiUri}/facture/all-factures`, {"headers": this.headers});
  }

  public updateFacture(facture: FactureDto, idFacture: any): Observable<any>{

    return this.httpClient.put(`${this.apiUri}/facture/update-facture/${idFacture}`, facture,{"headers": this.headers});
  }

  public deleteFacture(idFacture: any): Observable<any>{

    return this.httpClient.delete(`${this.apiUri}/facture/delete-facture/${idFacture}`, {"headers": this.headers});
  }


}
