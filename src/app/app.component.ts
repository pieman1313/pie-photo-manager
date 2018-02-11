import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase'

import {DataStore} from "./common/data-store.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private dataStore: DataStore) {
  }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyCSPt1Me_sVUv-W3LgCNnv0fhBj2Fs__v0",
      authDomain: "pie-photo-manager-app.firebaseapp.com"
    });
    this.dataStore.init();
  }

}
