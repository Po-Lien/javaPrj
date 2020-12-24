import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-area',
  templateUrl: './message-area.component.html',
  styleUrls: ['./message-area.component.css']
})
export class MessageAreaComponent implements OnInit {

  constructor() { }

  opened:boolean = false;

  ngOnInit(): void {
  }

  isOpened(){
    this.opened = !this.opened;
  }
  
}
