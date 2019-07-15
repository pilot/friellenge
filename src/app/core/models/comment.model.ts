import {User} from './user.model';

export class Comment {
  uuid: string;
  author: User;
  text: string;
  created?: string;
  isEdit?: boolean;

  constructor(data) {
    this.uuid = data.uuid;
    this.author = new User(data.author);
    this.text = data.text;
    this.created = (data.created) ? data.created : '';
  }
}

