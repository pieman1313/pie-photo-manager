import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';

import {AuthService} from "../auth/auth.service";
import {AppImage} from "./image.model";

/**
 * Data storage service, saves data from firebase server
 *
 * @class DataStore
 */
@Injectable()
export class DataStore {

  data: any;
  images: AppImage[] = [];

  constructor(private http: Http, private authService: AuthService) {
  }

  /**
   * Fetches data when the app starts;
   * Firebase is limited, so I have to fetch all the data at once :(
   *
   * @func DataStore#init
   */
  init() {
    this.http.get('https://pie-photo-manager-app.firebaseio.com/data.json')
      .subscribe(
        (response: Response) => {
          this.data = response.json();
          if (!this.data) {
            this.data = {
              images: [],
              favorites: {}
            }
          }
          this.images = this.data.images || [];
        }
      );
  }

  /**
   * Saves data to firebase
   * Firebase is limited, so I have to save all the data at once,
   * overwriting everything in the db :(
   *
   * @func DataStore#init
   * @returns observable
   */
  saveData() {
    const token = this.authService.getToken();
    return this.http.put('https://pie-photo-manager-app.firebaseio.com/data.json?auth=' + token, this.data);
  }

  /**
   * Returns the images array
   *
   * @func DataStore#getImages
   * @returns Array
   */
  getImages() {
    if (this.data && this.data.images) {
      return this.data.images
    }
  }

  /**
   * Returns a specific image
   *
   * @func DataStore#getImage
   * @param id
   * @returns image
   */
  getImage(id) {
    return this.images.find((image: AppImage) => image.id == id);
  }

  /**
   * Saves a AppImage to the server
   *
   * @func DataStore#addImage
   * @param image AppImage
   */
  addImage(image: AppImage) {
    this.images.push(image);
    this.saveData().subscribe(() => console.log("image added"));
  }

  /**
   * Marks image as favorite and saves it to server
   *
   * @func DataStore#addImageToFavorites
   * @param imageId
   */
  addImageToFavorites(imageId) {
    this.data.favorites = this.data.favorites || {};
    this.data.favorites[this.authService.getUserId()] = this.data.favorites[this.authService.getUserId()] || [];
    this.data.favorites[this.authService.getUserId()].push(imageId);
    this.saveData().subscribe(() => console.log("favorite saved"));
  }

  /**
   * Verifies if image is a users favorite
   *
   * @func DataStore#isImageFavorite
   * @param imageId
   */
  isImageFavorite(imageId) {
    if (
      !this.data.favorites ||
      !this.data.favorites[this.authService.getUserId()] ||
      !this.data.favorites[this.authService.getUserId()].find((image) => image == imageId)
    ) {
      return false
    }
    return true;
  }

}
