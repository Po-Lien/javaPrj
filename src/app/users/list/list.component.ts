import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from 'src/app/_models';

import { AccountService } from '../../_services';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  users = null;
  currentUser: User;

  constructor(
    private accountService: AccountService,
    public dialog: MatDialog) {
      this.currentUser = accountService.userValue;
      console.log("currentUser:"+this.currentUser.id);
  }
  
  ngOnInit() {
    this.accountService.getAll()
    .pipe(first())
    .subscribe(users => this.users = users);
  }
  
  deleteUser(id: string) {
  // let's call our modal window
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: "400px",
    data: {
        message: "確定要刪除使用者?"}
  });
  
    //listen to response
    dialogRef.afterClosed().subscribe(dialogResult => {
      //if user pressed yes dialogResult will be true,
      //if user pressed no - it will be false
      if(dialogResult == true){
        const user = this.users.find(x => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.users = this.users.filter(x => x.id !== id) 
            });
      }
    })
  }
}
