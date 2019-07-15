import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ChallengesListComponent} from './challenges/challenges-list/challenges-list.component';
import {ChallengeDetailComponent} from './challenges/challenge-detail/challenge-detail.component';
import {ReportDetailComponent} from './challenges/report-detail/report-detail.component';
import {CommentsComponent} from './comments/comments.component';

export const routes: Routes = [
  {path: 'friellenges', component: ChallengesListComponent},
  {path: 'friellenge/:id', component: ChallengeDetailComponent},
  {path: 'friellenge/report/:id', component: ReportDetailComponent},
  {path: 'comments/:refers/:id', component: CommentsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}

