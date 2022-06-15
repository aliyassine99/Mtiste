import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RendezVous } from './RendezVous';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {


  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }


  public getRendezVous(): Observable<RendezVous[]>{
    return this.http.get<RendezVous[]>(`${this.apiUrl}/rendez-vous/all`);
  }

  public addRendezVous(rendezVous: RendezVous): Observable<RendezVous>{
   return  this.http.post<RendezVous>(`${this.apiUrl}/rendez-vous/add`, rendezVous);
  }

  public updateRendezVous (rendezVous: RendezVous): Observable<RendezVous>{

    return this.http.put<RendezVous>(`${this.apiUrl}/rendez-vous/update`, rendezVous);
  }

  public deleteRendezVous(rendezVousId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/rendez-vous/delete/${rendezVousId}`);
  }


}
