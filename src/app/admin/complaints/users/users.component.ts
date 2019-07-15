import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {ComplaintsDataSource} from '../shared/services/complaints.datasource';
import {ComplaintsService} from '../shared/services/complaints.service';
import {HelpersService} from '../../shared/services/helpers.service';
import {BlockedService} from '../../shared/services/blocked.service';
import {ComplaintDetailComponent} from '../components/complaint-detail/complaint-detail.component';
import {Complaint} from '../shared/models/complaint.model';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class ComplaintsUsersComponent implements OnInit, AfterViewInit {
  public dataSource: ComplaintsDataSource;
  public displayedColumns: string[] = [];
  public is_reviewed = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private helpers: HelpersService;

  constructor(private complaintsService: ComplaintsService,
              private blockedService: BlockedService,
              public dialog: MatDialog) {
    this.complaintsService.setPath = 'users';
    this.blockedService.setPath = 'user';
  }

  ngOnInit() {
    this.helpers = new HelpersService();

    this.dataSource = new ComplaintsDataSource(this.complaintsService);
    this.dataSource.loadData();

    this.displayedColumns = ['index', 'author', 'user', 'reason', 'reviewed', 'action'];
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.loadDataTable())
      )
      .subscribe();
  }

  public applyFilter(): void {
    this.is_reviewed = !this.is_reviewed;
    this.loadDataTable();
  }

  public viewDetail(data): void {
    const dialogRef = this.dialog.open(ComplaintDetailComponent, {
      data: {
        type: 'user',
        detail: data
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.detail) {
        // this.reviewedComplaint(result.detail);
      }
    });
  }

  public blockedUser(uuid: string): void {
    this.helpers.blocked('Пользователя')
      .subscribe((result) => {
        this.blockedService.create({reason: result}, uuid)
          .subscribe(
            (res) => {
              this.loadDataTable();
            },
            (err) => {
              console.log(err);
            }
          );
      });
  }

  public reviewedComplaint($event, data: Complaint): void {
    $event.stopPropagation();
    data.is_reviewed = !data.is_reviewed;

    this.complaintsService.updateReport({is_reviewed: data.is_reviewed}, data.uuid)
      .subscribe(() => {
        this.loadDataTable();
      });
  }

  public deleteComplaint($event, uuid: string): void {
    $event.stopPropagation();
    this.helpers.delete()
      .subscribe((result) => {
        this.complaintsService.deleteReport(uuid)
          .subscribe((data) => {
            this.loadDataTable();
          });
      });
  }

  private loadDataTable(): void {
    // filter params
    const filters = {};
    if (this.is_reviewed) {
      filters['is_reviewed'] = true;
    }
    this.dataSource.loadData(filters, this.paginator.pageIndex + 1);
  }

}
