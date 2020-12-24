import { Component, OnInit, Output, EventEmitter, ViewEncapsulation, Input } from '@angular/core';
import { ListService } from '../list.service';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Subscription } from 'rxjs';
import { day } from '../../../data/schedule';
import { schedule } from '../../../data/test';
import '../../../methods/array.extention';


@Component({
  selector: 'app-list-header-edit',
  templateUrl: './list-header-edit.component.html',
  styleUrls: ['./list-header-edit.component.css']
})
export class ListHeaderEditComponent implements OnInit {
  isChecked: boolean;
  subscription: Subscription;
  Title: string;
  day = [];
  dayTest: any;
  date = [];
  fromDate: string;
  endDate: string;
  selected: number;
  @Output() toggle: EventEmitter<any> = new EventEmitter();
  
  constructor( private listService: ListService) {
    this.listService.sharedIsChecked.subscribe(isChecked => this.isChecked = isChecked);
    this.listService.sharedTitleSubject.subscribe(title => this.Title = title);
    this.listService.sharedDayTestSubject.subscribe(dayTest => this.dayTest = dayTest)
        
    this.dayTest.day.map(list => this.day.push(
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
  
  ngOnInit(): void {
  }
  
  isChange() {
    let changeAll = new Array;
    let changeDate = new Array;
    let changeDayAll = new Array
    for( let i = 0; i < this.day.length; i++){
      let currentDate = new Date(this.fromDate);
      if(i == 0){
        let weekday = currentDate.getDay();
        let week = this.listService.changeToWeek(weekday);
        
        changeDayAll.push(
          {
            date: this.fromDate,
            day: '第一天',
            week: week,
            startTime: '8:00',
            endTime: '',
            forcastTime: '',
            place: '',
            address: ''
          }
        )
        changeDate.push(this.fromDate);
        }else{
          let currentDate = new Date(changeDayAll[i - 1].date);
          let nextDate = new Date(currentDate.setDate(currentDate.getDate() + 1)).toISOString().split('T')[0];
          let days = this.listService.changeToCN( i + 1 );
          let weekday = currentDate.getDay();
          let week = this.listService.changeToWeek(weekday);
          
          changeDayAll.push(
            {
              date: nextDate,
              day: '第' + days + '天',
              week: week,
              startTime: '8:00',
              endTime: '',
              forcastTime: '',
              place: '',
              address: ''
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
    this.listService.isCheckedSubject.next(false);
    //this.listService.daySubject.next(this.day);
    this.listService.titleSubject.next(this.Title);
    this.listService.dayTestSubject.next(this.dayTest);
  }

  emit(){
    this.isChecked;
    this.toggle.emit(MatButtonToggleChange);
  }

  addTab(index: number) {
    let selectedCN: string = this.listService.changeToCN(index + 1);
    
    let currentDate = new Date(this.endDate);
    let nextDate = new Date(currentDate.setDate(currentDate.getDate() + 1)).toISOString().split('T')[0];
    
    let weekday = currentDate.getDay();
    let week = this.listService.changeToWeek(weekday);

    this.dayTest.map(data => Object.values(data)[4]).push({
      date: nextDate,
      day: '第'+ selectedCN +'天',
      week: week,
      startTime: '8:00',
      endTime: '',
      forcastTime: '',
      place: '',
      address: ''
    });
    this.date.push(
      nextDate
    );
    this.day = this.dayTest.map(data => Object.values(data)[4]);
    this.selected = this.day.length;
    this.endDate = this.date[this.selected - 1];
  }

  removeTab(index: number) {
    if(index == this.selected - 1)
    {
      this.dayTest.map(data => Object.values(data)[4]).splice(index, 1);
      this.date.splice(index, 1);
      this.day = this.dayTest.map(data => Object.values(data)[4]);
      this.selected = this.day.length;
      this.endDate = this.date[this.selected - 1];
    }else{
      this.dayTest.map(data => Object.values(data)[4]).splice(this.day.length - 1, 1);
      this.date.splice(this.date.length - 1, 1);
      this.day = this.dayTest.map(data => Object.values(data)[4]);
      this.selected = this.day.length;
      this.endDate = this.date[this.selected - 1];
    }
    
  }

  // ngOnDistroy() {
  //   this.subscription.unsubscribe;
  // }
}
