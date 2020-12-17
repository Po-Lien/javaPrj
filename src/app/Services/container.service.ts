import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';
@Injectable(
  {
  providedIn: 'root'
  }
)
export class ContainerService {
  
	//public sideNavToggleSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  	private sideNav: MatSidenav;

  	constructor() { }
  
	// public toggle() {
	// 	return this.sideNavToggleSubject.next(null);
	// }

	public setSidenav(sidenav: MatSidenav) {
		this.sideNav = sidenav;
	}

  	public open() {
		return this.sideNav.open();
	}

	public close() {
		return this.sideNav.close();
	}

	public toggle(): void {
		this.sideNav.toggle();
	}

	// getContainer(){
	// 	const containerList = [
	// 		{Id: 1, containerName: 'Container'},
	// 		{Id: 1, containerName: 'Container'},
	// 		{Id: 1, containerName: 'Container'}
	// 	]

	// 	return containerList;
	// }
	  

}
