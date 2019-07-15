import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from './shared/services/users.service';
import {MatPaginator, MatSort} from '@angular/material';
import {UserFilter} from './shared/models/user-filter.model';
import {UsersDataSource} from './shared/services/users.datasource';
import {HelpersService} from '../shared/services/helpers.service';
import {BlockedService} from '../shared/services/blocked.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit, AfterViewInit {
  public dataSource: UsersDataSource;
  public displayedColumns: string[] = [];
  // filter params
  public filters: UserFilter;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private helpers: HelpersService;

  constructor(private usersService: UsersService,
              private blockedService: BlockedService) {
    this.blockedService.setPath = 'user';
  }

  ngOnInit() {

    this.filters = new UserFilter();
    this.helpers = new HelpersService();

    this.dataSource = new UsersDataSource(this.usersService);
    this.dataSource.loadUsers();

    this.displayedColumns = ['index', 'user', 'type', 'friellenges', 'reports', 'action'];
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.loadDataTable())
      )
      .subscribe();
  }

  public applyFilter(filterBy?: string): void {
    if (filterBy === 'name' && this.filters.name === '') {
      return;
    }
    this.loadDataTable();
  }

  public clearFilter(): void {
    this.filters.name = '';
    this.filters.type = null;
    this.loadDataTable();
  }

  public blockedUser(uuid: string) {
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

  private loadDataTable(): void {
    this.dataSource.loadUsers(this.filters.getParams(), this.paginator.pageIndex + 1);
  }
}
