import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComplaintsComponent} from './complaints.component';
import {ComplaintsService} from './shared/services/complaints.service';
import {ComplaintsUsersComponent} from './users/users.component';
import {SharedModule} from '../../shared/shared.module';
import {ComplaintsRoutingModule} from './complaints.routing';
import {ComplaintDetailComponent} from './components/complaint-detail/complaint-detail.component';
import {ComplaintsChallengeComponent} from './challenge/complaints-challenge.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ComplaintsRoutingModule
  ],
  declarations: [
    ComplaintsComponent,
    ComplaintsUsersComponent,
    ComplaintDetailComponent,
    ComplaintsChallengeComponent
  ],
  entryComponents: [
    ComplaintDetailComponent
  ],
  providers: [ComplaintsService]
})
export class ComplaintsModule {
}
