import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommentService} from '../../core/services/comment.service';
import {Comment} from '../../core/models/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  providers: [CommentService]
})
export class CommentsComponent implements OnInit {
  public commentsList: Comment[] = [];
  public loadData = true;
  private uuid: string;
  private refer: string;

  @ViewChild('content') content: any;

  constructor(private route: ActivatedRoute,
              private commentService: CommentService) {
    this.uuid = this.route.snapshot.paramMap.get('id');
    this.refer = this.route.snapshot.paramMap.get('refers');
  }

  ngOnInit() {
    this.commentService.getComments(this.uuid, this.refer)
      .finally(() => this.loadData = false)
      .subscribe((data: any) => {
          if (data) {
            this.commentsList = data;
            // scrolls to bottom page
            this.scrollToBottom();
          }
        },
      );
  }

  /* infinity scroll event */
  public onScroll() {
    if (this.commentService.pagination.nextPage) {
      this.commentService.getComments(this.uuid, this.refer, this.commentService.pagination.nextPage)
        .subscribe((res: any) => {
          this.commentsList = this.commentsList.concat(res);
          this.commentService.pagination.pageIndex++;
        }, () => {
          console.log('Error infiniteScroll.');
        });
    }
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      this.content.scrollToBottom(500);
    }, 300);
  }

}
