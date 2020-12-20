import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Demo';
  leftOpened = false;

  constructor( private authService: AuthService ){ 
  }

  toggle(){
    this.leftOpened = !this.leftOpened;
  }


}
