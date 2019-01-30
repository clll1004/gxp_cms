/**
 * Created by GRE511 on 2019-01-30.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { SAdminComponent } from './components/sAdmin.component';
import { RealTimeMonitoringComponent } from './components/realtime-monitoring/realtime-monitoring.component';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    ButtonModule,
    TableModule,
    InputTextModule,
  ],
  exports: [SAdminComponent],
  declarations: [
    SAdminComponent,
    RealTimeMonitoringComponent,
  ]})

export class SAdminModule {
  constructor() { }
}
