import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ApiConfig} from '../../../core/configs/api.config';
import {Blocked} from '../models/blocked.model';

@Injectable()
export class BlockedService {
  private path: string;

  constructor(private http: HttpClient) {
  }

  set setPath(type) {
    switch (type) {
      case 'user':
        this.path = ApiConfig.banUserPath;
        break;
      case 'challenge':
        this.path = ApiConfig.banChallengePath;
        break;
    }
  }

  /** GET: Get list blocked users/challenge from the server */
  public getList(filter?: any, page?: number | boolean): Observable<Blocked[]> {
    let params = new HttpParams();
    if (filter) {
      for (const key in filter) {
        if (filter.hasOwnProperty(key)) {
          params = params.append(key, filter[key]);
        }
      }
    }
    return this.http.get(this.path, {params: params})
      .map((res) => {
        if (res['results'].length > 0) {
          return res['results'].map((data) => {
            return new Blocked(data);
          });
        }
      });
  }

  /** POST: Create blocked (ban) */
  public create(params: Object, uuid: string): Observable<Blocked> {
    return this.http.post(`${this.path}${uuid}/`, params)
      .map((res) => {
        return new Blocked(res);
      });
  }

  /** PATCH: Update the blocked (ban) on the server */
  public update(params: string, uuid: string): Observable<Blocked> {
    return this.http.patch(`${this.path}${uuid}/`, params)
      .map((res) => {
        return new Blocked(res);
      });
  }

  /** DELETE: Delete the blocked (ban) from the server */
  public delete(uuid: string) {
    return this.http.delete(`${this.path}${uuid}/`);
  }

}
