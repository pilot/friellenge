import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ChallengePost} from '../../../core/models/challenge/challenge-post.model';
import {ChallengesService} from '../../../core/services/challenges.service';
import {ChallengeReport} from '../../../core/models/challenge/challenge-report.model';
import {User} from '../../../core/models/user.model';
import {ReportService} from '../../../core/services/report.service';

@Component({
  selector: 'app-challenge-detail',
  templateUrl: './challenge-detail.component.html',
  styleUrls: ['./challenge-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ChallengesService, ReportService],
})
export class ChallengeDetailComponent implements OnInit {
  public challenge: ChallengePost;
  public reports: ChallengeReport[] = [];

  private uuid: string;
  private user: User;

  constructor(private route: ActivatedRoute,
              private challengeService: ChallengesService,
              private reportService: ReportService) {
    this.uuid = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.initializeData();
  }

  private initializeData() {
    /* Init Challenge */
    // const loader = this.utilService.initializeLoading();
    this.challengeService.getDetail(this.uuid)
    // .finally(() => loader.dismiss())
      .subscribe((data: ChallengePost) => {
        this.challenge = data;
      });

    /* Init list reports */
    this.reportService.listReports(this.uuid)
      .subscribe((data) => {
        if (data) {
          this.reports = data;
        }
      });
  }

}
