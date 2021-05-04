import { Component } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Observable, Subscription } from 'rxjs';
import { AccountService, DeviceService } from './_services';
import { User } from './_models';
import { device } from './data/device';

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
  device: device;
  user: User;

  constructor(
    private mediaObserver: MediaObserver,
    private accountService: AccountService,
    private deviceService: DeviceService
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

        this.device = {
          xl: result.mqAlias === 'xl' ? true : false,
          lg: result.mqAlias === 'lg' ? true : false,
          md: result.mqAlias === 'md' ? true : false,
          sm: result.mqAlias === 'sm' ? true : false,
          xs: result.mqAlias === 'xs' ? true : false,
        }
        //console.log("appComponent:"+Object.values(this.device));
        this.deviceService.deviceSubject.next(this.device);
      }
    );
  }

}
