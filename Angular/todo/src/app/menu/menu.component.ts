import { Component, OnInit } from '@angular/core';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { JWTAuthenticationService } from '../service/jwt-authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  constructor(public hardcodedAuthentication: HardcodedAuthenticationService, public jWTAuthenticationService: JWTAuthenticationService) { }

  ngOnInit(): void {
  }

}
