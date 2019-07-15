import {User} from '../../../core/models/user.model';

export class Blocked {
  uuid: string;
  creator: User;
  reason: string;
  is_active: boolean;
  banned_object: any;

  constructor(data: any) {
    this.uuid = data.uuid;
    this.creator = new User(data.creator);
    this.reason = data.reason;
    this.is_active = data.is_active;
    this.banned_object = data.banned_object;
  }
}
