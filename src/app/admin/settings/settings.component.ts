import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {PaymentsService} from '../shared/services/payments.service';
import {HelpersService} from '../shared/services/helpers.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [PaymentsService]
})
export class SettingsComponent implements OnInit {
  public commissionPercent: FormControl;

  constructor(private paymentsService: PaymentsService) {
  }

  ngOnInit() {
    this.initialize();
  }

  public onSubmit() {
    if (this.commissionPercent.value !== '') {
      const param = {service_commission_percent: this.commissionPercent.value};
      this.paymentsService.updateConfigs(param)
        .subscribe(
          (data) => {
            HelpersService.alertSucces('Данные были изменены');
          },
          error => {
            console.error('Error', error);
            HelpersService.errorsServer(error.error);
          });
    }
  }

  private initialize() {
    this.commissionPercent = new FormControl('');
    this.paymentsService.adminConfigs()
      .subscribe((data: any) => {
        this.commissionPercent.setValue(data['service_commission_percent']);
      });
  }

}
