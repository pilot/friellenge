import {Component, OnInit} from '@angular/core';
import {ChallengePost} from '../../../core/models/challenge/challenge-post.model';
import {ChallengesService} from '../../../core/services/challenges.service';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-challenges-list',
  templateUrl: './challenges-list.component.html',
  styleUrls: ['./challenges-list.component.scss'],
  providers: [ChallengesService]
})
export class ChallengesListComponent implements OnInit {
  public challengesList: ChallengePost[] = [];
  public loadData = true;


  constructor(private challengeService: ChallengesService) {
  }

  ngOnInit() {
    this.initializeData();
  }

  /* infinity scroll event */
  public onScroll() {
    if (this.challengeService.pagination.nextPage) {
      this.challengeService.getActives(this.challengeService.pagination.nextPage)
        .subscribe((res: any) => {
          this.challengesList = this.challengesList.concat(res);
          this.challengeService.pagination.pageIndex++;
        }, () => {
          console.log('Error infiniteScroll.');
        });
    } else {
    }
  }

  private initializeData() {
    this.challengeService.getActives()
      .finally(() => {
        this.loadData = false;
      })
      .subscribe(
        (data) => {
          if (data) {
            this.challengesList = data;
          }
        },
      );
  }
}

