import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {AccessGuard} from './core/guards/access-guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/friellenges',
  }, {
    path: 'dashboard',
    canActivate: [AccessGuard],
    loadChildren: 'app/admin/admin.module#AdminModule',
  }, {
    path: '',
    loadChildren: 'app/client/client.module#ClientModule',
  }, {
    path: 'login',
    component: WelcomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
