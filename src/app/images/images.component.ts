import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import 'rxjs/Rx';

import {DataStore} from "../common/data-store.service";
import {AppImage} from "../common/image.model";

/**
 * Images list component
 *
 * @class ImagesComponent
 */
@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})

export class ImagesComponent implements OnInit {

  images: AppImage[];

  constructor(private dataStore: DataStore, private router: Router) {
  }

  /**
   * Gets images from data store
   *
   * @func ImagesComponent#ngOnInit
   */
  ngOnInit() {
    this.images = this.dataStore.getImages();
  }

  /**
   * Marks an image as favorite
   *
   * @func ImagesComponent#onAddFavorite
   * @param imageId
   * @param e
   */
  onAddFavorite(imageId, e) {
    e.preventDefault();
    e.stopPropagation();
    this.dataStore.addImageToFavorites(imageId);
  }

  /**
   * Verifies if image is favorite
   *
   * @func ImagesComponent#isFavorite
   * @param imageId
   */
  isFavorite(imageId) {
    return this.dataStore.isImageFavorite(imageId);
  }
}
