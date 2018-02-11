import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {EventEmitter, Injectable, Output} from '@angular/core';

/**
 * Authentication service
 *
 * @class AuthService
 */
@Injectable()
export class AuthService {
  token: string;
  userId: string;

  @Output() onMessage: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) {
  }

  /**
   * Signs up new user with firebase, navigates to index afterwards
   *
   * @func AuthService#signupUser
   * @param email string
   * @param password string
   */
  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        response => {
          this.userId = response.uid;
          firebase.auth().currentUser.getToken()
            .then(
              (token: string) => {
                this.token = token;
                this.router.navigate(['/']);
              }
            )
        }
      )
      .catch(
        error => this.onMessage.emit(error.message)
      )
  }

  /**
   * Signs in user, navigates to index afterwards
   *
   * @func AuthService#signinUser
   * @param email string
   * @param password string
   */
  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/']);
          this.userId = response.uid;
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                this.token = token;
              }
            )
        }
      )
      .catch(
        error => {
          this.onMessage.emit(error.message);
          console.log(error)
        }
      );
  }

  /**
   * Logs user out
   *
   * @func AuthService#logout
   */
  logout() {
    this.token = null;
    this.userId = null;
    this.router.navigate(['/signin']);
    firebase.auth().signOut();
  }

  /**
   * Returns logged in users token
   *
   * @func AuthService#getToken
   * @returns string
   */
  getToken() {
    return this.token;
  }

  /**
   * Returns logged in users id
   *
   * @func AuthService#getUserId
   * @returns string
   */
  getUserId() {
    return this.userId;
  }

  /**
   * Returns authenticated state
   *
   * @func AuthService#isAuthenticated
   * @returns boolean
   */
  isAuthenticated() {
    return this.token != null;
  }
}
