import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, Observable, pipe, throwError } from "rxjs";

export class ErrorInterceptor implements  HttpInterceptor{


  constructor(private router: Router,
    private route: ActivatedRoute){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{



     return next.handle(request).pipe(catchError( err => {
      if([401,403].indexOf(err.status) !== -1){

        this.router.navigate(["/error"], {relativeTo: this.route});

      }

        return throwError( err );




     }));

 return next.handle(request);



   }
}
