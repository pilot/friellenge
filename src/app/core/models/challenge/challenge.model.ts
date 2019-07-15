import {User} from '../user.model';
import {ApiConfig} from '../../configs/api.config';

export interface MediaFile {
  type: string;
  previewUrl: string;
  video: boolean;
  videoUrl: string;
}

export class Challenge {
  uuid: string;
  author: User;
  comment_count: number;
  like_count: number;
  media_content: any[];
  file: any;
  preview: MediaFile;
  is_favorite: boolean;
  is_liked: boolean;
  created: string;
  challenge_type: string;


  constructor(data) {
    this.uuid = data.uuid;
    this.comment_count = data.comment_count;
    this.like_count = data.like_count;
    this.media_content = data.media_content;
    this.created = data.created;
    this.is_favorite = data.is_in_favorites;
    this.is_liked = data.is_liked;
  }

  /**
   * Init data @Input params for Components
   */
  public inputParams() {
    const obj = {
      uuid: this.uuid,
      author: this.author.uuid,
      type: this.challenge_type,
      is_favorite: this.is_favorite
    };
    return obj;
  }

  public initPreview(): MediaFile {
    const preview = {
      type: 'single',
      previewUrl: ApiConfig.challengeDefaultImage as any, // string or array type
      video: false,
      videoUrl: ''
    };
    if (this.media_content.length === 1) {
      preview.previewUrl = this.media_content[0].preview;
      // check if media is video
      if (this.media_content[0].media_content_type_name.startsWith('video')) {
        preview.video = true;
        preview.videoUrl = this.media_content[0].file;
      }
    }

    if (this.media_content.length > 1) {
      const files = [];
      this.media_content.map((el) => files.push(el.preview));
      preview.type = 'multiple';
      preview.previewUrl = files;
    }
    return preview;
  }

  /** Init object data for social activities
   * @returns {{uuid: string, type: string, is_liked: boolean, likes: number, participants: number, comments: number}}
   */
  public activities() {
    const obj = {
      uuid: this.uuid,
      type: this.challenge_type,
      likes: this.like_count,
      is_liked: this.is_liked,
      comments: this.comment_count,
      author: this.author.uuid,
    };
    return obj;
  }
}
