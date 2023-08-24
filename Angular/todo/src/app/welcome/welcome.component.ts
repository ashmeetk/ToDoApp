import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  name = '';
  welcomeMessageFromService:string | undefined;

  constructor(private activatedRoute: ActivatedRoute, private welcomeDataService: WelcomeDataService) { }

  ngOnInit(): void {
    this.name= this.activatedRoute.snapshot.params['name'];
  }

  getWelcomeMessage(){
    this.welcomeDataService.executeHelloWorldBeanService().subscribe(
      (response)=> this.handleSuccessfulResponse(response),
      (error) => this.handleErrorResponse(error)
    );
    console.log('last line of getWelcomeMessage');
  }

  handleSuccessfulResponse(response:any){
    this.welcomeMessageFromService = response.message;
  }

  handleErrorResponse(error: any){
    this.welcomeMessageFromService = error.error.message
  }

  getWelcomeMessageWithPathVariable(){
    this.welcomeDataService.executeHelloWorldBeanServiceWithPathVariable(this.name).subscribe(
      (response)=> this.handleSuccessfulResponse(response),
      (error) => this.handleErrorResponse(error)
    );
    console.log('last line of getWelcomeMessage');
  }
}
