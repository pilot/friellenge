import {Injectable} from '@angular/core';
import {FacebookService, InitParams, LoginOptions, LoginResponse} from 'ngx-facebook';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ApiFacebookService {
  private params: InitParams = environment.fbConfig;

  constructor(private fb: FacebookService) {
    /**
     * Initializing Facebook
     * @param params - object consist of appId and version
     */
    this.fb.init(this.params);
  }

  /** Login with Facebook */
  public login(): Observable<any> {
    // login with options
    const options: LoginOptions = {
      scope: 'email, user_friends, public_profile',
      return_scopes: true,
      enable_profile_selector: true
    };
    const data = new Observable(observable => {
      this.fb.login(options)
        .then((response: LoginResponse) => observable.next(response))
        .catch((error: any) => observable.error(error));
    });
    return data;
  }

  /** Logout with Facebook */
  public logout(): Observable<any> {
    const data = new Observable(observable => {
      this.fb.logout()
        .then((response: any) => observable.next(response))
        .catch((error: any) => observable.error(error));
    });
    return data;
  }
}


