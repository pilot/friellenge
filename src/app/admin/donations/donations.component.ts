import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {tap} from 'rxjs/operators';
import {TableDataSource} from '../shared/models/table-data-source.model';
import {MatPaginator} from '@angular/material';
import {PaymentsService} from '../shared/services/payments.service';
import {Router} from '@angular/router';

interface Statistics {
  total_for_challenges: any;
  total_for_users: any;
  total: any;
}

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.scss'],
  providers: [PaymentsService]
})
export class DonationsComponent implements OnInit, AfterViewInit {

  public dataSource: TableDataSource;
  public statistic: Statistics;
  public displayedColumns: string[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private paymentsService: PaymentsService,
              private router: Router) {
  }

  ngOnInit() {
    this.dataSource = new TableDataSource(this.paymentsService);
    this.dataSource.loadDataDonations();
    this.getStatistic();

    this.displayedColumns = ['index', 'title', 'participant_count', 'category', 'donate'];
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.loadDataTable())
      )
      .subscribe(() => {
      });
  }

  public goToDetail(uuid: string): void {
    this.router.navigate(['/dashboard/challenge', uuid]);
  }

  private loadDataTable(): void {
    this.dataSource.loadDataDonations({}, this.paginator.pageIndex + 1);
  }

  private getStatistic() {
    this.paymentsService.getStatistics()
      .subscribe((data: any) => {
        this.statistic = data;
      });
  }
}
