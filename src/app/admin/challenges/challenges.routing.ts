import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ChallengesComponent} from './challenges.component';
import {ChallengeDetailComponent} from './challenge-detail/challenge-detail.component';


export const routes: Routes = [
  {
    path: 'challenges', component: ChallengesComponent,
  },
  {
    path: 'challenge/:id', component: ChallengeDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallengesRoutingModule {
}

