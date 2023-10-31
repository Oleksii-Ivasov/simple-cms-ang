import { Component } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  featuredPosts: { data: Post; id: string }[] = [];
  latestPosts: { data: Post; id: string }[] = [];
  constructor(private postService: PostsService) {
    this.postService.loadData('featured').subscribe((val) => {
      this.featuredPosts = val;
    });
    this.postService.loadData('latest').subscribe((val) => {
      this.latestPosts = val;
    });
  }
}
