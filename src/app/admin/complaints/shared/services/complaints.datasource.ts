import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {catchError, finalize} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Pagination} from '../../../shared/models/pagination.model';
import {ComplaintsService} from './complaints.service';
import {Complaint} from '../models/complaint.model';

export class ComplaintsDataSource implements DataSource<Complaint> {

  private userSubject = new BehaviorSubject<Complaint[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public pagination: Pagination;

  constructor(private complaintsService: ComplaintsService) {
  }

  loadData(filter = {}, page = 1) {

    this.loadingSubject.next(true);

    this.complaintsService.getComplaints(filter, page).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false)))
      .subscribe(data => {
        this.userSubject.next(data);
      });
    this.pagination = this.complaintsService.pagination;
  }

  connect(collectionViewer: CollectionViewer): Observable<Complaint[]> {
    return this.userSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.userSubject.complete();
    this.loadingSubject.complete();
  }

}
