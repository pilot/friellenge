import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ComplaintsComponent} from './complaints.component';
import {ComplaintsUsersComponent} from './users/users.component';
import {ComplaintsChallengeComponent} from './challenge/complaints-challenge.component';

export const routes: Routes = [
  {
    path: 'complaints',
    component: ComplaintsComponent,
    children: [
      {path: 'users', component: ComplaintsUsersComponent},
      {path: 'users/id', component: ComplaintsUsersComponent},
      {path: 'challenges', component: ComplaintsChallengeComponent},
      {path: 'challenges/id', component: ComplaintsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplaintsRoutingModule {
}

