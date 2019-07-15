import {Challenge, MediaFile} from './challenge.model';
import {User} from '../user.model';


export class ChallengePost extends Challenge {
  description: string;
  begin_date: null | string;
  end_date: null | string;
  type: number;
  template: any;
  participants: any[];
  participant_count: number;
  is_participant: boolean;
  modified: string;
  last_activity: string;
  winner: any;
  category: any;
  donation: number;
  donation_type: string;
  reports?: any[];

  constructor(data) {
    super(data);
    this.author = new User(data.author);
    this.description = data.description;
    this.begin_date = data.begin_date;
    this.end_date = data.end_date;
    this.type = data.type;
    this.template = data.template;
    this.donation = data.total_donation_sum;
    this.donation_type = data.donation_allocation_type;
    this.participant_count = data.participant_count;
    this.participants = data.participants;
    this.is_participant = data.is_participant;
    this.modified = data.modified;
    this.last_activity = data.last_activity;
    this.winner = data.winner;
    this.challenge_type = 'challenge';
    this.category = data.category;
    this.preview = this.initPreview();
  }

  get isActive(): boolean {
    const nowDate = new Date().getTime();
    const startDate = new Date(this.begin_date).getTime();
    return ((startDate < nowDate) && !this.end_date || (new Date(this.end_date).getTime() > nowDate));
  }

  public startTimer(): boolean {
    const nowDate = new Date().getTime();
    const startDate = new Date(this.begin_date).getTime();
    return (this.begin_date && startDate > nowDate);
  }

  /** Check if challenge has end_date, display countDownTime */
  public endTimer(): boolean {
    const nowDate = new Date().getTime();
    const startDate = new Date(this.begin_date).getTime();
    const endDate = new Date(this.end_date).getTime();
    return (this.end_date && (endDate > nowDate) && (startDate < nowDate));
  }

  public initPreview(): MediaFile {
    let file = {
      ...super.initPreview(),
    };
    if (this.media_content.length === 0 && this.template && this.template.media_content.length > 0) {
      file = Object.assign(file, {
        type: 'single',
        previewUrl: this.template.media_content[0].preview,
        video: false,
        videoUrl: ''
      });
    }
    return file;
  }

  /** Init object data for social activities
   * @returns {{uuid: string, type: string, is_liked: boolean, likes: number, participants: number, comments: number}}
   */
  public activities() {
    const obj = {
      ...super.activities(),
      participants: this.participant_count
    };
    return obj;
  }
}
