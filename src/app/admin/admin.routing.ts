import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from './admin.component';
import {PayoutsComponent} from './payouts/payouts.component';
import {DonationsComponent} from './donations/donations.component';
import {SettingsComponent} from './settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '', loadChildren: './users/users.module#UsersModule',
      },
      {
        path: '', loadChildren: './templates/templates.module#TemplatesModule',
      },
      {
        path: '', loadChildren: './complaints/complaints.module#ComplaintsModule',
      },
      {
        path: '', loadChildren: './challenges/challenges.module#ChallengesModule',
      },
      {
        path: 'payouts', component: PayoutsComponent
      },
      {
        path: 'donations', component: DonationsComponent
      },
      {
        path: 'settings', component: SettingsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}

