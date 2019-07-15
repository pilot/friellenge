import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {ChallengesService} from '../../core/services/challenges.service';
import {ChallengesDataSource} from './shared/services/challenges.datasource';
import {ChallengeTypes} from './shared/models/challenge.types';
import {HelpersService} from '../shared/services/helpers.service';
import {BlockedService} from '../shared/services/blocked.service';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';


@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss'],
  providers: [ChallengesService]
})
export class ChallengesComponent implements OnInit, AfterViewInit {
  public dataSource: ChallengesDataSource;
  public displayedColumns: string[] = [];
  public type = ChallengeTypes;

  // filter params
  public filters: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private helpers: HelpersService;

  constructor(private challengesService: ChallengesService,
              private router: Router,
              private blockedService: BlockedService) {
    this.blockedService.setPath = 'challenge';
  }

  ngOnInit() {
    this.dataSource = new ChallengesDataSource(this.challengesService);
    this.dataSource.loadData();

    this.displayedColumns = ['index', 'title', 'author', 'type', 'category', 'begin_date', 'end_date', 'action'];

    this.helpers = new HelpersService();
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.loadDataTable())
      )
      .subscribe(() => {
      });
  }

  public applyFilter(): void {
    this.loadDataTable();
  }

  public goToDetail(uuid: string): void {
    this.router.navigate(['/dashboard/challenge', uuid]);
  }

  public blockedChallenge($event, uuid: string) {
    $event.stopPropagation();
    this.helpers.blocked('Challenge')
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

  public deleteChallenge($event, uuid: string) {
    $event.stopPropagation();
    this.helpers.delete()
      .subscribe((result) => {
        this.challengesService.delete(uuid)
          .subscribe((data) => {
            this.loadDataTable();
          });
      });
  }

  private loadDataTable(): void {
    this.dataSource.loadData({}, this.paginator.pageIndex + 1);
  }
}
