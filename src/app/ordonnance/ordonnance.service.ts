import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrdonnanceDto } from '../modals/OrdonnanceDto';

@Injectable({
  providedIn: 'root'
})
export class OrdonnanceService {

  apiUri = environment.apiUrl;
   private  headers = { 'content-type': 'application/json'};

  constructor(private httpClient: HttpClient) { }



  public getOrdonnances(): Observable<OrdonnanceDto[]>{
    return this.httpClient.get<OrdonnanceDto[]>(`${this.apiUri}/ordonnance/all-ordonnances`);
  }

  public updateOrdonnace(ordonnance: OrdonnanceDto,idOrdonnance: any): Observable<any>{
    return this.httpClient.put(`${this.apiUri}/ordonnance/update-ordonnance/${idOrdonnance}`, ordonnance, {"headers": this.headers});
  }

  public deleteOrdonnance(idOrdonnance: any): Observable<any>{
    return this.httpClient.delete(`${this.apiUri}/ordonnance/delete-ordonnance/${idOrdonnance}`,{"headers": this.headers});
  }


}
