import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material';
import {tap} from 'rxjs/operators';
import {PaymentsService} from '../shared/services/payments.service';
import {TableDataSource} from '../shared/models/table-data-source.model';

@Component({
  selector: 'app-payouts',
  templateUrl: './payouts.component.html',
  styleUrls: ['./payouts.component.scss'],
  providers: [PaymentsService]
})
export class PayoutsComponent implements OnInit, AfterViewInit {

  public dataSource: TableDataSource;
  public displayedColumns: string[] = [];


  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private paymentsService: PaymentsService) {
  }

  ngOnInit() {
    this.dataSource = new TableDataSource(this.paymentsService);
    this.dataSource.loadDataPayouts();

    this.displayedColumns = ['index', 'receiver', 'amount', 'charged_amount', 'status', 'provider'];

  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.loadDataTable())
      )
      .subscribe(() => {
      });
  }

  private loadDataTable(): void {
    this.dataSource.loadDataPayouts({}, this.paginator.pageIndex + 1);
  }

}
