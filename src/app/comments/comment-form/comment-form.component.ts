import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
})
export class CommentFormComponent implements OnInit {
  constructor(
    private commentService: CommentsService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  postId: string = '';

  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      this.postId = val['id'];
    });
  }
  async onSubmit(form: NgForm) {
    const commentData = {
      name: form.value.name,
      content: form.value.comment,
      postId: this.postId,
    };
    try {
      await this.commentService.addComment(commentData);
      this.toastr.success('Your comment added successfully');
    } catch (error) {
      this.toastr.error('Failed to add your comment');
    }
  }
}
