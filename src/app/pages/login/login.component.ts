import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GoogleApiService } from 'src/app/services/google-api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private googleService: GoogleApiService
  ) {}

  async onSubmit(form: NgForm) {
    try {
      await this.authService.login(form.value.email, form.value.password);
      this.router.navigate(['/']);
    } catch (error) {
      this.toastr.error(error as any);
    }
  }
  loginWithGoogle() {
    // googleWrapper.click();
    this.googleService.signUp();
  }
}
