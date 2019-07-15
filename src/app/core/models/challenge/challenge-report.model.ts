import {Challenge, MediaFile} from './challenge.model';
import {User} from '../user.model';


export class ChallengeReport extends Challenge {
  challenge: string;
  description: string;
  preview: MediaFile;
  last_activity: string;
  is_challenge_finished?: boolean;

  constructor(data) {
    super(data);
    this.author = new User(data.user);
    this.description = data.text;
    this.challenge = data.challenge;
    this.challenge_type = 'report';
    this.last_activity = data.modified;
    this.preview = this.initPreview();
  }
}
