import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {catchError, finalize} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Pagination} from '../../../shared/models/pagination.model';
import {ChallengesService} from '../../../../core/services/challenges.service';
import {ChallengePost} from '../../../../core/models/challenge/challenge-post.model';

export class ChallengesDataSource implements DataSource<ChallengePost> {

  private challengesSubject = new BehaviorSubject<ChallengePost[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loader: boolean;
  public pagination: Pagination;

  constructor(private challengesService: ChallengesService) {
  }

  loadData(filter = {}, page = 1) {

    this.loader = true;

    this.challengesService.getList(filter, page)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loader = false))
      .subscribe((data) => {
        this.challengesSubject.next(data);
      });
    this.pagination = this.challengesService.pagination;
  }

  connect(collectionViewer: CollectionViewer): Observable<ChallengePost[]> {
    return this.challengesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.challengesSubject.complete();
    this.loadingSubject.complete();
  }

}

