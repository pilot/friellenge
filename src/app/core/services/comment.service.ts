import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Comment} from '../models/comment.model';
import {ApiConfig} from '../configs/api.config';
import {Pagination} from '../../admin/shared/models/pagination.model';

@Injectable()
export class CommentService {
  public refers: string;
  public pagination: Pagination = new Pagination();

  constructor(private http: HttpClient) {
  }

  /** GET: Get challenge/report comments */
  public getComments(uuid: string, refer: string, page?: number | boolean): Observable<Comment[]> {
    let params = new HttpParams();

    if (typeof page !== 'undefined' && typeof page !== 'boolean') {
      params = params.set('page', page.toString());
    }

    return this.http.get(`${ApiConfig.challengePath}${refer}/${uuid}/comments/`, {params: params})
      .map((res: any) => {
        if (res['results'].length > 0) {
          this.pagination.count = res.count;
          this.pagination.next = res.next;
          return res['results'].map((item) => {
            return new Comment(item);
          });
        }
      });
  }
}
