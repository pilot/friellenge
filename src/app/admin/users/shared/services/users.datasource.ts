import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {catchError, finalize} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {User} from '../../../../core/models/user.model';
import {UsersService} from './users.service';
import {Pagination} from '../../../shared/models/pagination.model';

export class UsersDataSource implements DataSource<User> {

  private userSubject = new BehaviorSubject<User[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public pagination: Pagination;

  constructor(private usersService: UsersService) {

  }

  loadUsers(filter = {}, page = 1) {

    this.loadingSubject.next(true);

    this.usersService.getUsers(filter, page).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false)))
      .subscribe(users => {
        this.userSubject.next(users);
      });
    this.pagination = this.usersService.pagination;
  }

  connect(collectionViewer: CollectionViewer): Observable<User[]> {
    return this.userSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.userSubject.complete();
    this.loadingSubject.complete();
  }

}

