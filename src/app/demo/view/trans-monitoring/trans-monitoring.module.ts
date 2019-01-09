/**
 * Created by GRE511 on 2019-01-09.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { TransMonitoringComponent } from './components/trans-monitoring.component';

import { TabMenuModule } from 'primeng/tabmenu';

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    TabMenuModule,
  ],
  exports: [TransMonitoringComponent],
  declarations: [
    TransMonitoringComponent,
  ]})

export class TransMonitoringModule {
  constructor() { }
}
