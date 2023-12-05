import { Injectable } from '@angular/core';
import {
  AuthConfig,
  OAuthService,
} from 'angular-oauth2-oidc';
import { AuthService } from './auth.service';


const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId:
    '255854312866-242oaiu2im96q1g4hh50sjtnjrkm87uq.apps.googleusercontent.com',
  scope: 'openid profile email',
  showDebugInformation: true
};

export interface UserInfo {
  info: {
    sub: string;
    email: string;
    name: string;
    picture: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class GoogleApiService {
  constructor(private readonly oAuthService: OAuthService, private authService: AuthService) {
    this.oAuthService.configure(oAuthConfig);
    this.oAuthService.loadDiscoveryDocument().then(() => {
      oAuthService.tryLoginImplicitFlow().then(() => {
        if (oAuthService.hasValidAccessToken()) {
          oAuthService.loadUserProfile().then((userProfile) => {
          })
        }
      })
    })
  }

  signUp() {
    this.oAuthService.initImplicitFlow();
  }
}
