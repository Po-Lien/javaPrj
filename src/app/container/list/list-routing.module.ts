import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListContentComponent } from './list-content/list-content.component';
import { ListHeaderComponent } from './list-header/list-header.component';
import { SearchComponent } from './search/search.component';
import { ListComponent } from './list.component';
import { SearchContentComponent } from './search-content/search-content.component';
import { ListHeaderEditComponent } from './list-header-edit/list-header-edit.component';
import { ListContentEditComponent } from './list-content-edit/list-content-edit.component';
import { ContainerComponent } from '../container.component';

const listRoutes: Routes = [
  {
    path: 'schedule',
    component: ContainerComponent,
    children: [{
    path: '',
    component: ListComponent,
    children: [
      {        
        path: ':titleId',
        component: ListHeaderComponent,
        children: [
          {
            path: '',
            component: ListContentComponent,
          }
        ]
      },
      {
        path: 'edit/:titleId',
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
