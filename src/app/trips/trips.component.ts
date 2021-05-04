import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HeaderService } from '../header/header.service';
import { ListService } from '../container/list/list.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { AccountService, DeviceService } from '../_services';
import { User } from '../_models';
import { device,days,journeys, dayAdd } from '../data';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
import moment from 'moment';

const momnet = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateAllyLabel: 'LL',
    monthYearAllyLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  opened: boolean;
  //data: any;
  //trips = [];
  titleId: number;
  days: days[];
  mediaSub: Subscription;
  user: User;
  device: device;

  constructor(
    private headerService: HeaderService,
    private breakpointObserver: BreakpointObserver,
    private listService: ListService,
    private mediaObserver: MediaObserver,
    private accountService: AccountService,
    public dialog: MatDialog,
    private router: Router,
    private deviceService: DeviceService
    ) {
    this.headerService.sharedSideNavSubject.subscribe( opened => this.opened = opened);
    //this.listService.sharedDayTestSubject.subscribe( trip => this.data = trip);
    this.user = this.accountService.userValue;
    this.deviceService.sharedDevice.subscribe( size => this.device = size);

    // const index = this.data[0].day.length - 1;

    // this.data.map( list => this.trips.push({
    //   owner: list.owner,
    //   member: list.member,
    //   title: list.title,
    //   titleId: list.titleId,
    //   fromDate: list.day[0].date,
    //   endDate: list.day[index].date
    // }));

    // this.trips.forEach(list => this.titleId.push( list.titleId))

  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogSetScheduleDialog);

    dialogRef.afterClosed().subscribe( result => {
      this.ngOnInit();
      console.log(`Dialog result: ${result}`);
    });
  }

  // tab() {
  //   console.log("tripComponent:"+Object.values(this.device));
  //   if(this.device.xs == true){
  //     return 'max-width: 960px; margin: 0px auto 0 auto;';
  //   }else{
  //     return 'max-width: 960px; margin: 40px auto 0 auto;';
  //   }
  // }

  findDays(){
    this.listService.findDays(this.user.username)
    .subscribe( (data: days[]) => {
      this.days =  data;});
  }
  dayDel(titleId: number){
     // let's call our modal window
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: "400px",
    data: {
        message: "確定要刪除行程?"}
  });
  
    //listen to response
    dialogRef.afterClosed().subscribe(dialogResult => {
      //if user pressed yes dialogResult will be true,
      //if user pressed no - it will be false
      if(dialogResult == true){
        this.listService.dayDel(titleId).subscribe(
          data => {
            this.ngOnInit();
          }
        );
      };
    })
  }

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        //console.log(result.mqAlias);
      }
    );
    this.findDays();
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
  styleUrls: ['dialog-set-schedule-dialog.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_LOCALE, useValue: 'zh-TW'},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class DialogSetScheduleDialog implements OnInit{
  tripName: string;
  currentDate = moment(new Date());
  days: number;
  form: FormGroup;
  submitted = false;
  minDate = moment(new Date());
  user: User;

  @ViewChild('myForm') ngForm: NgForm;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogSetScheduleDialog>,
    private listService: ListService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    ){
      this.days = 3;
      this.user = this.accountService.userValue;
    };

  ngOnInit() {
    this.form = this.fb.group({
      tripName: ['', Validators.required],
      currentDate: new FormControl({value: '', disabled: true}),
      days: ['', [Validators.required, Validators.min(1)]]
    })
  };

  get f() {return this.form.controls; };

  send(){
    this.ngForm.ngSubmit.emit(); 
  };

  onSubmit(){
    this.submitted = true;
    this.addTitle();

    this.dialogRef.close();
  };

  private addTitle() {
    let journey: journeys = {
      title:this.tripName,
      owner:this.user.username
    };
    this.listService.addTitle(journey)
    .subscribe(data => {
      data.titleId;
      if(this.days > 1){
        let List: dayAdd[] = [];
        let date =  this.currentDate.add(-1,'days');
        for( var i = this.days ; i > 0; i--){
          let dayAdd: dayAdd;
          List.push(
            dayAdd = {
              date: date.add(1, 'days').format("YYYY-MM-DD"),
              day: "第" + this.listService.changeToCN(this.days-i + 1) + "天",
              week: this.listService.changeToWeek(date.weekday()),
              titleId: data.titleId,
            });
            date = moment(dayAdd.date);
          }
        this.listService.addDays(List).subscribe();

      }else{
        let List: dayAdd[] = [];
        let dayAdd: dayAdd;
        let date =  this.currentDate;
        dayAdd = {
          date: date.add(1, 'days').format("YYYY-MM-DD"),
          day: "第" + this.listService.changeToCN(this.days-i + 1) + "天",
          week: this.listService.changeToWeek(date.weekday()),
          titleId: data.titleId,
        }
        List.push(dayAdd);
        this.listService.addDays(List).subscribe();
      }
    })
  }
}
