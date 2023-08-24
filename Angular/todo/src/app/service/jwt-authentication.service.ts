import { Injectable } from '@angular/core';
import { HelloWorldBean } from './data/welcome-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { APP_URL } from '../app.constants';

export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticatedUser'

@Injectable({
  providedIn: 'root'
})
export class JWTAuthenticationService {

  constructor(private http: HttpClient) { }

  isUserLoggedIn():boolean{
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }

  logout()
  {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }

  executeJWTAuthenticationService(username:string, password:string){
    return this.http.post(`${APP_URL}/authenticate`, {
      username,
      password
    }).pipe(
      map(
        (data: any) =>{
          
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
          console.log('token set is: ' + TOKEN);
          return data;
        }
      )
    );
  }

  getAuthenticatedUser(){
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken(){
    if(this.getAuthenticatedUser())
    return sessionStorage.getItem(TOKEN);
    else
    return null;
  }

}

export class AuthenticationBean{
  constructor(public message: string) { }
}