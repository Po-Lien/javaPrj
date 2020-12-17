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

@NgModule({
  declarations: [
    ListComponent,
    ListHeaderComponent,
    ListContentComponent,
    SearchComponent,
    SearchContentComponent
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
