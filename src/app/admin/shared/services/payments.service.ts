import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ApiConfig} from '../../../core/configs/api.config';
import {Pagination} from '../models/pagination.model';
import {ChallengePost} from '../../../core/models/challenge/challenge-post.model';

@Injectable()
export class PaymentsService {
  public pagination: Pagination = new Pagination();

  constructor(private http: HttpClient) {
  }

  /** GET: List Challenges from the server */
  public getPayouts(filter: Object, page: number): Observable<any[]> {
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

    return this.http.get(`${ApiConfig.paymentPath}payout/`, {params: params})
      .map((res: any) => {
        this.pagination.count = res.count;
        this.pagination.next = res.next;
        return res.results;
      });
  }

  /** GET: List Challenges with donation from the server */
  public getDonations(page: number): Observable<any[]> {
    let params = new HttpParams();
    if (page > 1) {
      params = params.set('page', page.toString());
    }

    return this.http.get(`${ApiConfig.challengePath}/with_donations/`, {params: params})
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

  /** GET: List Challenges with donation from the server */
  public getStatistics(): Observable<any[]> {
    return this.http.get(`${ApiConfig.paymentPath}statistics/`)
      .map((res: any) => res.donate);
  }

  /** GET: Admin Configuration*/
  public adminConfigs(): Observable<any[]> {
    return this.http.get(`${ApiConfig.paymentPath}configuration/`)
      .map((res: any) => res);
  }

  /** PATCH: Update configuration */
  public updateConfigs(param: any): Observable<any[]> {
    return this.http.patch(`${ApiConfig.paymentPath}configuration/`, param)
      .map((res: any) => res);
  }

}
