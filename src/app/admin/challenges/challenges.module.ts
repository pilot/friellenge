import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChallengesRoutingModule} from './challenges.routing';
import {SharedModule} from '../../shared/shared.module';
import {ChallengeDetailComponent} from './challenge-detail/challenge-detail.component';
import {ChallengesComponent} from './challenges.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ChallengesRoutingModule,
  ],
  declarations: [
    ChallengesComponent,
    ChallengeDetailComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChallengesModule {
}
