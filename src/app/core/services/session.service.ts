import {Injectable} from '@angular/core';
import {User} from '../models/user.model';

@Injectable()
export class SessionService {

  constructor() {
  }

  clean() {
    localStorage.clear();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  set token(value: string) {
    localStorage.setItem('token', value);
  }

  get currentUser(): User {
    const data = localStorage.getItem('currentUser') || '';
    return new User(JSON.parse(data));
  }

  set currentUser(value: User) {
    localStorage.setItem('currentUser', JSON.stringify(value));
  }
}
