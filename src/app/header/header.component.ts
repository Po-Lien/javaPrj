import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  visible: boolean = false;

  @Output() toggle: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  emit(){
    this.visible = !this.visible;
    this.toggle.emit(null);
  }
}
