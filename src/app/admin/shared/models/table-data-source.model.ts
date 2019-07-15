import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {catchError, finalize} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Pagination} from './pagination.model';
import {PaymentsService} from '../services/payments.service';


export class TableDataSource implements DataSource<any> {

  private dataSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loader: boolean;
  public pagination: Pagination;

  constructor(private service: PaymentsService) {
  }

  public loadDataPayouts(filter = {}, page = 1) {

    this.loader = true;

    this.service.getPayouts(filter, page)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loader = false))
      .subscribe((data) => {
        this.dataSubject.next(data);
      });
    this.pagination = this.service.pagination;
  }

  public loadDataDonations(filter = {}, page = 1) {

    this.loader = true;

    this.service.getDonations(page)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loader = false))
      .subscribe((data) => {
        this.dataSubject.next(data);
      });
    this.pagination = this.service.pagination;
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.loadingSubject.complete();
  }

}

