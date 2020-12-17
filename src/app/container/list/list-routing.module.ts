import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListContentComponent } from './list-content/list-content.component';
import { ListHeaderComponent } from './list-header/list-header.component';
import { SearchComponent } from './search/search.component';
import { ListComponent } from './list.component';
import { SearchContentComponent } from './search-content/search-content.component';

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
