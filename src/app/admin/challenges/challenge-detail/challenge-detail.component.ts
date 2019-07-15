import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ChallengesService} from '../../../core/services/challenges.service';
import {ChallengePost} from '../../../core/models/challenge/challenge-post.model';

@Component({
  selector: 'app-challenge-detail',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './challenge-detail.component.html',
  styleUrls: ['./challenge-detail.component.scss'],
  providers: [ChallengesService]
})
export class ChallengeDetailComponent implements OnInit {
  public challenge: ChallengePost;

  constructor(private route: ActivatedRoute,
              private challengesService: ChallengesService) {
  }

  ngOnInit() {
    this.initializeData();
  }

  private initializeData() {
    /* Init Challenge */
    const id = this.route.snapshot.paramMap.get('id');
    this.challengesService.getDetail(id)
      .finally(() => {})
      .subscribe((data: ChallengePost) => {
        this.challenge = data;
      });
  }

}
