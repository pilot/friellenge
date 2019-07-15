import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ChallengeReport} from '../models/challenge/challenge-report.model';
import {ApiConfig} from '../configs/api.config';

@Injectable()
export class ReportService {

  constructor(private http: HttpClient) {
  }

  /** GET: Get challenge reports */
  public listReports(uuid: string): Observable<ChallengeReport[]> {
    const params = new HttpParams();

    return this.http.get(`${ApiConfig.challengePath}challenge/${uuid}/reports/`, {params: params})
      .map((res: any) => {
        if (res['results'].length > 0) {
          return res['results'].map((item) => {
            return new ChallengeReport(item);
          });
        }
      });
  }

  /** GET: Get challenge detail */
  public getDetail(uuid: string): Observable<ChallengeReport> {
    return this.http.get(`${ApiConfig.challengePath}report/${uuid}/`)
      .map((res: any) => new ChallengeReport(res));
  }
}
