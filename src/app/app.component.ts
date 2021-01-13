import { Component } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Observable, Subscription } from 'rxjs';
import { AccountService } from './_services';
import { User } from './_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Demo';
  leftOpened = false;
  mediaSub: Subscription;
  deviceXs: boolean;
  deviceLg: boolean;
  deviceXl: boolean;
  user: User;

  constructor(
    private mediaObserver: MediaObserver,
    private accountService: AccountService
     ){ 
      this.accountService.user.subscribe(x => this.user = x);
  }

  toggle(){
    this.leftOpened = !this.leftOpened;
  }


  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        //console.log(result.mqAlias);

        this.deviceLg = result.mqAlias === 'lg' ? true : false;
        this.deviceXl = result.mqAlias === 'xl' ? true : false;
        this.deviceXs = result.mqAlias === 'xs' ? true : false;
      }
    );
  }

}
