import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  defaultSubscription = 'advanced';
  subscriptions = ['Basic', 'Advanced', 'Pro'];

  @ViewChild('signupForm', { static: false }) sgnForm: NgForm;

  onSubmit() {
    console.log(this.sgnForm.value);
  }
}
