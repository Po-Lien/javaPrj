import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  visible: boolean = false;
  isAuthenticated: boolean;

  @Output() toggle: EventEmitter<any> = new EventEmitter();

  constructor( private authService: AuthService) { 
    this.authService.isAuthenticated.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
  }

  async ngOnInit() {
    this.isAuthenticated = await this.authService.checkAuthenticated();
  }

  logout() {
    this.authService.logout('/login');
  }

  emit(){
    this.visible = !this.visible;
    this.toggle.emit(null);
  }
}
