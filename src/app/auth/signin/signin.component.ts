import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {AuthService} from '../auth.service';

/**
 * Sign in component
 *
 * @class SigninComponent
 */
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {

  message: string = '';
  subscription: any;

  constructor(private authService: AuthService) {
  }

  /**
   * Sets up listener for messages from the auth service
   *
   * @func SigninComponent#ngOnInit
   */
  ngOnInit() {
    this.subscription = this.authService.onMessage.subscribe((message) => this.message = message);
  }

  /**
   * Submit handler, calls auth service with username and password
   *
   * @func SigninComponent#onSignin
   * @param form NGForm
   */
  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password);
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
