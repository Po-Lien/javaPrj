import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListContentComponent } from './list-content/list-content.component';
import { ListHeaderComponent } from './list-header/list-header.component';
import { SearchComponent } from './search/search.component';
import { ListComponent } from './list.component';
import { SearchContentComponent } from './search-content/search-content.component';
import { ListHeaderEditComponent } from './list-header-edit/list-header-edit.component';
import { ListContentEditComponent } from './list-content-edit/list-content-edit.component';

const listRoutes: Routes = [
  {
    path: '',
    component: ListComponent,
    children: [
      {        
        path: '',
        component: ListHeaderComponent,
        children: [
          {
            path: '',
            component: ListContentComponent,
          }
        ]
      },
      {
        path: 'edit',
        component: ListHeaderEditComponent,
        children: [
          {
            path: '',
            component: ListContentEditComponent,
          }
        ]
      },
      {
        path: 'search',
        component:SearchComponent,
        children: [
          {
            path:'',
            component: SearchContentComponent,
          }
        ]
      }
    ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(listRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ListRoutingModule { }
