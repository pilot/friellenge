import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {ApiConfig} from '../../../../core/configs/api.config';
import {TemplateCategory} from '../model/category.model';

@Injectable()
export class TemplateCategoryService {

  constructor(private http: HttpClient) {
  }

  /** GET: Get Template Category list from server */
  public getList(): Observable<TemplateCategory[]> {
    return this.http.get(`${ApiConfig.templateCategoryPath}`)
      .map((res: any[]) => {
        if (res.length > 0) {
          return res.map((data) => {
            return new TemplateCategory(data);
          });
        }
      });
  }

  /** POST: Create Template Category */
  public create(params: Object): Observable<TemplateCategory> {
    return this.http.post(`${ApiConfig.templateCategoryPath}`, params)
      .map((res) => {
        return new TemplateCategory(res);
      });
  }

  /** PATCH: Update Template Category on the server */
  public update(params: any, uuid: string): Observable<TemplateCategory> {
    return this.http.put(`${ApiConfig.templateCategoryPath}${uuid}/`, params)
      .map((res) => {
        return new TemplateCategory(res);
      });
  }

  /** DELETE: Delete the Template Category from the server */
  public delete(uuid: string) {
    return this.http.delete(`${ApiConfig.templateCategoryPath}${uuid}/`);
  }

}
