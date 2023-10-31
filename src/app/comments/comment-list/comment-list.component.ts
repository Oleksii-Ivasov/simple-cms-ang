import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/comment';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
})
export class CommentListComponent implements OnInit {
  constructor(
    private commentService: CommentsService,
    private router: ActivatedRoute
  ) {}

  postId: string = '';
  comments: Comment[] = [];
  commentsCount: number = 0;

  ngOnInit(): void {
    this.router.params.subscribe((val) => {
      this.postId = val['id'];
    });
    this.commentService.getComments(this.postId).subscribe((comments) => {
      this.comments = comments;
    });
    this.commentService.countComments(this.postId).then((count) => {
      this.commentsCount = count;
    });
  }
}
