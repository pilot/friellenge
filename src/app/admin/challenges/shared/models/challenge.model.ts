import {User} from '../../../../core/models/user.model';
import * as moment from 'moment';

export class Challenge {
  uuid: string;
  author: User;
  description: string;
  begin_date: null | string;
  end_date: null | string;
  type: number;
  template: any;
  participants: string[];

  constructor(data) {
    this.uuid = data.uuid;
    this.author = new User(data.author);
    this.description = data.description;
    this.begin_date = (data.begin_date) ? moment(data.begin_date).format('MMM DD, hh:mm') : 'Null';
    this.end_date = (data.end_date) ? moment(data.end_date).format('MMM DD, hh:mm') : 'Null';
    this.type = data.type;
    this.template = data.template;
    this.participants = data.participants;
  }
}
