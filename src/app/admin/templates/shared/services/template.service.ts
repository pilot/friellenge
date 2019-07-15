import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiConfig} from '../../../../core/configs/api.config';
import {TemplateModel} from '../model/template.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import {Pagination} from '../../../shared/models/pagination.model';

@Injectable()
export class TemplateService {
  public pagination: Pagination = new Pagination();

  constructor(private http: HttpClient) {
  }

  /** GET: Get Template list from server */
  public getTemplates(filter?: any, page?: number): Observable<TemplateModel[]> {
    let params = new HttpParams();
    if (filter) {
      for (const key in filter) {
        if (filter.hasOwnProperty(key)) {
          params = params.set(key, filter[key]);
        }
      }
    }

    if (page > 1) {
      params = params.set('page', page.toString());
    }

    return this.http.get(`${ApiConfig.templatePath}`, {params: params})
      .map((res: any) => {
        this.pagination.count = res.count;
        this.pagination.next = res.next;
        if (res.results.length > 0) {
          return res.results.map((data) => {
            return new TemplateModel(data);
          });
        }
      });
  }

  /** POST: Create Template */
  public create(params: Object, attachment: any[] = []): Observable<any> {
    return this.http.post(`${ApiConfig.templatePath}`, params)
      .map((res: any) => {
        return new TemplateModel(res);
      })
      .flatMap((template: any) => {
        if (attachment.length > 0) {
          return Observable.forkJoin(
            attachment.map((file: File) => this.uploadMedia(file, template.uuid))
          ).map((results: any) => {
            if (results.length > 0) {
              return results.map((item) => {
                template.media_content.push(item.uploaded[0]);
                return template;
              });
            }
          });
        }
        return Observable.of([template]);
      });
  }

  /** PATCH: Update Template on the server */
  public update(params: string, uuid: string): Observable<TemplateModel> {
    return this.http.patch(`${ApiConfig.templatePath}${uuid}/`, params)
      .map((res) => {
        return new TemplateModel(res);
      });
  }

  /** DELETE: Delete the Template from the server */
  public delete(uuid: string) {
    return this.http.delete(`${ApiConfig.templatePath}${uuid}/`);
  }

  /** POST: Upload media content to template */
  public uploadMedia(file: File, uuid: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${ApiConfig.templatePath}${uuid}/upload/`, formData);
  }

}
