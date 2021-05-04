import { Component, OnInit, Input, Output, EventEmitter, PLATFORM_ID, Inject } from '@angular/core';
import { ListService } from '../list.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-list-content',
  templateUrl: './list-content.component.html',
  styleUrls: ['./list-content.component.css']
})

export class ListContentComponent implements OnInit {
  @Input() dayContent: [];
  @Input() selected;
  @Output() selectChange = new EventEmitter<number>();
  @Input() titleId;

  isChecked: boolean;
  schedule: any;
  tourism = [];
  //i: number = 0;
  tourismList = [];
  tourismCheck;

  constructor( private listService: ListService,
    @Inject(PLATFORM_ID) private platformid: object ) { 
      this.listService.sharedIsChecked.subscribe(isChecked => this.isChecked = isChecked);
      listService.sharedDayTestSubject.subscribe( schedule => this.schedule = schedule);

      this.schedule[0].day.forEach( list => this.tourism.push(
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

  selectedBind( i: number){
      this.selected = i;
      this.selectChange.emit(this.selected);
    }
    
    //set focus on element test
  // log = (event) => {
  //   console.log(event.target.name);
  // }

  // setFocus(){
  //   if(isPlatformBrowser(this.platformid)){
  //     this.selected.nativeElement.focus();
  //   }
  // }

}
