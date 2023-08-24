import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { AuthenticationBean, BasicAuthenticationService } from '../service/basic-authentication.service';
import { JWTAuthenticationService } from '../service/jwt-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = 'Ashmeet';
  password = 'dummy';
  errorMessage = 'Invalid Credentials';
  invalidLogin = false;

  constructor(private router: Router, private hardcodedAuthenticationService: HardcodedAuthenticationService, 
    private basicAuthenticationService: BasicAuthenticationService, private jWTAuthenticationService: JWTAuthenticationService) { }

  ngOnInit(): void {
  }

  handleLogin()
  {
    if(this.hardcodedAuthenticationService.authenticate(this.username, this.password))
    {
      this.invalidLogin = false;
      this.router.navigate(['welcome', this.username]);
    }
    else
    this.invalidLogin = true;
  }

  handleBasicAuthLogin(){
    this.basicAuthenticationService.executeAuthenticationService(this.username, this.password).subscribe(
      data => {
        console.log(data);
        this.invalidLogin = false;
        this.router.navigate(['welcome', this.username]);
      },
      error =>{
        console.log(error);
        this.invalidLogin = true;
      }
    )
  }

  handleJWTAuthLogin(){
    this.jWTAuthenticationService.executeJWTAuthenticationService(this.username, this.password).subscribe(
      data => {
        console.log(data);
        this.invalidLogin = false;
        this.router.navigate(['welcome', this.username]);
      },
      error =>{
        console.log(error);
        this.invalidLogin = true;
      }
    )
  }

}
