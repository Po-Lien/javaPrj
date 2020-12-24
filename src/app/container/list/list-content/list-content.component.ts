import { Component, OnInit, Input } from '@angular/core';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list-content',
  templateUrl: './list-content.component.html',
  styleUrls: ['./list-content.component.css']
})

export class ListContentComponent implements OnInit {
  @Input() dayContent: [];
  isChecked: boolean;
  schedule: any;
  tourism = [];
  //i: number = 0;
  tourismList = [];
  tourismCheck;

  constructor( private listService: ListService) { 
    this.listService.sharedIsChecked.subscribe(isChecked => this.isChecked = isChecked);
    listService.sharedDayTestSubject.subscribe( schedule => this.schedule = schedule);

    this.schedule.day.forEach( list => this.tourism.push(
      list.tourism
      ));
  }

  // doTourismAdd(): void {
  //   this.tourismList = this.tourism[this.i++];
  //   if(this.tourismList != undefined)
  //   this.tourismCheck = Object.values(this.tourismList[0])[3];
  //  };
  
  ngOnInit() {
  }

}
