import { Component, OnInit, Output, EventEmitter, ViewEncapsulation, Input } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Title } from '@angular/platform-browser';
import { scheduled,Subscription } from 'rxjs';
import { ListService } from '../list.service';
import { day } from '../../../data/schedule';

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.css']
})
export class ListHeaderComponent implements OnInit {
  isChecked: boolean;
  subscription: Subscription;
  Title: string = "Title";
  dateFrom: string = "2020-10-10";
  dateEnd: string = "2020-10-20";

  @Output() toggle: EventEmitter<any> = new EventEmitter();

  constructor( private listService: ListService) {
    // this.subscription = this.listService.getIsChecked().subscribe(isChecked => {
    //   console.log(isChecked);
    //   console.log(this.isChecked);
    //   console.log(this.listService.isChecked);
    //   this.listService.isChecked = this.isChecked;
    //   this.isChecked=isChecked;
    // })

    this.listService.sharedIsChecked.subscribe(isChecked => this.isChecked = isChecked);
   }

   sendIsChecked(): void {
    //  this.listService.sendIsChecked(true);
    //  console.log(this.listService.isChecked);
    this.listService.isCheckedSubject.next(true);
   }

  day = [];

  ngOnInit(): void {
    this.day = this.listService.getList();
  }
 
  ngOnChanges(): void {
   // this.listService.isChecked;
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
