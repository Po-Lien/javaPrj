import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { ListContentComponent } from './list-content/list-content.component';
import { ListHeaderComponent } from './list-header/list-header.component';
import { SearchComponent } from './search/search.component';
import { ListComponent } from './list.component';

import { ShareMaterialModule } from '../../share-material/share-material.module';

import { ListRoutingModule } from './list-routing.module';
import { SearchContentComponent } from './search-content/search-content.component';
import { ListHeaderEditComponent } from './list-header-edit/list-header-edit.component';
import { ListContentEditComponent } from './list-content-edit/list-content-edit.component';

@NgModule({
  declarations: [
    ListComponent,
    ListHeaderComponent,
    ListContentComponent,
    SearchComponent,
    SearchContentComponent,
    ListHeaderEditComponent,
    ListContentEditComponent
  ],
  imports: [
    ShareMaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ListRoutingModule
  ]
})
export class ListModule { }
