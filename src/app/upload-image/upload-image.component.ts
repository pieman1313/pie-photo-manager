import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {} from '@types/googlemaps';

import {DataStore} from "../common/data-store.service";
import {AppImage} from "../common/image.model";

/**
 * Upload image component
 *
 * @class UploadImageComponent
 */
@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  @ViewChild('preview') imgPreview: ElementRef;
  @ViewChild('uploadInput') uploadInput: ElementRef;
  @ViewChild('gmap') gmapElement: any;

  form: FormGroup;
  imgSource: string = '';

  map: google.maps.Map;
  location: any = {
    lat: 47,
    long: 9
  };

  public myDatePickerOptions: any = {
    dateFormat: 'dd.mm.yyyy',
  };
  public dateModel: any;

  constructor(private dataStore: DataStore) {
  }

  /**
   * Initialises form and data for date picker and google maps
   *
   * @func UploadImageComponent#ngOnInit
   */
  ngOnInit() {
    this.initForm();

    let d = new Date();
    this.dateModel = {date: {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDay() + 1}};

    let mapProp = {
      zoom: 1,
      center: new google.maps.LatLng(35.137879, -82.836914),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    let myMarker: any = new google.maps.Marker({
      position: new google.maps.LatLng(this.location.lat, this.location.long),
      draggable: true
    });

    this.map.setCenter(myMarker.position);
    myMarker.setMap(this.map);

    google.maps.event.addListener(myMarker, 'dragend', function (evt) {
      this.location.lat = evt.latLng.lat().toFixed(3);
      this.location.long = evt.latLng.lng().toFixed(3);
    }.bind(this));
  }

  /**
   * Initialises reactive form
   *
   * @func UploadImageComponent#initForm
   */
  private initForm() {
    let description = '';
    let tags = new FormArray([
      new FormGroup({
        'text': new FormControl(null, Validators.required),
      })
    ]);

    this.form = new FormGroup({
      'description': new FormControl(description, Validators.required),
      'tags': tags
    });
  }

  /**
   * Submit handler, creates and saves a new image; resets the form
   *
   * @func UploadImageComponent#onSubmit
   */
  onSubmit() {
    let image = this.form.value;
    let img: AppImage = new AppImage(new Date().getTime(), image.tags, image.description, this.getDateFromDatepickerModel(this.dateModel), this.location, [], this.imgSource);
    this.dataStore.addImage(img);
    this.form.reset();
    this.imgSource = "";
    (<ElementRef>this.imgPreview).nativeElement.src = '';
    (<ElementRef>this.uploadInput).nativeElement.src = '';
  }

  /**
   * Add new tag handler
   *
   * @func UploadImageComponent#onAddTag
   */
  onAddTag() {
    (<FormArray>this.form.get('tags')).push(
      new FormGroup({
        'text': new FormControl(null, Validators.required),
      })
    );
  }

  /**
   * Transforms the uploaded image to base64 so it can be saved to firebase; ugly solution, i know...
   *
   * @func UploadImageComponent#readURL
   */
  readURL(e) {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();

      reader.onload = function (e) {
        (<ElementRef>this.imgPreview).nativeElement.src = e.target.result;
        this.imgSource = e.target.result;
      }.bind(this);

      reader.readAsDataURL(e.target.files[0]);
    }
  }

  /**
   * Transforms datepicker model to a date timestamp
   *
   * @func UploadImageComponent#readURL
   * return number
   */
  getDateFromDatepickerModel(model) {
    let d = new Date(model.date.year, model.date.month, model.date.day);
    return d.getTime()
  }

}
