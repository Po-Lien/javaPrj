import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../_services';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(
    private router: Router,
    private accountService: AccountService) { 
      
      // redirect to home if already logged in
      if (this.accountService.userValue) {
          this.router.navigate(['/trips']);
      }
    }

  ngOnInit(): void {
  }

}
