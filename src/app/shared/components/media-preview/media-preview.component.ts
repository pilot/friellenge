import {Component, Input, OnInit} from '@angular/core';
import {NgxCarousel} from 'ngx-carousel';

@Component({
  selector: 'app-media-preview',
  templateUrl: 'media-preview.component.html'
})
export class MediaPreviewComponent implements OnInit {
  @Input() data: any;
  public carouselBanner: NgxCarousel;

  constructor() {
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

}
