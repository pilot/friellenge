import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-countdown-time',
  templateUrl: './countdown-time.component.html',
  styleUrls: ['./countdown-time.component.scss']
})
export class CountdownTimeComponent implements OnInit {
  @Input() timer;
  @Input() timerType = 'end';

  public finished: string;

  public days = 0;
  public hours = 0;
  public minutes = 0;
  public seconds = 0;

  constructor() {
  }

  ngOnInit() {
    this.initTimer();
  }

  private initTimer() {
    const timeinterval = setInterval(() => {
      // Get todays date and time
      const now = new Date().getTime();

      // Find the distance between now an the count down date
      const distance = new Date(this.timer).getTime() - now;

      // Time calculations for days, hours, minutes and seconds
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // If the count down is over, write some text
      if (distance <= 0) {
        clearInterval(timeinterval);
        this.finished = 'Friellenge is finished!';
      }
    }, 1000);
  }

}
