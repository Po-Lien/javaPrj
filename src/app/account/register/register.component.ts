import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService} from '../../_services';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  form: FormGroup;
  loading = false;
  submitted = false;
  tokenName = "";

  constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
  ) { 
      // redirect to home if already logged in
      if (this.accountService.userValue) {
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
    // this.form = this.formBuilder.group({
    //     firstName: ['', Validators.required],
    //     lastName: ['', Validators.required],
    //     username: ['', Validators.required],
    //     password: ['', [Validators.required, Validators.minLength(6)]]
    // });
    this.secondFormGroup = this.formBuilder.group({
        username: ['', Validators.email],
        password: ['', [Validators.required, Validators.minLength(6)]]
    })
    this.firstFormGroup = this.formBuilder.group({
        username: ['', Validators.email],
        verify: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f1() { return this.secondFormGroup.controls; };
  get f2() { return this.firstFormGroup.controls; };

  navigation(): void {
      this.router.navigateByUrl("/account/login");
  }

  onSubmitEmail() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    let inputCityTourism = new HttpParams()
    .set('username',this.secondFormGroup.value.username)
    .set('password',this.secondFormGroup.value.password);

    this.accountService.registerEmail(inputCityTourism).subscribe(data=>{
        console.log(data);
      });

    this.loading = true;
    // this.accountService.registerEmail(this.secondFormGroup.value)
    //     .pipe(first())
    //     .subscribe(
    //         data => {
    //             this.alertService.success('Send Email !!', { keepAfterRouteChange: true });
    //         },
    //         error => {
    //             this.alertService.error(error);
    //             this.loading = false;
    //             this.router.navigate(['../login'], { relativeTo: this.route });
    //         });
}

  onSubmitToken() {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      this.loading = true;
      this.accountService.registerToken(this.firstFormGroup.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                  this.router.navigate(['../login'], { relativeTo: this.route });
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;

              });
  }
}
