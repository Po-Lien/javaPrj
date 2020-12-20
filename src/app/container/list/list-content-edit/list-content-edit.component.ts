import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list-content-edit',
  templateUrl: './list-content-edit.component.html',
  styleUrls: ['./list-content-edit.component.css']
})
export class ListContentEditComponent implements OnInit {
  isChecked: boolean;

  constructor( private listService: ListService) {
    listService.sharedIsChecked.subscribe(isChecked => this.isChecked = isChecked);
   }

   day = [];
  
   ngOnInit() {
     this.day = this.listService.getList();
   }
}
