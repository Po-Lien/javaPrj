import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Title } from '@angular/platform-browser';
import { scheduled } from 'rxjs';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.css']
})
export class ListHeaderComponent implements OnInit {
  isChecked: boolean = false;
  Title: string = "Title";
  dateFrom: string = "2020-10-10";
  dateEnd: string = "2020-10-20";

  @Output() toggle: EventEmitter<any> = new EventEmitter();

  encapsulation: ViewEncapsulation.None

  constructor( private listService: ListService) { }

  day = [];

  ngOnInit(): void {
    this.day = this.listService.getList();
  }

   emit(){
     this.isChecked = !this.isChecked;
     this.toggle.emit(MatButtonToggleChange);
   }
}
