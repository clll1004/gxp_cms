/**
 * Created by GRE511 on 2019-01-07.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { MediaStorageComponent } from './components/media-storage.component';
import { StorageListComponent } from './components/storage-list/storage-list.component';
import { StorageDetailComponent } from './components/storage-detail/storage-detail.component';

import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { ProgressBarModule } from 'primeng/progressbar';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    DialogModule,
    PanelModule,
    ProgressBarModule,
    TabViewModule,
    AccordionModule,
    RadioButtonModule,
  ],
  exports: [
    MediaStorageComponent,
  ],
  declarations: [
    MediaStorageComponent,
    StorageListComponent,
    StorageDetailComponent,
  ]})

export class MediaStorageModule {
  constructor() { }
}
