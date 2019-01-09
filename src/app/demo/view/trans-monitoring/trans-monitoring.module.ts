/**
 * Created by GRE511 on 2019-01-09.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { TransMonitoringComponent } from './components/trans-monitoring.component';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    ButtonModule,
    TableModule,
  ],
  exports: [TransMonitoringComponent],
  declarations: [
    TransMonitoringComponent,
  ]})

export class TransMonitoringModule {
  constructor() { }
}
