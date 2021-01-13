import { Component, OnInit, Output, EventEmitter, ViewEncapsulation, Input } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Title } from '@angular/platform-browser';
import { scheduled,Subscription } from 'rxjs';
import { ListService } from '../list.service';
import { day } from '../../../data/schedule';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.css']
})
export class ListHeaderComponent implements OnInit {
  isChecked: boolean;
  subscription: Subscription;
  Title: string;
  titleId: string;
  day = [];
  dayTest: any;
  date = [];
  fromDate: string;
  endDate: string;
  selected: number;
  index: number;
  a:any;
  @Output() toggle: EventEmitter<any> = new EventEmitter();

  constructor( 
    private listService: ListService,
    private route: ActivatedRoute
    ) {
      
        this.titleId = this.route.snapshot.params['titleId'];
        this.listService.sharedIsChecked.subscribe(isChecked => this.isChecked = isChecked);
        this.listService.sharedDayTestSubject.subscribe(dayTest => this.dayTest = dayTest.filter( list => list.titleId === this.titleId));


        this.Title = this.dayTest[0].title;
        this.dayTest[0].day.map(list => this.day.push(
            {
              date: list.date,
              day: list.day,
              week: list.week
            }
          ));
          
          this.selected = this.day.length;
          
          this.day.forEach(list => this.date.push(list.date));
          
          this.fromDate = this.date[0];
          this.endDate = this.date[this.selected - 1];

      }

   sendIsChecked(): void {
    this.listService.isCheckedSubject.next(true);
   }
   

  ngOnInit(): void {
  }
 
  ngOnChanges(): void {
    this.day = this.listService.getList();
  }

  emit(){
    this.isChecked = !this.isChecked;
    this.toggle.emit(MatButtonToggleChange);
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
