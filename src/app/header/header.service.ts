import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  sideNav: boolean = false;
  public sideNavSubject = new BehaviorSubject<any>(this.sideNav);
  sharedSideNavSubject = this.sideNavSubject.asObservable();
}
