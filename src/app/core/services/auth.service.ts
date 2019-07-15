import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {SessionService} from './session.service';
import {ApiConfig} from '../configs/api.config';
import {User} from '../models/user.model';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private session: SessionService,
              private http: HttpClient) {
  }

  /**
   * check does user exist
   * @returns user
   */
  public isLogin(): boolean {
    return !!(this.session.token);
  }

  /**
   * get current user
   * @returns Current user
   */
  public getUser(): User {
    return this.session.currentUser;
  }

  /**
   * For login authorization and saving token && user in the session
   * @param token - access_token from Facebook SDK
   * @returns object of User and token
   */
  public login(token: string): any {
    return this.http.post(ApiConfig.loginPath, {access_token: token}).map((res: any) => {
      this.session.token = res.token;
      this.session.currentUser = res.user;
      return res;
    });
  }

  /**
   * For remove data user from session (token and localStorage)
   */
  public removeSession() {
    this.session.clean();
  }

  public logout() {
    this.removeSession();
  }

}
