import {ApiConfig} from '../configs/api.config';

export class User {
  uuid: string;
  first_name: string;
  last_name: string;
  photo: string;
  type?: number;
  reports_count?: number;
  reports_likes?: number;
  total_likes_num?: number;
  challenges_count?: number;
  challenges_likes?: number;
  isInvite?: boolean;
  like_num_for_challenge?: number;

  constructor(data: any) {
    this.uuid = data.uuid;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.photo = (data.photo) ? data.photo : ApiConfig.defaultAvatar;
    this.type = (typeof data.type !== 'undefined') ? data.type : 0;
    this.reports_count = (data.reports_created_num) ? data.reports_created_num : 0;
    this.reports_likes = (data.reports_total_received_likes) ? data.reports_total_received_likes : 0;
    this.total_likes_num = (data.total_likes_num) ? data.total_likes_num : 0;
    this.challenges_count = (data.challenges_created_num) ? data.challenges_created_num : 0;
    this.challenges_likes = (data.challenges_total_received_likes) ? data.challenges_total_received_likes : 0;
    this.isInvite = false;
  }

  get fullName(): string {
    return `${this.first_name} ${this.last_name}`;
  }

}
