import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utilisateur } from './Utilisateur';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

sendAuthentication(username: string, password: string): Observable<any>{

  //let user= {"username": username, "password": password}

  let user: Utilisateur = new Utilisateur(username,password);
    return this.http.post(`${this.apiUrl}/api/login`, user , {responseType: "text"})
  }}
