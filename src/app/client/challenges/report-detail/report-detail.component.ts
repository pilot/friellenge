import {Component, OnInit} from '@angular/core';
import {ChallengeReport} from '../../../core/models/challenge/challenge-report.model';
import {ReportService} from '../../../core/services/report.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss'],
  providers: [ReportService]
})
export class ReportDetailComponent implements OnInit {
  public report: ChallengeReport;
  private uuid: string;

  constructor(private route: ActivatedRoute,
              private reportService: ReportService) {
    this.uuid = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.initializeData();
  }

  private initializeData() {
    /* Init Report */
    this.reportService.getDetail(this.uuid)
      .subscribe((data: ChallengeReport) => {
        this.report = data;
      });
  }

}
