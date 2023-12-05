import { Component } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Post } from 'src/app/models/post';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId:
  '255854312866-242oaiu2im96q1g4hh50sjtnjrkm87uq.apps.googleusercontent.com',
  scope: 'openid profile email',
  showDebugInformation: true,
};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  featuredPosts: { data: Post; id: string }[] = [];
  latestPosts: { data: Post; id: string }[] = [];
  constructor(private postService: PostsService, private oAuthService: OAuthService, private authService:AuthService) {
    this.oAuthService.configure(oAuthConfig);
    this.oAuthService.loadDiscoveryDocument().then(() => {
      oAuthService.tryLoginImplicitFlow().then(() => {
        if (oAuthService.hasValidAccessToken()) {
          oAuthService.loadUserProfile().then((userProfile: any) => {
            this.authService.loginAfterGoogle(userProfile.info);
          })
        }
      })
    })
    this.postService.loadData('featured').subscribe((val) => {
      this.featuredPosts = val;
    });
    this.postService.loadData('latest').subscribe((val) => {
      this.latestPosts = val;
    });
  }
}
