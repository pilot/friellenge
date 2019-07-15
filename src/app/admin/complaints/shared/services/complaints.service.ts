import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiConfig} from '../../../../core/configs/api.config';
import {Complaint} from '../models/complaint.model';
import {Observable} from 'rxjs/Observable';
import {Pagination} from '../../../shared/models/pagination.model';

@Injectable()
export class ComplaintsService {
  public pagination: Pagination = new Pagination();
  private path: string;

  constructor(private http: HttpClient) {
  }

  set setPath(type) {
    switch (type) {
      case 'users':
        this.path = ApiConfig.complaintsUsersPath;
        break;
      case 'challenges':
        this.path = ApiConfig.complaintsChallengesPath;
        break;
    }
  }

  /** GET: Get complaints reports for users from the server */
  public getComplaints(filter: Object, page: number): Observable<Complaint[]> {
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

    return this.http.get(this.path, {params: params})
      .map((res: any) => {
        this.pagination.count = res.count;
        if (res.results.length > 0) {
          return res.results.map((data) => {
            return new Complaint(data);
          });
        }
      });
  }

  /** POST: Create complaints report */
  public create(params: string, uuid: string): Observable<Complaint> {
    return this.http.post(`${this.path}${uuid}/`, params)
      .map((res) => {
        return new Complaint(res);
      });
  }

  /** PATCH: Update complaints report (user/challenge) on the server */
  public update(params: Object, uuid: string): Observable<Complaint> {
    return this.http.patch(`${this.path}${uuid}/`, params)
      .map((res) => {
        return new Complaint(res);
      });
  }

  /** PATCH: Update complaints report (only admins are allowed) on the server */
  public updateReport(params: Object, uuid: string): Observable<Complaint> {
    return this.http.patch(`${ApiConfig.complaintPath}${uuid}/`, params)
      .map((res) => {
        return new Complaint(res);
      });
  }

  /** PATCH: Update complaints report (only admins are allowed) on the server */
  public deleteReport(uuid: string) {
    return this.http.delete(`${ApiConfig.complaintPath}${uuid}/`);
  }

  /** DELETE: Delete the complaints (user/challenge) from the server */
  public delete(uuid: string) {
    return this.http.delete(`${this.path}${uuid}/`);
  }

}
