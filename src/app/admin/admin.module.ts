import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin.routing';
import {SharedModule} from '../shared/shared.module';
import {NavbarComponent} from './shared/components/navbar/navbar.component';
import {AdminComponent} from './admin.component';
import {AdminMenuComponent} from './shared/components/admin-menu/admin-menu.component';
import {BlockedService} from './shared/services/blocked.service';
import {PayoutsComponent} from './payouts/payouts.component';
import {DonationsComponent} from './donations/donations.component';
import {SettingsComponent} from './settings/settings.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
  ],
  declarations: [
    AdminComponent,
    NavbarComponent,
    AdminMenuComponent,
    PayoutsComponent,
    DonationsComponent,
    SettingsComponent,
  ],
  providers: [
    BlockedService
  ]
})
export class AdminModule {
}
