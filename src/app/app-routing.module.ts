import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SignupComponent} from './auth/signup/signup.component';
import {SigninComponent} from './auth/signin/signin.component';
import {AuthGuard} from './auth/auth-guard.service';
import {NotFoundComponent} from "./not-found/not-found.component";
import {ImagesComponent} from './images/images.component';
import {UploadImageComponent} from './upload-image/upload-image.component';
import {ImageCommentComponent} from "./images/image-comments/image-comments.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/images', pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {
    path: 'images', component: ImagesComponent, canActivate: [AuthGuard], children: [
    {path: ':id', component: ImageCommentComponent, canActivate: [AuthGuard]}
  ]
  },
  {path: 'upload', component: UploadImageComponent, canActivate: [AuthGuard]},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
