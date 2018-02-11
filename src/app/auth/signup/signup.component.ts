import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";

import {AuthService} from "../auth.service";

/**
 * Sign up component
 *
 * @class SignupComponent
 */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../signin/signin.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  message: string = '';
  subscription: any;

  constructor(private authService: AuthService) {
  }

  /**
   * Sets up listener for messages from the auth service
   *
   * @func SignupComponent#ngOnInit
   */
  ngOnInit() {
    this.subscription = this.authService.onMessage.subscribe((message) => this.message = message)
  }

  /**
   * Submit handler, calls auth service with username and password
   *
   * @func SignupComponent#onSignin
   * @param form NGForm
   */
  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signupUser(email, password);
  }

  /**
   * Destroy handler, un-subscribes from the auth service
   *
   * @func SigninComponent#ngOnDestroy
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
