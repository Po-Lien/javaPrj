import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { ShareMaterialModule } from '../share-material/share-material.module';

@NgModule({
    imports: [
        ShareMaterialModule,
        CommonModule,
        ReactiveFormsModule,
        AccountRoutingModule
    ],
    declarations: [
        AccountComponent,
        LoginComponent,
        RegisterComponent
    ]
})
export class AccountModule { }