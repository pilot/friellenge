import {User} from '../../../../core/models/user.model';

export class Complaint {
  uuid: string;
  author: User;
  reason: string;
  is_reviewed: boolean;
  reviewer: null;
  reported_object: any;

  constructor(data: any) {
    this.uuid = data.uuid;
    this.author = new User(data.author);
    this.reason = data.reason;
    this.is_reviewed = data.is_reviewed;
    this.reviewer = data.reviewer;
    this.reported_object = data.reported_object;
  }
}
