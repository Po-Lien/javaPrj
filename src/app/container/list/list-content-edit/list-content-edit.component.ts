import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListService } from '../list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-content-edit',
  templateUrl: './list-content-edit.component.html',
  styleUrls: ['./list-content-edit.component.css']
})
export class ListContentEditComponent implements OnInit {
  @Input() dayContent;
  @Input() selected;
  @Output() selectChange = new EventEmitter<number>();
  @Input() titleId;

  isChecked: boolean;
  schedule: any;
  tourism = [];
  constructor( private listService: ListService, private route: ActivatedRoute) {
    listService.sharedIsChecked.subscribe(isChecked => this.isChecked = isChecked);
    listService.sharedDayTestSubject.subscribe( schedule => this.schedule = schedule);
    
    this.schedule[0].day.forEach( list => this.tourism.push(
      list.tourism
    ));
  }
    
  //  doTourismAdd(): void {
  //   this.tourismList = this.tourism[this.i++];
  //   if(this.tourismList != undefined)
  //   this.tourismCheck = Object.values(this.tourismList[0])[3];
  //  };

   ngOnInit() {
   };

   selectedBind( i: number){
    this.selected = i;
    this.selectChange.emit(this.selected);
  }

}
