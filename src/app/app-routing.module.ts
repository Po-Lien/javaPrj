import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContainerComponent } from './container/container.component';
import { TripsComponent } from './trips/trips.component';
import { AuthGuard } from './_helpers';

import { SearchContentComponent } from './container/list/search-content/search-content.component';
import { SearchComponent } from './container/list/search/search.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const listModule = () => import('./container/list/list.module').then(m => m.ListModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
//const messageModule = () => import('./container/message-area/message-area.module').then(x => x.MessageAreaModule);

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'users',
    loadChildren: usersModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'account',
    loadChildren: accountModule
  },
  {
    path: 'schedule',
    component: ContainerComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'search',
  //   loadChildren: listModule,
  //   //data: { preload: true},
  //   canActivate: [AuthGuard],
  // },
  ////
  // {
  //   path: 'search',
  //   component:SearchComponent,
  //   children: [
  //     {
  //       path:'',
  //       component: SearchContentComponent,
  //     }
  //   ]
  // },
  {
    path: 'trips',
    component: TripsComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'**',
    redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
