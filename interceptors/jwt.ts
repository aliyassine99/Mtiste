import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class JwtService implements HttpInterceptor{


  permitAll = "auth";


  constructor(){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

   if( request.url.indexOf(this.permitAll)=== -1){
        let jwt = localStorage.getItem("jwt");
        request= request.clone({
          setHeaders:{
            Authorization: 'Bearer '+jwt
          }
        });

   }
    return next.handle(request);

  }
}
