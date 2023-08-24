import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }

  authenticate(username:string, password: String):boolean
  {
    if(username==='Ashmeet' && password==='dummy'){
      sessionStorage.setItem('authenticatedUser', username);
      return true;
    }
    else
      return false;
  }

  isUserLoggedIn():boolean{
    let user = sessionStorage.getItem('authenticatedUser');
    return !(user === null);
  }

  logout()
  {
    sessionStorage.removeItem('authenticatedUser');
  }
}