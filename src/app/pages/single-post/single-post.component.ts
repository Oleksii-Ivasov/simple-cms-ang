import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
    private toastr: ToastrService
  ) {}

  postData!: Post | false;
  similarPosts: { data: Post; id: string }[] = [];
  notFoundError: boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      this.postService.countViews(val['id'])
      this.postService
        .loadSinglePost(val['id'])
        .then((post) => {
          if (post) {
            this.postData = post as Post;
            this.postService.loadData('category',post['category'].categoryId).subscribe(posts => {
              this.similarPosts = posts
            })
            this.notFoundError = false;
          } else {
            this.notFoundError = true;
          }
        })
        .catch((error) => {
          this.toastr.error(error);
        });
    });
  }
}
