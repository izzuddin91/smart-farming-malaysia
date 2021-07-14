import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'smart-farming-malaysia';

  constructor( private readonly router: Router){

  }

  aboutPage(){
    this.router.navigate(['/about'], { state: { updatingUser: false } });
  }

  contactPage(){
    this.router.navigate(['/contact'], { state: { updatingUser: false } });
  }

  architecturePage(){
    this.router.navigate(['/architecture'], { state: { updatingUser: false } });
  }

  mediaPage(){
    this.router.navigate(['/media'], { state: { updatingUser: false } });
  }

  homePage(){
    this.router.navigate([''], { state: { updatingUser: false } });
  }
}
