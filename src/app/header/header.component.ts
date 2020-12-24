import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { HeaderService } from './header.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  visible: boolean = false;
  isAuthenticated: boolean;
  sideNav: boolean;
  //@Output() toggle: EventEmitter<any> = new EventEmitter();

  constructor( private authService: AuthService, private headerService: HeaderService) { 
    this.authService.isAuthenticated.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );

    this.headerService.sharedSideNavSubject.subscribe( sideNav => this.sideNav = sideNav);
  }

  async ngOnInit() {
    this.isAuthenticated = await this.authService.checkAuthenticated();
  }

  logout() {
    this.authService.logout('/login');
  }

  emit(){
    this.visible = !this.visible;
    //this.toggle.emit(null);
  }

  sendSideNav(): void {
    this.headerService.sideNavSubject.next(!this.sideNav);
  }

}
