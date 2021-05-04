import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HeaderService } from '../header/header.service';
import { ListService } from '../container/list/list.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { AccountService } from '../_services';
import { User } from '../_models';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  opened: boolean;
  data: any;
  trips = [];
  mediaSub: Subscription;
  deviceXs: boolean;
  user: User;
  titleId = [];

  constructor(
    private headerService: HeaderService,
    private breakpointObserver: BreakpointObserver,
    private listService: ListService,
    private mediaObserver: MediaObserver,
    private accountService: AccountService,
    public dialog: MatDialog,
    private router: Router
    ) {
    this.headerService.sharedSideNavSubject.subscribe( opened => this.opened = opened);
    this.listService.sharedDayTestSubject.subscribe( trip => this.data = trip);
    this.user = this.accountService.userValue;

    const index = this.data[0].day.length - 1;

    this.data.map( list => this.trips.push({
      owner: list.owner,
      member: list.member,
      title: list.title,
      titleId: list.titleId,
      fromDate: list.day[0].date,
      endDate: list.day[index].date
    }));

    this.trips.forEach(list => this.titleId.push( list.titleId))

  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogSetScheduleDialog);

    dialogRef.afterClosed().subscribe( result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        //console.log(result.mqAlias);
      }
    );
  }

  ngOnDestroy(){
    this.mediaSub.unsubscribe();
  }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

}

@Component({
  selector: 'dialog-set-schedule-dialog',
  templateUrl: 'dialog-set-schedule-dialog.html',
  styleUrls: ['dialog-set-schedule-dialog.css']
})

export class DialogSetScheduleDialog implements OnInit{
  tripName: string;
  currentDate: string;
  days: number;
  form: FormGroup;

  constructor(
    private fb: FormBuilder  
    ){
      this.currentDate = new Date().toISOString().split('T')[0];
      console.log(this.currentDate);
      this.days = 3;
    };

  ngOnInit() {
    this.form = this.fb.group({
      tripName: ['', Validators.required],
      currentDate: ['', Validators.required],
      days: ['', Validators.required]
    })
  };

  onSubmit(){};
}
