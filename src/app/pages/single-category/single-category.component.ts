import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css'],
})
export class SingleCategoryComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private postService: PostsService
  ) {}

  posts: { data: Post; id: string }[] = [];
  categoryObj: Params = {};

  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      this.categoryObj = val;
      this.postService.loadData('category', val['id']).subscribe((posts) => {
        this.posts = posts;
      });
    });
  }
}
