import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { HeaderService } from './header.service';
import { AccountService } from '../_services';

import { User } from '../_models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  visible: boolean = false;
  isAuthenticated: boolean;
  sideNav: boolean;
  user: User;
  @Input() deviceXs:boolean;
  @Input() deviceLg:boolean;
  @Input() deviceXl:boolean;
  //@Output() toggle: EventEmitter<any> = new EventEmitter();

  constructor( private accountService: AccountService, private headerService: HeaderService) { 
    this.accountService.user.subscribe(x => this.user = x);

    this.headerService.sharedSideNavSubject.subscribe( sideNav => this.sideNav = sideNav);
  }

  ngOnInit() {
  }

  logout() {
    this.accountService.logout();
  }

  emit(){
    this.visible = !this.visible;
    //this.toggle.emit(null);
  }

  sendSideNav(): void {
    this.headerService.sideNavSubject.next(!this.sideNav);
  }

}
