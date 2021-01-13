import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HeaderService } from '../header/header.service';
import { User } from '../_models';
import { AccountService } from '../_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  opened: boolean;
  user: User;

  constructor(
    private headerService: HeaderService,
    private breakpointObserver: BreakpointObserver,
    private accountService: AccountService) {
        this.headerService.sideNavSubject.subscribe(opened => this.opened = opened);
        this.user = this.accountService.userValue;
    }

  ngOnInit(): void {
  }


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
  
}
