import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ApiConfig} from '../configs/api.config';
import {Pagination} from '../../admin/shared/models/pagination.model';
import {ChallengePost} from '../models/challenge/challenge-post.model';
import {ChallengeReport} from '../models/challenge/challenge-report.model';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';

@Injectable()
export class ChallengesService {
  public pagination: Pagination = new Pagination();

  constructor(private http: HttpClient) {
  }

  /** GET: List Challenges from the server */
  public getList(filter: Object, page: number): Observable<ChallengePost[]> {
    let params = new HttpParams();
    if (Object.keys(filter).length > 0) {
      for (const key in filter) {
        if (filter.hasOwnProperty(key)) {
          params = params.set(key, filter[key]);
        }
      }
    }
    if (page > 1) {
      params = params.set('page', page.toString());
    }

    return this.http.get(`${ApiConfig.challengePath}challenge/`, {params: params})
      .map((res: any) => {
        this.pagination.count = res.count;
        this.pagination.next = res.next;
        if (res.results.length > 0) {
          return res.results.map((item) => {
            return new ChallengePost(item);
          });
        }
      });
  }

  /** GET: Active challenges list from the server */
  public getActives(page?: number | boolean): Observable<ChallengePost[]> {
    let params = new HttpParams();

    if (typeof page !== 'undefined' && typeof page !== 'boolean') {
      params = params.set('page', page.toString());
    }

    return this.http.get(`${ApiConfig.challengePath}active/`, {params: params})
      .map((res: any) => {
        this.pagination.count = res.count;
        this.pagination.next = res.next;
        if (res['results'].length > 0) {
          return res['results'].map((item) => {
            return new ChallengePost(item);
          });
        }
      });
  }

  /** GET: Get challenge detail with reports */
  public getDetail(uuid: string): Observable<any> {
    return Observable.forkJoin([
      this.http.get(`${ApiConfig.challengePath}challenge/${uuid}/`).map((challenge: any) => new ChallengePost(challenge)),
      this.getReports(uuid)
    ]).map((results) => {
      results[0]['reports'] = results[1];
      return results[0];
    });
  }

  /** GET: Get challenge reports */
  public getReports(uuid: string): Observable<ChallengeReport[]> {
    return this.http.get(`${ApiConfig.challengePath}challenge/${uuid}/reports/`)
      .map((res: any) => {
        if (res['results'].length > 0) {
          return res['results'].map((item) => {
            return new ChallengeReport(item);
          });
        } else {
          return [];
        }
      });
  }

  /** DELETE: Delete the blocked (ban) from the server */
  public delete(uuid: string) {
    return this.http.delete(`${ApiConfig.challengePath}challenge/${uuid}/`);
  }
}
