import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { HomeComponent } from './home/home.component';
import { ContainerComponent } from './container/container.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'account',
    loadChildren: accountModule
  },
  {
    path: 'schedule',
    component: ContainerComponent
  },
  {
    path: 'search',
    loadChildren: () => import('./container/list/list.module').then(m => m.ListModule),
    data: { preload: true}
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
