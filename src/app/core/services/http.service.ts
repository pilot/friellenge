import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SessionService} from './session.service';

@Injectable()
export class HttpService implements HttpInterceptor {

  constructor(private session: SessionService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authHeader = `Token ${this.session.token}`;
    // Clone the request to add the new header.
    if (this.session.token) {
      const authReq = req.clone({headers: req.headers.set('Authorization', authHeader)});
      // Pass on the cloned request instead of the original request.
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
