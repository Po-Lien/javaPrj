import { Component, OnInit, Output, EventEmitter, ViewEncapsulation, Input } from '@angular/core';
import { ListService } from '../list.service';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-list-header-edit',
  templateUrl: './list-header-edit.component.html',
  styleUrls: ['./list-header-edit.component.css']
})
export class ListHeaderEditComponent implements OnInit {
  isChecked: boolean;
  subscription: Subscription;
  Title: string = "Title";
  dateFrom: string = "2020-10-10";
  dateEnd: string = "2020-10-20";
  
  ngOnInit(): void {
    this.day = this.listService.getList();
  }

  day = [];
  selected: number = 0;

  @Output() toggle: EventEmitter<any> = new EventEmitter();

  constructor( private listService: ListService) {
    // this.subscription = this.listService.getIsChecked().subscribe(isChecked => {
    //   this.isChecked=isChecked;
    //   console.log(isChecked);
    // })

    this.listService.sharedIsChecked.subscribe(isChecked => this.isChecked = isChecked);

    console.log(this.listService.getList().length);
    this.selected = this.listService.getList().length;
   }

  sendIsChecked(): void {
    this.listService.isCheckedSubject.next(false);
  }

  emit(){
    this.isChecked;
    this.toggle.emit(MatButtonToggleChange);
  }

  addTab() {
    this.day.push({
      date: '2020/10/10',
      day: '第一天',
      startTime: '8:00',
      endTime: '9:00',
      forcastTime: '1小時',
      place: '台北轉運站',
      address: '103台北市大同區市民大道一段209號'
    });
    console.log(this.day.length);
      this.selected = this.day.length;
  }

  removeTab(index: number) {
    console.log(index)
    this.day.splice(index, 1);
    if(index > 0)
    this.selected = this.day.length - 1;
  }

  // ngOnDistroy() {
  //   this.subscription.unsubscribe;
  // }
}
