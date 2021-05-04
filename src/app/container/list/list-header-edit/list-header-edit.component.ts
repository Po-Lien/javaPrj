import { Component, OnInit, Output, EventEmitter, ViewEncapsulation, Input } from '@angular/core';
import { ListService } from '../list.service';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Subscription } from 'rxjs';
import { day } from '../../../data/schedule';
import { schedule } from '../../../data/test';
import '../../../methods/array.extention';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-list-header-edit',
  templateUrl: './list-header-edit.component.html',
  styleUrls: ['./list-header-edit.component.css']
})
export class ListHeaderEditComponent implements OnInit {
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
  @Output() toggle: EventEmitter<any> = new EventEmitter();
  
  constructor( 
    private listService: ListService,
    private route: ActivatedRoute
    ) {
      this.titleId = this.route.snapshot.params["titleId"];

      this.listService.sharedIsChecked.subscribe(isChecked => this.isChecked = isChecked);
      this.listService.sharedDayTestSubject.subscribe(dayTest => this.dayTest = dayTest)//.filter(list => list.titleId === this.titleId))
      
      this.Title = this.dayTest[0].title;

      this.dayTest[0].day.map(list => this.day.push(
          {
            date: list.date,
            day: list.day,
            week: list.week,
            tourism: list.tourism
          }
      ));
      
      this.selected = this.day.length;
      
      this.day.forEach(list => this.date.push(list.date));
      
      this.fromDate = this.date[0];
      this.endDate = this.date[this.selected - 1];

    }
  
  ngOnInit(): void {
  }

  isChange() {
    let changeAll = new Array;
    let changeDate = new Array;
    let addTourism = new Array;
    let changeDayAll = new Array
    for( let i = 0; i < this.day.length; i++){
      let currentDate = new Date(this.fromDate);
      if(i == 0){
        let weekday = currentDate.getDay();
        let week = this.listService.changeToWeek(weekday);

        addTourism.push(
          {
            startTime: '8:00',
            endTime: '',
            forcastTime: '',
            place: '',
            address: ''
          }
        )
        
        changeDayAll.push(
          {
            date: this.fromDate,
            day: '第一天',
            week: week,
            tourism: addTourism
          }
        )
        changeDate.push(this.fromDate);
        }else{
          let currentDate = new Date(changeDayAll[i - 1].date);
          let nextDate = new Date(currentDate.setDate(currentDate.getDate() + 1)).toISOString().split('T')[0];
          let days = this.listService.changeToCN( i + 1 );
          let weekday = currentDate.getDay();
          let week = this.listService.changeToWeek(weekday);
          
          addTourism.push(
            {
              startTime: '8:00',
              endTime: '',
              forcastTime: '',
              place: '',
              address: ''
            }
          )

          changeDayAll.push(
            {
              date: nextDate,
              day: '第' + days + '天',
              week: week,
              toursim: addTourism
            }
          )
          changeDate.push(nextDate);
          changeAll.push(
            {
              owner:'',
              member:'',
              titleId:5,
              title:'',
              day:changeDayAll
            }
          )
      }
    }

    this.day = changeDayAll;
    this.dayTest =changeAll;
    this.date = changeDate;
    this.endDate = changeDayAll[this.day.length - 1].date;
  }

  sendIsChecked(): void {
    this.dayTest[0].title = this.Title;
    this.dayTest[0].day = this.day;
    //console.log(this.dayTest);
    this.listService.isCheckedSubject.next(false);
    //this.listService.daySubject.next(this.day);
    //this.listService.titleSubject.next(this.Title);
    this.listService.dayTestSubject.next(this.dayTest);
  }

  emit(){
    this.isChecked;
    this.toggle.emit(MatButtonToggleChange);
  }

  addTab(index: number) {
    let selectedCN: string
    if(index == 0){
      selectedCN = this.listService.changeToCN(index + 2);
    }else{
      selectedCN = this.listService.changeToCN(index + 1);
    }
    
    let currentDate = new Date(this.endDate);
    let nextDate = new Date(currentDate.setDate(currentDate.getDate() + 1)).toISOString().split('T')[0];
    
    let weekday = currentDate.getDay();
    let week = this.listService.changeToWeek(weekday);

    let addTourism = new Array;

    addTourism.push({
      startTime: '8:00',
      endTime: '',
      forcastTime: '',
      place: '',
      address: ''
    })

    this.day.push({
      date: nextDate,
      day: '第'+ selectedCN +'天',
      week: week,
      tourism: addTourism
    });
    this.date.push(
      nextDate
    );
    //this.day = this.dayTest.day.map(data => Object.values(data)[4]);
    this.selected = this.day.length;
    this.endDate = this.date[this.selected - 1];
  }

  removeTab(index: number) {
    if(index == this.selected - 1)
    {
      //this.dayTest.map(data => Object.values(data)[4]).splice(index, 1);
      this.date.splice(index, 1);
      //this.day = this.dayTest.map(data => Object.values(data)[4]);
      this.day.splice(index, 1);
      this.selected = this.day.length;
      this.endDate = this.date[this.selected - 1];
    }else{
      //this.dayTest.map(data => Object.values(data)[4]).splice(this.day.length - 1, 1);
      this.date.splice(this.date.length - 1, 1);
      //this.day = this.dayTest.map(data => Object.values(data)[4]);
      this.day.splice(this.day.length - 1, 1);
      this.selected = this.day.length;
      this.endDate = this.date[this.selected - 1];
    }
    
  }

  // ngOnDistroy() {
  //   this.subscription.unsubscribe;
  // }
}
