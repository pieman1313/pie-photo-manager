import {Component} from '@angular/core';

import {AuthService} from "../auth/auth.service";

/**
 * Header component
 *
 * @class HeaderComponent
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthService) {
  }

  /**
   * Calls auth service logout
   *
   * @func HeaderComponent#onLogout
   */
  onLogout() {
    this.authService.logout();
  }

}
