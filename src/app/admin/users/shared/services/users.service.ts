import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../../../../core/models/user.model';
import {ApiConfig} from '../../../../core/configs/api.config';
import {Observable} from 'rxjs/Observable';
import {Pagination} from '../../../shared/models/pagination.model';

@Injectable()
export class UsersService {
  public pagination: Pagination = new Pagination();

  constructor(private http: HttpClient) {
  }

  /** GET: List users from the server */
  public getUsers(filter: Object, page: number): Observable<User[]> {
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

    return this.http.get(`${ApiConfig.usersPath}`, {params: params})
      .map((res: any) => {
        this.pagination.count = res.count;
        if (res.results.length > 0) {
          return res.results.map((user) => {
            return new User(user);
          });
        }
      });
  }
}
