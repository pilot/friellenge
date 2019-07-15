import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HelpersService} from '../../../shared/services/helpers.service';
import {BlockedService} from '../../../shared/services/blocked.service';

@Component({
  selector: 'app-complaint-detail',
  templateUrl: './complaint-detail.component.html',
  styleUrls: ['./complaint-detail.component.scss']
})
export class ComplaintDetailComponent implements OnInit {
  private helpers: HelpersService;

  constructor(private blockedService: BlockedService,
              private dialogRef: MatDialogRef<ComplaintDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {

    this.blockedService.setPath = (data.type === 'user') ? 'user' : 'challenge';

  }

  ngOnInit() {
    this.helpers = new HelpersService();
  }

  public addBlocked(): void {
    this.helpers.blocked('Пользователя')
      .subscribe((result) => {
        const userId = this.data.detail.reported_object.uuid;

        this.blockedService.create({reason: result}, userId)
          .subscribe(
            (res) => {
              this.dialogRef.close({reviewed: this.data.detail});
            },
            (err) => {
              console.log(err);
            }
          );
      });
  }
}
