import { Component, OnInit, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { ContainerService } from '../Services/container.service';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent{

  constructor(private sideNav: ContainerService) { }

  @Output() toggle: EventEmitter<any> = new EventEmitter();

  toggleActive:boolean = false;

	toggleSidenav() {
		this.toggleActive = !this.toggleActive;
    this.sideNav.toggle();
    
    //this.sideNavService.toggle();

    console.log('Clicked');
  }
  
  emit(){
    this.toggle.emit(null);
  }
}
