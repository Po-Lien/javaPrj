import { Component, OnInit, Input } from '@angular/core';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list-content',
  templateUrl: './list-content.component.html',
  styleUrls: ['./list-content.component.css']
})

export class ListContentComponent implements OnInit {
  isChecked: boolean;
  //@Input() opened = true;

  constructor( private listService: ListService) { 
    this.listService.sharedIsChecked.subscribe(isChecked => this.isChecked = isChecked);
  }

  day = [];
  
  ngOnInit() {
    this.day = this.listService.getList();
  }

}
