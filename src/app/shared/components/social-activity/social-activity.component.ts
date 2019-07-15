import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

interface Activity {
  uuid: string;
  user: string;
  type: string;
  likes: number;
  is_liked: boolean;
  participants?: number;
  comments: number;
}

@Component({
  selector: 'app-social-activity',
  templateUrl: './social-activity.component.html',
  styleUrls: ['./social-activity.component.scss']
})
export class SocialActivityComponent implements OnInit {
  @Input() data: Activity;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  public goToComments($event): void {
    this.router.navigate(['comments/', this.data.type, this.data.uuid]);
  }

  public isLiked(): void {
    // if (!this.data.is_liked) {
    //   // create like
    //   this.actionService.addLike(this.data.uuid, this.data.type)
    //     .subscribe(() => {
    //     });
    // } else {
    //   // dislike
    //   this.actionService.deleteLike(this.data.uuid, this.data.type)
    //     .subscribe(() => {
    //     });
    // }
  }

}
