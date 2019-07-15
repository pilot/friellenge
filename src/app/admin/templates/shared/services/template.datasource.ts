import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {catchError, finalize} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {TemplateModel} from '../model/template.model';
import {TemplateService} from './template.service';
import {Pagination} from '../../../shared/models/pagination.model';

export class TemplateDataSource implements DataSource<TemplateModel> {

  private templatesSubject = new BehaviorSubject<TemplateModel[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public pagination: Pagination;

  constructor(private templateService: TemplateService) {

  }

  loadTamplates(filter: any = '', page = 1) {

    this.loadingSubject.next(true);

    this.templateService.getTemplates(filter, page).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false)))
      .subscribe(templates => {
        this.templatesSubject.next(templates);
      });
    this.pagination = this.templateService.pagination;
  }

  connect(collectionViewer: CollectionViewer): Observable<TemplateModel[]> {
    return this.templatesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.templatesSubject.complete();
    this.loadingSubject.complete();
  }

}

