import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signout(){
    window.sessionStorage.clear();
  }

/*

  public getToken(): Token | null {
    const token = window.sessionStorage.getItem("jwt");
    if (token) {
      return JSON.parse(token);
    }
    return null;
  }


  public getTokenValue(): string | null {
    const token=this.getToken();
    if (token) {
      return token.jwttoken;
    }
    return null;
  }

  public getRoles(): string[] | null {
    const token=this.getToken();
    if (token) {
      return token.roles;
    }
    return null;
  }

  public getUsername(): string | null {
    const token=this.getToken();
    if (token) {
      return token.username;
    }
    return null;
  }

  public hasRole(role:string): boolean | null {
    const token=this.getToken();
    if (token) {
      console.log('token.roles',token.roles);
      console.log('token.roles.includes(role)',token.roles.includes(role));
      return token.roles.includes(role);
      }
      return null;
      }*/
}
