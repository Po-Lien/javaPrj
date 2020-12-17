import { Component, OnInit, Input } from '@angular/core';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list-content',
  templateUrl: './list-content.component.html',
  styleUrls: ['./list-content.component.css']
})

export class ListContentComponent implements OnInit {

  @Input() opened = true;

  constructor( private listService: ListService) { 
  }

  day = [];
  isChecked: string='';
  
  ngOnInit() {
    this.day = this.listService.getList();
  }

}
