import { Component } from '@angular/core';
import { Sub } from '../models/sub';
import { SubscribersService } from '../services/subscribers.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css'],
})
export class SubscriptionFormComponent {
  constructor(
    private subService: SubscribersService,
    private toastr: ToastrService
  ) {}
  isSubscribed: boolean = false;
  async onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }
    const subData: Sub = {
      name: form.value.name,
      email: form.value.email,
    };
    try {
      const isSubscribed = await this.subService.checkSubs(subData.email);
      if (!isSubscribed) {
        await this.subService.addSubs(subData);
        this.isSubscribed = true;
        this.toastr.success('Subscribed successfully');
      } else {
        this.toastr.error('There is already a subcriber with this email');
      }
    } catch (error) {
      console.error(error);
      this.toastr.error('Failed to perform operation');
    }
  }
}
