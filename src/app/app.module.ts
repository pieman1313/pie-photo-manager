import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule}   from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {SignupComponent} from './auth/signup/signup.component';
import {SigninComponent} from './auth/signin/signin.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from './app-routing.module'
import {AuthService} from './auth/auth.service';
import {NotFoundComponent} from './not-found/not-found.component';
import {AuthGuard} from './auth/auth-guard.service';
import {DataStore} from "./common/data-store.service";
import {ImagesComponent} from './images/images.component';
import {UploadImageComponent} from './upload-image/upload-image.component';
import {ImageCommentComponent} from './images/image-comments/image-comments.component';
import {MyDatePickerModule} from '../../node_modules/angular4-datepicker/src/my-date-picker/my-date-picker.module';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent,
    NotFoundComponent,
    ImagesComponent,
    UploadImageComponent,
    ImageCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MyDatePickerModule
  ],
  providers: [AuthService, AuthGuard, DataStore],
  bootstrap: [AppComponent]
})
export class AppModule {
}
