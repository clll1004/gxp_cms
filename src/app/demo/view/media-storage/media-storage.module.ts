/**
 * Created by GRE511 on 2019-01-07.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { MediaStorageComponent } from './components/media-storage.component';

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbModule,
  ],
  exports: [MediaStorageComponent],
  declarations: [
    MediaStorageComponent,
  ]})

export class MediaStorageModule {
  constructor() { }
}
