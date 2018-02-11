import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Injectable} from '@angular/core';

import {AuthService} from './auth.service';

/**
 * Authentication guard
 *
 * @class AuthGuard
 */
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  /**
   * Verifies if user is logged in
   *
   * @func AuthGuard#canActivate
   * @param route ActivatedRouteSnapshot
   * @param state RouterStateSnapshot
   * @returns boolean
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(["/signin"]);
    return false;
  }
}
