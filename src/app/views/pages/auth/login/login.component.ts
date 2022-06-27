import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../login.service';
import jwt_decode from "jwt-decode";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: any;
  username: string;
  password: string;
  error: boolean;
  constructor(private router: Router,
              private loginService: LoginService,
              private route: ActivatedRoute
              ) { }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLoggedin(e: Event) {
    e.preventDefault();
    localStorage.setItem('isLoggedin', 'true');
    if (localStorage.getItem('isLoggedin')) {
      this.router.navigate([this.returnUrl]);
    }
  }




  sendLogin(username: string, password: string){

    this.loginService.sendAuthentication(username,password).subscribe(element=> {


      let jwt:any = jwt_decode(element)
      localStorage.setItem("jwt", element);
      localStorage.setItem("roles", JSON.stringify(jwt.roles));
      jwt.roles.forEach((element: any) => {
        if(element.authority === "ADMIN"){
          this.router.navigate(["/dashboard"], {relativeTo: this.route});
        }

        else{
          this.router.navigate(["/reservation/edit-reservation"], {relativeTo: this.route});
        }

      });
    }, error=>{
      this.error= true;
      console.log("error")
    }



    );


  }



}
