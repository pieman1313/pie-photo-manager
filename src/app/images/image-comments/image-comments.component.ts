import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {} from '@types/googlemaps';

import {DataStore} from "../../common/data-store.service";
import {AppImage} from "../../common/image.model";

/**
 * Image comment component
 *
 * @class ImageCommentComponent
 */
@Component({
  selector: 'app-image',
  templateUrl: './image-comments.component.html',
  styleUrls: ['./image-comments.component.css']
})
export class ImageCommentComponent implements OnInit {

  image: AppImage;
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  constructor(private dataStore: DataStore, private route: ActivatedRoute, private router: Router) {
  }

  /**
   * Gets image id from route, initialises google maps related configurations
   *
   * @func ImageCommentComponent#ngOnInit
   */
  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {

          this.image = this.dataStore.getImage(+params['id']);

          let mapProp = {
            zoom: 1,
            center: new google.maps.LatLng(this.image.location.lat, this.image.location.long),
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

          let myMarker: any = new google.maps.Marker({
            position: new google.maps.LatLng(this.image.location.lat, this.image.location.long),
            draggable: false
          });

          this.map.setCenter(myMarker.position);

          myMarker.setMap(this.map);
        }
      );
  }

  /**
   * Adds a comment to the image
   *
   * @func ImageCommentComponent#onAddComment
   * @param form
   */
  onAddComment(form: NgForm) {
    (!this.image.comments) && (this.image.comments = []);
    this.image.comments.push(form.value.comment);
    form.reset();
    this.dataStore.saveData().subscribe(() => console.log("save successful"));
  }

}
