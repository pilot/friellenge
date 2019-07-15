import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {SharedModule} from '../shared/shared.module';
import {ChallengesListComponent} from './challenges/challenges-list/challenges-list.component';
import {ChallengeDetailComponent} from './challenges/challenge-detail/challenge-detail.component';
import {ReportDetailComponent} from './challenges/report-detail/report-detail.component';
import {HeaderComponent} from './challenges/components/header/header.component';
import {ClientRoutingModule} from './client.routing';
import {CommentsComponent} from './comments/comments.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    InfiniteScrollModule,
    ClientRoutingModule
  ],
  declarations: [
    ChallengesListComponent,
    ChallengeDetailComponent,
    ReportDetailComponent,
    CommentsComponent,
    HeaderComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClientModule {
}
