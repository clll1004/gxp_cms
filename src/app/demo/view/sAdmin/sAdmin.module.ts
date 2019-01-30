/**
 * Created by GRE511 on 2019-01-30.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { SAdminComponent } from './components/sAdmin.component';

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbModule,
  ],
  exports: [SAdminComponent],
  declarations: [
    SAdminComponent,
  ]})

export class SAdminModule {
  constructor() { }
}
