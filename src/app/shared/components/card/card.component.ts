import {Component, Input, OnInit} from '@angular/core';
import {NgxCarousel} from 'ngx-carousel';
import {Router} from '@angular/router';
import {ChallengePost} from '../../../core/models/challenge/challenge-post.model';
import {ChallengeReport} from '../../../core/models/challenge/challenge-report.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: ChallengePost | ChallengeReport;

  public carouselBanner: NgxCarousel;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.carouselBanner = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      slide: 4,
      speed: 500,
      interval: 5000,
      point: {visible: true},
      touch: true,
      loop: false
    };
  }

  public goToDetail(uuid: string): void {
    (this.card.challenge_type === 'challenge') ?
      this.router.navigate(['friellenge/', uuid]) :
      this.router.navigate(['friellenge/report/', uuid]);
  }

}
