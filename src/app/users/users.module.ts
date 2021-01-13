import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';

import { ShareMaterialModule } from '../share-material/share-material.module'

@NgModule({
    imports: [
        ShareMaterialModule,
        CommonModule,
        ReactiveFormsModule,
        UsersRoutingModule,
    ],
    declarations: [
        UsersComponent,
        ListComponent,
        AddEditComponent
    ]
})
export class UsersModule { }